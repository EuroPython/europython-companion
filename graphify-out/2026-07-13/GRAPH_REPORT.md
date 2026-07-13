# Graph Report - europython-companion  (2026-07-10)

## Corpus Check
- 111 files · ~60,277 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 667 nodes · 1390 edges · 80 communities (34 shown, 46 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.7)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cf1a6ab0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Layout & Home Components|Layout & Home Components]]
- [[_COMMUNITY_Conference Data Loading|Conference Data Loading]]
- [[_COMMUNITY_Schedule List Components|Schedule List Components]]
- [[_COMMUNITY_Calendar & Onboarding UI|Calendar & Onboarding UI]]
- [[_COMMUNITY_App Root Composition|App Root Composition]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Schedule List Items|Schedule List Items]]
- [[_COMMUNITY_spacing|spacing]]
- [[_COMMUNITY_Dev Dependencies & Tooling|Dev Dependencies & Tooling]]
- [[_COMMUNITY_CoC Contacts UI|CoC Contacts UI]]
- [[_COMMUNITY_Navigation Routes & Refs|Navigation Routes & Refs]]
- [[_COMMUNITY_Documentation & Architecture Overview|Documentation & Architecture Overview]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Offline Status Banners|Offline Status Banners]]
- [[_COMMUNITY_Theme & Navigation Theme|Theme & Navigation Theme]]
- [[_COMMUNITY_PWA Icons & Manifest|PWA Icons & Manifest]]
- [[_COMMUNITY_Session Type Legend|Session Type Legend]]
- [[_COMMUNITY_CoCScreen.tsx|CoCScreen.tsx]]
- [[_COMMUNITY_Schedule Filters UI|Schedule Filters UI]]
- [[_COMMUNITY_Settings Row Components|Settings Row Components]]
- [[_COMMUNITY_Info Card Component|Info Card Component]]
- [[_COMMUNITY_Schedule Level Filter|Schedule Level Filter]]
- [[_COMMUNITY_Settings Section Wrapper|Settings Section Wrapper]]
- [[_COMMUNITY_Social Links Row|Social Links Row]]
- [[_COMMUNITY_Data Pipeline & Cache Docs|Data Pipeline & Cache Docs]]
- [[_COMMUNITY_WebPWA Docs|Web/PWA Docs]]
- [[_COMMUNITY_Schedule Track Filter|Schedule Track Filter]]
- [[_COMMUNITY_Home Info Data|Home Info Data]]
- [[_COMMUNITY_Share Utility|Share Utility]]
- [[_COMMUNITY_FlashList Migration Note|FlashList Migration Note]]
- [[_COMMUNITY_No Env Vars Doc|No Env Vars Doc]]
- [[_COMMUNITY_Path Alias Docs|Path Alias Docs]]
- [[_COMMUNITY_Agenda Tab Naming Alias|Agenda Tab Naming Alias]]
- [[_COMMUNITY_Tab Bar Platform Split Doc|Tab Bar Platform Split Doc]]
- [[_COMMUNITY_Native Prebuild Workflow Doc|Native Prebuild Workflow Doc]]
- [[_COMMUNITY_Future Work & Testing Doc|Future Work & Testing Doc]]
- [[_COMMUNITY_Android Adaptive Icon|Android Adaptive Icon]]
- [[_COMMUNITY_App Icon Emblem|App Icon Emblem]]
- [[_COMMUNITY_iOS App Icon|iOS App Icon]]
- [[_COMMUNITY_App Boot Flow Doc|App Boot Flow Doc]]
- [[_COMMUNITY_Data Flow Summary Doc|Data Flow Summary Doc]]
- [[_COMMUNITY_Graphify Workflow Doc|Graphify Workflow Doc]]
- [[_COMMUNITY_Theme System Doc|Theme System Doc]]
- [[_COMMUNITY_Config Change Guidance Doc|Config Change Guidance Doc]]
- [[_COMMUNITY_Derived State Doc|Derived State Doc]]
- [[_COMMUNITY_Store Responsibilities Doc|Store Responsibilities Doc]]
- [[_COMMUNITY_Add Component Guide Doc|Add Component Guide Doc]]
- [[_COMMUNITY_Shared Logic Placement Doc|Shared Logic Placement Doc]]
- [[_COMMUNITY_Run Commands Doc|Run Commands Doc]]
- [[_COMMUNITY_CI Type Check Doc|CI Type Check Doc]]
- [[_COMMUNITY_Apple Touch Icon|Apple Touch Icon]]
- [[_COMMUNITY_Web Reset Style|Web Reset Style]]
- [[_COMMUNITY_Documentation Map (CLAUDE.md)|Documentation Map (CLAUDE.md)]]
- [[_COMMUNITY_Conference Data Pipeline (services)|Conference Data Pipeline (services/)]]
- [[_COMMUNITY_Cache Invalidation via SCHEMA_VERSION|Cache Invalidation via SCHEMA_VERSION]]
- [[_COMMUNITY_SessionList Shared List Component|SessionList Shared List Component]]
- [[_COMMUNITY_Bottom Tab Navigation & Tab Bar|Bottom Tab Navigation & Tab Bar]]
- [[_COMMUNITY_useAppNavigation Hook|useAppNavigation Hook]]
- [[_COMMUNITY_useNotificationDeepLink Hook|useNotificationDeepLink Hook]]
- [[_COMMUNITY_webAlertPolyfill (Alert.alert Web Shim)|webAlertPolyfill (Alert.alert Web Shim)]]
- [[_COMMUNITY_API_BASE Static Constant|API_BASE Static Constant]]
- [[_COMMUNITY_No Runtime Environment-Variable Configuration|No Runtime Environment-Variable Configuration]]
- [[_COMMUNITY_Data Pipeline (services)|Data Pipeline (services/)]]
- [[_COMMUNITY_Side Effect Isolation|Side Effect Isolation]]
- [[_COMMUNITY_Add a New Screen Workflow|Add a New Screen Workflow]]
- [[_COMMUNITY_Push Notifications Toggle Is a Disabled Placeholder|Push Notifications Toggle Is a Disabled Placeholder]]
- [[_COMMUNITY_Common Startup Failures|Common Startup Failures]]
- [[_COMMUNITY_Prerequisites & Install|Prerequisites & Install]]
- [[_COMMUNITY_Agenda Tab  FavoritesScreen Naming Alias|Agenda Tab / FavoritesScreen Naming Alias]]
- [[_COMMUNITY_VenueMap Screen Example Walkthrough|VenueMap Screen Example Walkthrough]]
- [[_COMMUNITY_src Layer Boundaries|src/ Layer Boundaries]]
- [[_COMMUNITY_Path Alias Sync (tsconfigbabel)|Path Alias Sync (tsconfig/babel)]]
- [[_COMMUNITY_Documentation Set Overview|Documentation Set Overview]]
- [[_COMMUNITY_Docs Rewritten From Full Source Read|Docs Rewritten From Full Source Read]]
- [[_COMMUNITY_Good First Test Candidates|Good First Test Candidates]]
- [[_COMMUNITY_Service Worker Registration Script|Service Worker Registration Script]]
- [[_COMMUNITY_theme.ts|theme.ts]]

## God Nodes (most connected - your core abstractions)
1. `spacing` - 37 edges
2. `useConferenceData()` - 25 edges
3. `useAppNavigation()` - 23 edges
4. `useSettings()` - 23 edges
5. `radius` - 19 edges
6. `useFavorites()` - 15 edges
7. `hapticSelection()` - 14 edges
8. `useEffectiveTimeZone()` - 13 edges
9. `Session` - 13 edges
10. `paths` - 13 edges

## Surprising Connections (you probably didn't know these)
- `UrlDeepLinkManager()` --calls--> `useUrlDeepLink()`  [EXTRACTED]
  App.tsx → src/hooks/useUrlDeepLink.ts
- `ScheduleNotificationManager()` --calls--> `useScheduleNotifications()`  [EXTRACTED]
  App.tsx → src/hooks/useScheduleNotifications.ts
- `AppContent()` --calls--> `useNotificationDeepLink()`  [EXTRACTED]
  App.tsx → src/hooks/useNotificationDeepLink.ts
- `addSessionToCalendar()` --references--> `expo-calendar`  [EXTRACTED]
  src/utils/calendar.ts → package.json
- `minimumReleaseAgeExclude Pin List` --conceptually_related_to--> `Commands`  [INFERRED]
  pnpm-workspace.yaml → CLAUDE.md

## Import Cycles
- None detected.

## Communities (80 total, 46 thin omitted)

### Community 0 - "Layout & Home Components"
Cohesion: 0.06
Nodes (46): AppContent(), ScheduleNotificationManager(), UrlDeepLinkManager(), Props, ScreenContainer(), styles, Props, styles (+38 more)

### Community 1 - "Conference Data Loading"
Cohesion: 0.08
Nodes (49): SpeakersScreen(), styles, buildBaseUrl(), CachedConferencePayload, conferenceCacheKey(), fetchJson(), loadConferenceDataWithMeta(), LoadConferenceResult (+41 more)

### Community 2 - "Schedule List Components"
Cohesion: 0.08
Nodes (37): Props, UpcomingList(), Props, SearchBar(), styles, Props, Row, SessionList() (+29 more)

### Community 3 - "Calendar & Onboarding UI"
Cohesion: 0.08
Nodes (35): Option, Props, styles, FavoriteToggleButton(), IconButtonProps, Props, BaseProps, SettingsSwitchRow() (+27 more)

### Community 4 - "App Root Composition"
Cohesion: 0.07
Nodes (45): extractSessionId(), navigateToSession(), useNotificationDeepLink(), navigateToSchedule(), navigateToSession(), navigateToSpeaker(), useUrlDeepLink(), AppTabs() (+37 more)

### Community 5 - "Package Dependencies"
Cohesion: 0.06
Nodes (34): dependencies, @bottom-tabs/react-navigation, expo, expo-dev-client, @expo/dom-webview, expo-font, expo-haptics, expo-image (+26 more)

### Community 7 - "spacing"
Cohesion: 0.14
Nodes (17): nameOrUnknown(), Props, SessionListItem(), styles, Props, SpeakerAvatar(), Props, useAppTheme() (+9 more)

### Community 8 - "Dev Dependencies & Tooling"
Cohesion: 0.08
Nodes (23): devDependencies, baseline-browser-mapping, prettier, @types/react, typescript, workbox-cli, main, name (+15 more)

### Community 9 - "CoC Contacts UI"
Cohesion: 0.12
Nodes (14): Contact, Props, styles, Props, styles, PaddedScrollView(), Props, OfflineBanner() (+6 more)

### Community 10 - "Navigation Routes & Refs"
Cohesion: 0.18
Nodes (11): 1) Create the screen, 2) Register the route name and params, 3) Register the screen in the stack, 4) Link to it from an existing screen, Example: add a new screen, Navigation, Route naming and labels, Screen registration (+3 more)

### Community 11 - "Documentation & Architecture Overview"
Cohesion: 0.12
Nodes (17): Architecture, Boot flow, Components (`src/components/`), Conference data pipeline (`src/services/`), Config (`src/config/`), Data & content (`src/data/`), Native vs. web tab bar (platform-split files, not a runtime branch), Navigation & tab bar (+9 more)

### Community 12 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, noUnusedLocals, noUnusedParameters, paths, strict, extends, @/*, @app-types/* (+10 more)

### Community 13 - "Offline Status Banners"
Cohesion: 0.20
Nodes (17): expo-calendar, AddResult, BulkOptions, BulkResult, RemoveResult, SingleOptions, useCalendarSync(), addSessionToCalendar() (+9 more)

### Community 14 - "Theme & Navigation Theme"
Cohesion: 0.24
Nodes (12): NeedToKnowList(), OfflineNotice(), Props, needToKnow, NeedToKnowCard, useAppNavigation(), useSpeakerAvatars(), HomeScreen() (+4 more)

### Community 15 - "PWA Icons & Manifest"
Cohesion: 0.17
Nodes (11): PWA Icon 192x192 (Python + EU Stars), icon-512.png (PWA App Icon), background_color, display, icons, name, orientation, scope (+3 more)

### Community 16 - "Session Type Legend"
Cohesion: 0.33
Nodes (6): Props, SessionTypeLegendDialog(), styles, sessionTypeAccentMap, sessionTypeLegendEntries, useSessionTypeLegendEntries()

### Community 17 - "CoCScreen.tsx"
Cohesion: 0.40
Nodes (5): BreakListItem(), Props, styles, BreakSlot, formatSessionTimeRange()

### Community 18 - "Schedule Filters UI"
Cohesion: 0.18
Nodes (11): components/, config/, data/, hooks/, navigation/, Project structure, screens/, services/ (+3 more)

### Community 19 - "Settings Row Components"
Cohesion: 0.67
Nodes (3): createStyles(), MarkdownBody(), Props

### Community 21 - "Info Card Component"
Cohesion: 0.13
Nodes (11): Action, Props, styles, Props, styles, ZoomableImage(), VenueFloor, VenueImage (+3 more)

### Community 23 - "Schedule Level Filter"
Cohesion: 0.22
Nodes (9): Building for web / PWA, Code style and checks, Common startup failures, Getting started, Install dependencies, Native builds, Next steps, Prerequisites (+1 more)

### Community 24 - "Settings Section Wrapper"
Cohesion: 0.29
Nodes (7): Add a new screen, Add a new UI component safely, Avoid breaking navigation or state, Development workflow, Introduce shared logic, Native project workflow, Testing onboarding flows

### Community 25 - "Social Links Row"
Cohesion: 0.40
Nodes (3): Props, SocialLink, styles

### Community 26 - "Data Pipeline & Cache Docs"
Cohesion: 0.29
Nodes (7): Cache invalidation, Data and state, Data sources and normalization, Derived state, Side effects and isolation, Static content data, Store responsibilities

### Community 28 - "Schedule Track Filter"
Cohesion: 0.40
Nodes (5): Documentation, How this set is organized, Keeping this accurate, Purpose, Where to start

### Community 29 - "Home Info Data"
Cohesion: 0.12
Nodes (12): DayOption, Props, styles, Props, ScheduleFilters(), styles, capitalizeWords(), Props (+4 more)

### Community 30 - "Share Utility"
Cohesion: 0.50
Nodes (4): app.config.js, Configuration, There is no runtime environment-variable configuration, What contributors should and should not change

### Community 44 - "Graphify Workflow Doc"
Cohesion: 0.25
Nodes (6): Architecture (big picture), Commands, CRITICAL BEHAVIORS (Always Follow), Documentation, graphify, minimumReleaseAgeExclude Pin List

### Community 45 - "Theme System Doc"
Cohesion: 0.50
Nodes (4): Future work, Known limitations, Likely evolution points, Safe areas to experiment

### Community 47 - "Derived State Doc"
Cohesion: 0.50
Nodes (4): Contributor expectations, Current posture, Testing, Where tests would live

### Community 81 - "theme.ts"
Cohesion: 0.18
Nodes (10): DetailAction, Props, styles, createPaperTheme(), darkPalette, lightPalette, nightPalette, Palette (+2 more)

## Ambiguous Edges - Review These
- `PWA Icon 192x192 (Python + EU Stars)` → `icon-512.png (PWA App Icon)`  [AMBIGUOUS]
  public/icon-192.png · relation: conceptually_related_to

## Knowledge Gaps
- **297 isolated node(s):** `CONFERENCE_YEARS`, `deepLinkHosts`, `name`, `version`, `main` (+292 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `PWA Icon 192x192 (Python + EU Stars)` and `icon-512.png (PWA App Icon)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dependencies` connect `Package Dependencies` to `Dev Dependencies & Tooling`, `Offline Status Banners`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `addSessionToCalendar()` connect `Offline Status Banners` to `Layout & Home Components`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `expo-calendar` connect `Offline Status Banners` to `Package Dependencies`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **What connects `CONFERENCE_YEARS`, `deepLinkHosts`, `name` to the rest of the system?**
  _312 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Layout & Home Components` be split into smaller, more focused modules?**
  _Cohesion score 0.0629800307219662 - nodes in this community are weakly interconnected._
- **Should `Conference Data Loading` be split into smaller, more focused modules?**
  _Cohesion score 0.08458646616541353 - nodes in this community are weakly interconnected._