# Development workflow

## Add a new screen
1. Create the screen component in `src/screens/YourScreen.tsx` and wrap content with `ScreenContainer` for consistent layout (title/back button/offline-year banner).
2. Add a route name in `src/navigation/routes.ts` for the appropriate stack and update the matching `*StackParamList` type.
3. Register the screen in `src/navigation/stackConfigs.ts` under the target stack with a `title` option.
4. Navigate to the new screen from existing UI using a typed `useNavigation` hook, or a helper in `useAppNavigation` if it needs to be reachable from multiple tabs/stacks.

If the new screen belongs in a new tab, also:
- Add a new stack entry in `stackConfigs` and include the root screen.
- Extend the `TabScreenConfig` `stackKey` union in `src/navigation/stackConfigs.ts`.
- Add the tab to `TabRoutes`/`RootTabParamList` in `routes.ts`, and to `tabIconNames` (Ionicons, web tab bar) **and** `tabSfSymbols` (SF Symbol name, native iOS tab bar) plus `tabScreens` in `stackConfigs.ts` — the native and web tab bars are two different implementations (see [Architecture](architecture.md#native-vs-web-tab-bar-platform-split-files-not-a-runtime-branch)) and both need the new tab's icon.

See [docs/navigation.md](navigation.md) for a full worked example.

## Add a new UI component safely
- Start in `src/components/` and choose the closest subfolder (for example, `schedule/` or `settings/`).
- Keep the component presentational; accept data and callbacks as props. (`ScreenContainer` and `OfflineNotice` are the deliberate exceptions that read app state directly — don't add more without good reason.)
- Use theme values from `src/theme.ts`/`useAppTheme` rather than inline magic values.
- If a new token is needed, add it in `src/theme.ts` and wire it through `createPaperTheme`.
- Prefer small, composable components over large UI blocks embedded in screens — e.g. `ScheduleFilters` composes `ScheduleDayChips`/`ScheduleTrackFilter`/`ScheduleLevelFilter` rather than being one large file.

## Introduce shared logic
- Pure helpers belong in `src/utils/` (formatting, time calculations, sorting, mapping helpers) — no React, no UI, side effects isolated to a single function where unavoidable.
- Side-effectful flows that need React state belong in `src/hooks/`.
- Persistent user state should live in `src/store/` and be exposed through a provider hook.
- Data fetching and normalization for the conference-programme dataset belongs in `src/services/` only.

## Avoid breaking navigation or state
- Keep route names centralized in `src/navigation/routes.ts` and update the typed param lists together.
- For destinations used across multiple stacks, add or extend a helper in `src/hooks/useAppNavigation.ts` so cross-tab fallbacks stay consistent. If the destination is opened from a notification tap, also check `src/hooks/useNotificationDeepLink.ts` — it's a separate mechanism.
- Ensure screens using `useConferenceData`, `useSettings`, or `useFavorites` remain inside their providers in `App.tsx` (the onboarding stack is rendered **before** `ConferenceDataProvider`/`FavoritesProvider` mount — don't call those hooks from onboarding screens).
- When adding new settings, update default values, hydration parsing, and persistence together in `src/store/settings.tsx`.
- When changing schedule data shape, keep `ConferenceData` normalization (`src/services/conferenceTransform.ts`) consistent with `src/types/raw.ts`/`src/types/conference.ts`, and bump `SCHEMA_VERSION` in `src/config/conference.ts` (see [Data and state](data-and-state.md#cache-invalidation)).

## Native project workflow
`ios/` and `android/` are **gitignored** — they're generated locally by Expo's prebuild ("Continuous Native Generation") the first time you run `pnpm ios`/`pnpm android`, not checked into the repo. If you need to change native configuration (permissions, icons, plugins), change `app.config.js` and re-run prebuild (`expo prebuild --clean` or just re-run `pnpm ios`/`pnpm android`) rather than hand-editing the generated native projects, since those edits won't survive a clean prebuild.

## Testing onboarding flows
To re-run the first-run experience, go to Settings and use "Restart onboarding experience" (`resetOnboardingSeen`). The app switches back to the onboarding stack on the next render, since `AppContent` in `App.tsx` gates on `onboardingSeen` directly.
