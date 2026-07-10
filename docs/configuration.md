# Configuration

## app.config.js
`app.config.js` (a dynamic config — there is no `app.json` in this repo) defines Expo runtime configuration:
- App identity: name (`EuroPython`), slug, orientation, icon, and splash screen.
- Platform settings: iOS bundle ID (`eu.europython.companion`), Android package (same id), calendar permissions (`NSCalendarsUsageDescription` on iOS, `READ_CALENDAR`/`WRITE_CALENDAR` on Android), web manifest basics (favicon, name, description, theme color).
- Plugins: `expo-notifications`, `expo-font`, `expo-calendar`, `expo-system-ui`, `expo-status-bar`, `expo-image`, `expo-splash-screen`.
- `newArchEnabled` is turned on for the project (there is no legacy-architecture code path to maintain).
- `experiments.baseUrl` — prefixes all asset/bundle URLs emitted by `expo export -p web` and the local web dev server (script `src`, favicon `href`, etc.) so they resolve correctly when served from a subpath. It's read from the `WEB_BASE_URL` build-time env var and defaults to `""` (root), so `pnpm web`/`pnpm pwa`/`pnpm build:web` work unmodified locally. `.github/workflows/deploy-web.yaml` sets `WEB_BASE_URL=/europython-companion` for the GitHub Pages build, since that's deployed to `https://europython.github.io/europython-companion/`, not a domain root. `public/workbox-config.js`'s `navigateFallback` reads the same env var and must stay in sync — see below.

  This is the one build-time-only exception to "no environment variables" below: `WEB_BASE_URL` is read by Node/the Expo CLI while resolving config (and by `workbox generateSW`), never by `src/` or the shipped client bundle.

Treat these values as release-critical. Coordinate changes to identifiers, permissions, or plugins with maintainers.

## There is no runtime environment-variable configuration
Unlike some Expo projects, this app reads **no** `process.env`/`EXPO_PUBLIC_*` values anywhere in `src/` or `App.tsx`. Everything that varies by environment is a static constant in `src/config/`:

- **`src/config/conference.ts`** — `API_BASE` (`"https://static.europython.eu/programme"`, hardcoded), `CONFERENCE_YEARS`/`DEFAULT_CONFERENCE_YEAR`, `CONFERENCE_META` (per-year title/subtitle/time zone/preferred room order), `SCHEMA_VERSION` (conference-data cache-key version), `WIFI_INFO_URL` (a conference-specific URL that has needed manual updating between events — it currently points at a per-event, hash-looking path under `ep2026.europython.eu`).
- **`src/config/constants.ts`** — notification lead-time defaults/options, the scheduled-notification cap, date/locale formatting constants, and the two refresh intervals (`UPCOMING_REFRESH_INTERVAL_MS` for the "now" tick on the home screen, `DATA_REFRESH_INTERVAL_MS` for both the conference-data cache TTL and the silent background refresh interval).

To point the app at a different data source (e.g. a staging environment), edit `API_BASE` in `src/config/conference.ts` directly — there is no `.env` mechanism, and no `extra`-based config injection either. If you want that flexibility, it would need to be added explicitly. (`WEB_BASE_URL`, above, is a narrow, build-tooling-only exception for web deployment path prefixing — it never reaches app code.)

`static.europython.eu` and the Wi-Fi info host both send `Access-Control-Allow-Origin: *`, so web fetches them directly with no proxy — there is no dev proxy anywhere in this repo.

## What contributors should and should not change
Safe to change:
- Conference metadata and the year list in `src/config/conference.ts` when a new programme is published (also update `WIFI_INFO_URL` — it's venue/event-specific and doesn't auto-update).
- UI-focused constants like notification lead options in `src/config/constants.ts`.
- A year's `preferredRoomOrder` in `CONFERENCE_META` (best-effort, case-insensitive exact-match room ordering for schedule display; safe to leave empty).

Avoid changing without coordination:
- Bundle identifiers, Android package, or permission lists in `app.config.js`.
- Expo plugin list or `newArchEnabled`.
- `API_BASE`/`SCHEMA_VERSION` in `src/config/conference.ts` — `API_BASE` affects production data loading for everyone; `SCHEMA_VERSION` must be bumped (not just edited) whenever `ConferenceData`'s normalized shape changes, so cached payloads from the previous shape aren't reused (see [Data and state](data-and-state.md)).
