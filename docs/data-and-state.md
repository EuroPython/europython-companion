# Data and state

## Data sources and normalization

Programme data is loaded from three JSON endpoints per conference year: `sessions.json`, `speakers.json`, `schedule.json`, served from `` `${API_BASE}/ep{year}/releases/current/` `` (`API_BASE` is a hardcoded constant in `src/config/conference.ts` — there's no runtime override; see [Configuration](configuration.md)). The pipeline lives in `src/services/`:

- **`conference.ts`** (`loadConferenceDataWithMeta`) is the entry point: serves a fresh cached copy without a network call when possible, otherwise fetches all three endpoints in parallel, normalizes them, and caches the result. Each fetch is bounded by `FETCH_TIMEOUT_MS` (`src/config/constants.ts`, 12s) via `AbortController`, so a slow (not failed) connection still fails fast into the cache-fallback path instead of hanging indefinitely. `loadCachedConferenceData` is a separate cache-only read (no network, no TTL check) used by the store to seed the UI instantly on cold start — see below.
- **`conferenceTransform.ts`** does the actual normalization: `normalizeSpeaker`/`normalizeSession` map raw fields to app types; `buildDays` treats `schedule.json` as the source of truth for room/time overrides, creates `BreakSlot` entries for break events, and assigns a `slotId` when a session appears in the schedule more than once (merging rooms and widening start/end across all its slots).
- **`guards.ts`** has the runtime type guards, including tolerance for two different top-level JSON shapes (`{ sessions: {...} }` wrapper vs. a bare `Record<code, RawSession>`) that the upstream API has used at different times.
- **`wifi.ts`** (`loadWifiInfo`) is a separate, much simpler network-first-with-cache-fallback fetch for venue Wi-Fi credentials — no TTL, since credentials can change independently of an app release.

## Cache invalidation

Conference data is cached in AsyncStorage under `ep{year}:conferenceData:v{SCHEMA_VERSION}` (`SCHEMA_VERSION` currently `3`, defined in `src/config/conference.ts`). **If you change `ConferenceData`'s shape or the normalization logic, bump `SCHEMA_VERSION`** so previously-cached payloads (in the old shape) aren't loaded and misinterpreted. Bumping it also triggers the existing `purgeOldCacheKeys()` cleanup path (invoked only as a fallback when an AsyncStorage write hits quota) to eventually clear out the old-version keys. For local testing, clearing app storage or reinstalling also resets cached data.

Note that the app caches data for every one of `CONFERENCE_YEARS` (currently 5 years) if you switch years in Settings, which is why `loadConferenceDataWithMeta` also purges other years' cache entries (keeping only the current year and `DEFAULT_CONFERENCE_YEAR`) whenever a write fails due to quota — a bounded-storage safety net, not a proactive cleanup.

## Store responsibilities

- `src/store/conferenceData.tsx` (`ConferenceDataProvider`/`useConferenceData`) owns loading, refresh (both a silent background timer and an explicit `refresh()`/`refreshIfStale()`), offline detection (`NetInfo` + `navigator.onLine` on web), and cache-tracking state (`fromCache`, `fetchedAt`, `lastFetchFailed`). It also loads Wi-Fi info alongside conference data on every fetch cycle. Screens read it via `useConferenceData()`.

  **Cold start is stale-while-revalidate, not blocking:** the initial-load effect first calls `loadCachedConferenceData(year)` (cache-only, no network) and, if it finds anything, immediately paints that data and flips `loading` false — then calls `fetchData()` as a background revalidation (surfaced as `refreshing`, not `loading`, since `hasLoaded.current` is set before it runs). A `requestId` guard discards the cache read if `year` changes before it resolves. The full-screen loading state (`ScheduleScreen` gates on `loading && !data`) is now only seen on a genuinely cold launch with no cache at all — bounded by `FETCH_TIMEOUT_MS` in `conference.ts` rather than hanging on a slow network.

- `src/store/favorites.tsx` (`FavoritesProvider`/`useFavorites`) stores starred session IDs as a `Set<string>` per year (`europython:favorites:{year}`), with optimistic updates that roll back on a failed AsyncStorage write. Exposes `toggleFavorite`, `setFavorite`, `clearFavorites`.
- `src/store/settings.tsx` (`SettingsProvider`/`useSettings`) persists user preferences (`app:settings`): conference year, theme mode, time-zone preference, notification toggles + lead time, haptics, onboarding-seen. Exposes a `hydrated` flag — `App.tsx` renders nothing until it's `true`.

## Derived state

Derived values are computed close to where they're used, not centralized:

- Schedule filtering, search, and sorting are computed in screens (mostly `ScheduleScreen`) using `useMemo`.
- `useEffectiveTimeZone` (`src/hooks/useEffectiveTimeZone.ts`) derives the active time zone from settings + conference metadata.
- `useSpeakerAvatars` (`src/hooks/useSpeakerAvatars.ts`) builds a memoized `id → avatar URL | null` map from `useConferenceData()`.
- `sortScheduleItems`/`compareSessionsByStart` (`src/utils/schedule.ts`) is the single sort entrypoint used by `SessionList`, `UpcomingList`, `SpeakerDetailScreen`, and `NotificationsScreen` — time first, then break-before-session, then the year's `preferredRoomOrder` as a tiebreaker, then title.
- Session type colors/legend are mapped through `src/utils/sessionTypes.ts` (substring matching against `src/data/sessionTypes.ts`'s color map).

## Static content data

`src/data/venue.ts` exports the ICE Kraków interior wayfinding content shown by `VenueMapScreen` — no store, no fetch, just bundled `require()`'d images and hand-verified text: `venueFloors` (F0–F3, each an official floor-plan image from `assets/venue/floors/` plus a room list), `venueEntrances` and `quietRoomImages` (photos from `assets/venue/`), and `accessibilityItems` (icon/title/text rows). Not fetched or cached like conference data; ships with the app binary and updates only via a new release.

## Side effects and isolation

Side effects are centralized so screens stay mostly declarative:

- Notifications are scheduled in `src/utils/notifications.ts` and kept in sync with favorites/keynotes/breaks by `useScheduleNotifications` (`src/hooks/useScheduleNotifications.ts`), mounted via a no-render wrapper in `App.tsx`. Notification-tap deep linking is a separate concern handled by `useNotificationDeepLink`. `ep{year}.europython.eu` universal-link deep linking is a third, also-separate concern handled by `useUrlDeepLink` (`src/hooks/useUrlDeepLink.ts`, native only, mounted the same no-render way), which is the one deep-link mechanism that reads `useConferenceData()` — it resolves the slug in the link against `sessionsById`/`speakersById` and switches `conferenceYear` via `useSettings()` if the link's year isn't the one currently loaded.
- Calendar integration is implemented in `src/utils/calendar.ts` and exposed as user-facing confirm/haptic flows via `useCalendarSync` (`src/hooks/useCalendarSync.ts`).
- Generic storage helpers live in `src/utils/storage.ts` (`loadJsonFromStorage`/`saveJsonToStorage`), used by the three stores and by `usePwaInstallPrompt`. `src/services/conference.ts` and `src/utils/calendar.ts` talk to `AsyncStorage` directly for their own cache payloads (conference data cache, calendar event-id cache) rather than going through those generic helpers, since they need custom read/parse/purge logic.
- Runtime haptics are toggled via `setHapticsEnabledRuntime` (`src/utils/haptics.ts`), called from an effect in `SettingsProvider` whenever the persisted `hapticsEnabled` setting changes.
- `webAlertPolyfill.ts` (imported once, for its side effect, in `App.tsx`) patches `Alert.alert` on web so that `Alert`-driven flows (`useCalendarSync`, notification permission prompts, SettingsScreen's favorites clear/export) actually work there instead of silently no-op-ing.
