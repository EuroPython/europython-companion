# Getting started

## Prerequisites
- Node.js LTS (CI uses the latest LTS).
- pnpm (pinned to `pnpm@11.10.0` in `package.json`).
- For native runs: Xcode for iOS, Android SDK/adb for Android. Native projects are **not** checked into the repo (`ios/`/`android/` are gitignored) — they're generated on demand.

## Install dependencies
```sh
pnpm install
```

## Run the app
- Dev server with QR/Simulator options:
  ```sh
  pnpm start
  ```
- iOS simulator (runs `expo prebuild` first if `ios/` doesn't exist yet):
  ```sh
  pnpm ios
  ```
- Android emulator/device (same, generates `android/` first if needed):
  ```sh
  pnpm android
  ```
- Web:
  ```sh
  pnpm web
  ```

There are no environment variables to configure — the app has no runtime environment-variable overrides (see [Configuration](configuration.md)). Programme data, the API base URL, and Wi-Fi info URL are all static values in `src/config/conference.ts`.

## Building for web / PWA
```sh
pnpm build:web
```
Runs `expo export -p web` then generates the Workbox service worker (`public/workbox-config.js` → `dist/sw.js`). To preview the exported build locally:
```sh
pnpm pwa
```
(builds web, then serves `dist/` on port 8081 via `serve`).

## Native builds
`pnpm ios` / `pnpm android` run against locally-generated `ios/`/`android/` projects (Expo's Continuous Native Generation / prebuild workflow — these folders are gitignored, not committed). If you only need JS/UI changes, `pnpm start` is usually enough; you don't need a native build unless you're changing native config (`app.config.js` plugins, permissions, icons) or adding a library with native code.

## Code style and checks
- Format code and docs with:
  ```sh
  pnpm format
  ```
- Verify formatting without changes:
  ```sh
  pnpm format:check
  ```
- Run the repo check used in CI:
  ```sh
  pnpm typecheck
  ```

## Next steps
- For feature work and navigation changes, start with [docs/development-workflow.md](development-workflow.md).
- For a full architecture walkthrough, see [docs/architecture.md](architecture.md).

## Common startup failures
- `pnpm: command not found` or wrong pnpm version: install pnpm (`corepack enable` or see `package.json`'s `packageManager` field) and retry.
- iOS build fails immediately: Xcode or the CLI tools are missing or out of date, or `ios/` needs to be regenerated (`expo prebuild --clean`).
- Android build fails with missing SDK/adb: Android Studio/SDK not installed or `ANDROID_HOME` not set.
- App launches but shows empty data: initial fetch requires network access; verify connectivity and try Refresh in Settings. Once any data has loaded once, it's cached and the app works offline from then on.
