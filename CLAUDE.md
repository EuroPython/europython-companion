# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRITICAL BEHAVIORS (Always Follow)
- **Auto-Update Documentation:** Whenever you modify codebase logic, add new screens, change configuration, or alter the architecture, you **MUST automatically update the corresponding markdown files in the `docs/` directory** in the same set of changes. Do not ask for permission to update the docs; just do it so they never drift from the source code.
- **Auto-Update Graphify:** After modifying code, run `graphify update .` to keep the AST/knowledge graph current (AST-only, no API cost).

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.

## Commands

Package manager is pnpm (pinned to `pnpm@11.10.0` in `package.json`).

```sh
pnpm install            # install deps
pnpm start              # Expo dev server (QR/simulator)
pnpm ios                # run on iOS simulator (generates ios/ via Expo prebuild if missing — gitignored, not committed)
pnpm android            # run on Android emulator/device (same, for android/)
pnpm web                # web dev server
pnpm typecheck          # tsc --noEmit — this is what CI runs, always run before considering work done
pnpm format             # prettier --write
pnpm format:check       # prettier --check
pnpm build:web          # expo export -p web + workbox service worker generation
pnpm pwa                # build:web + serve dist/ on 8081
pnpm tunnel             # ngrok tunnel port 8081 (for PWA testing with SSL)
pnpm prebuild           # expo prebuild (generates clean native folders) - use pnpm ios/android instead if you just want to run the app
```

There is no test runner configured (see `docs/testing.md`). CI (`.github/workflows/ci.yml`) only runs `pnpm typecheck`. Validate changes with `pnpm typecheck` plus manual exercise of the affected flow (schedule browsing, favorites, session detail, settings, notifications).

There are no runtime environment variables — the app reads no `process.env`/`EXPO_PUBLIC_*` values anywhere. The programme data base URL and all other environment-shaped config are static constants in `src/config/conference.ts`. See `docs/configuration.md`.

`ios/`/`android/` are gitignored, not committed — they're generated locally by Expo prebuild the first time you run `pnpm ios`/`pnpm android`.

## Documentation

`docs/` is a maintained, current reference — prefer it over re-deriving things from source. **You must keep these files updated when you change the code**:
- `docs/getting-started.md` — setup, run commands, common startup failures
- `docs/architecture.md` — full runtime structure, navigation, data flow, file-by-file
- `docs/project-structure.md` — why each `src/` folder exists and its boundaries
- `docs/development-workflow.md` — how to add a screen, component, or shared logic
- `docs/configuration.md` — Expo/app config and environment-driven values
- `docs/navigation.md` — route structure, typing, concrete navigation examples
- `docs/data-and-state.md` — data sources, stores, derived state, side effects
- `docs/testing.md` — current test posture
- `docs/future-work.md` — known limitations and safe extension points

## Architecture (big picture)

EuroPython Companion is an Expo/React Native app (Expo 57, React 19, RN 0.86, new architecture enabled) that works fully offline once data is cached. It fetches static EuroPython programme JSON (`sessions.json`, `speakers.json`, `schedule.json`) from `https://static.europython.eu/programme/ep{year}/releases/current/`, normalizes it, and persists it in AsyncStorage alongside settings and favorites.

Boot flow: `index.ts` registers `App`. `App.tsx` wraps everything in `SettingsProvider` → `ConferenceDataProvider` → `FavoritesProvider`, builds Paper/navigation themes (light/dark/night) via `src/theme.ts`, gates UI on settings hydration, shows onboarding until flagged complete, then renders bottom tabs (Home, Schedule, Speakers, Agenda, Settings) built from `src/navigation/stackConfigs.ts`. Notification taps navigate to sessions (queued if nav isn't ready yet).

Data flow: `src/services/conference.ts` builds the base URL from the hardcoded `API_BASE` constant in `src/config/conference.ts` (no env override — the app reads no `process.env`/`EXPO_PUBLIC_*` anywhere), fetches the three JSON payloads, caches them in AsyncStorage (`ep{year}:conferenceData:v{SCHEMA_VERSION}`, currently `v3`), and falls back to cache when offline. `src/services/conferenceTransform.ts` does pure normalization — schedule.json is the source of truth for room/time overrides, and sessions can span multiple slots (`slotId`) which get merged back into a single `sessionsById` map. `src/services/guards.ts` holds runtime type guards for the raw payloads.

State lives in `src/store/`: `settings.tsx` (year, theme mode, TZ preference, notification toggles, haptics, onboarding — persisted to `app:settings`), `conferenceData.tsx` (fetch/cache/refresh orchestration, silent auto-refresh on a timer and on app-foreground, NetInfo-aware), `favorites.tsx` (starred session ids, persisted per year).

Path aliases (defined identically in `tsconfig.json` and `babel.config.js`, kept in sync manually — Metro doesn't resolve `tsconfig` paths natively): `@/*`, `@components/*`, `@hooks/*`, `@utils/*`, `@store/*`, `@screens/*`, `@navigation/*`, `@config/*`, `@app-types/*`, `@services/*`, `@theme`, `@data/*`.

Lists use `@shopify/flash-list` (not `FlatList`/`SectionList`) — see `src/components/schedule/SessionList.tsx` for the reference implementation, including `sortScheduleItems`/`compareSessionsByStart` from `src/utils/schedule.ts` as the shared sort entrypoint (timing is always the primary sort key; preferred room order from `src/config/conference.ts` is only a tiebreaker).

For anything not covered above (adding a screen, a store, a notification type, etc.), read `docs/development-workflow.md` and `docs/architecture.md` first — they are kept current and are more complete than a summary here.
