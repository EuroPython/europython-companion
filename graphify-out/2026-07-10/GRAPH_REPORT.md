# Graph Report - .  (2026-07-10)

## Corpus Check
- 69 files · ~48,136 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 583 nodes · 1043 edges · 57 communities (31 shown, 26 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.84)
- Token cost: 234,283 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Layout & Home Components|Layout & Home Components]]
- [[_COMMUNITY_Conference Data Loading|Conference Data Loading]]
- [[_COMMUNITY_Schedule List Components|Schedule List Components]]
- [[_COMMUNITY_Calendar & Onboarding UI|Calendar & Onboarding UI]]
- [[_COMMUNITY_App Root Composition|App Root Composition]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Schedule List Items|Schedule List Items]]
- [[_COMMUNITY_Android App Config|Android App Config]]
- [[_COMMUNITY_Dev Dependencies & Tooling|Dev Dependencies & Tooling]]
- [[_COMMUNITY_CoC Contacts UI|CoC Contacts UI]]
- [[_COMMUNITY_Navigation Routes & Refs|Navigation Routes & Refs]]
- [[_COMMUNITY_Documentation & Architecture Overview|Documentation & Architecture Overview]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Offline Status Banners|Offline Status Banners]]
- [[_COMMUNITY_Theme & Navigation Theme|Theme & Navigation Theme]]
- [[_COMMUNITY_PWA Icons & Manifest|PWA Icons & Manifest]]
- [[_COMMUNITY_Session Type Legend|Session Type Legend]]
- [[_COMMUNITY_Home Hero & Search|Home Hero & Search]]
- [[_COMMUNITY_Schedule Filters UI|Schedule Filters UI]]
- [[_COMMUNITY_Settings Row Components|Settings Row Components]]
- [[_COMMUNITY_Detail Action Row|Detail Action Row]]
- [[_COMMUNITY_Info Card Component|Info Card Component]]
- [[_COMMUNITY_Chip Picker Input|Chip Picker Input]]
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

## God Nodes (most connected - your core abstractions)
1. `spacing` - 36 edges
2. `useAppNavigation()` - 23 edges
3. `useConferenceData()` - 23 edges
4. `useSettings()` - 21 edges
5. `radius` - 18 edges
6. `paths` - 13 edges
7. `scripts` - 12 edges
8. `expo` - 11 edges
9. `useScheduleNotifications()` - 10 edges
10. `Documentation Set Overview` - 10 edges

## Surprising Connections (you probably didn't know these)
- `No Runtime Environment-Variable Configuration` --semantically_similar_to--> `No Runtime Environment Variables`  [INFERRED] [semantically similar]
  docs/configuration.md → CLAUDE.md
- `Path Alias Sync (tsconfig/babel)` --semantically_similar_to--> `Path Alias Configuration`  [INFERRED] [semantically similar]
  docs/project-structure.md → CLAUDE.md
- `ScheduleNotificationManager()` --calls--> `useScheduleNotifications()`  [EXTRACTED]
  App.tsx → src/hooks/useScheduleNotifications.ts
- `AppContent()` --calls--> `useAppNavTheme()`  [EXTRACTED]
  App.tsx → src/hooks/useAppNavTheme.ts
- `AppContent()` --calls--> `useSettings()`  [EXTRACTED]
  App.tsx → src/store/settings.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Feature Development Reading Path** — docs_getting_started_prereqs, docs_project_structure_layer_boundaries, docs_development_workflow_add_screen, docs_navigation_structure [EXTRACTED 1.00]
- **Bugfix Reading Path** — docs_getting_started_prereqs, docs_data_and_state_pipeline, docs_testing_current_posture [EXTRACTED 1.00]
- **Refactor Reading Path** — docs_architecture_boot_flow, docs_project_structure_layer_boundaries, docs_configuration_app_json [EXTRACTED 1.00]

## Communities (57 total, 26 thin omitted)

### Community 0 - "Layout & Home Components"
Cohesion: 0.08
Nodes (47): NeedToKnowList(), PaddedScrollView(), Props, Props, ScreenContainer(), styles, createStyles(), MarkdownBody() (+39 more)

### Community 1 - "Conference Data Loading"
Cohesion: 0.10
Nodes (43): buildBaseUrl(), CachedConferencePayload, conferenceCacheKey(), fetchJson(), loadConferenceDataWithMeta(), LoadConferenceResult, loadFromNetwork(), purgeOldCacheKeys() (+35 more)

### Community 2 - "Schedule List Components"
Cohesion: 0.09
Nodes (32): Props, UpcomingList(), Props, Row, SessionList(), styles, MAX_DATE_ISO, NOTIFICATION_LEAD_OPTIONS (+24 more)

### Community 3 - "Calendar & Onboarding UI"
Cohesion: 0.10
Nodes (32): expo-calendar, FavoriteToggleButton(), IconButtonProps, Props, onboardingSlides, Slide, AddResult, BulkOptions (+24 more)

### Community 4 - "App Root Composition"
Cohesion: 0.09
Nodes (25): AppContent(), ScheduleNotificationManager(), Props, styles, extractSessionId(), navigateToSession(), useNotificationDeepLink(), BeforeInstallPromptEvent (+17 more)

### Community 5 - "Package Dependencies"
Cohesion: 0.06
Nodes (31): dependencies, @bottom-tabs/react-navigation, expo, @expo/dom-webview, expo-font, expo-haptics, expo-image, expo-notifications (+23 more)

### Community 6 - "Schedule List Items"
Cohesion: 0.10
Nodes (21): BreakListItem(), Props, styles, nameOrUnknown(), Props, SessionListItem(), styles, Props (+13 more)

### Community 7 - "Android App Config"
Cohesion: 0.07
Nodes (26): backgroundColor, foregroundImage, adaptiveIcon, package, permissions, predictiveBackGestureEnabled, expo, android (+18 more)

### Community 8 - "Dev Dependencies & Tooling"
Cohesion: 0.08
Nodes (24): devDependencies, babel-plugin-module-resolver, baseline-browser-mapping, prettier, @types/react, typescript, workbox-cli, main (+16 more)

### Community 9 - "CoC Contacts UI"
Cohesion: 0.14
Nodes (15): Contact, Props, styles, contacts, styles, FavoritesContext, FavoritesContextValue, FavoritesProvider() (+7 more)

### Community 10 - "Navigation Routes & Refs"
Cohesion: 0.10
Nodes (20): navigationRef, AgendaStackParamList, AgendaStackRoutes, CombinedParamList, HomeStackParamList, HomeStackRoutes, OnboardingStackParamList, OnboardingStackRoutes (+12 more)

### Community 11 - "Documentation & Architecture Overview"
Cohesion: 0.15
Nodes (19): pnpm Command Reference, Documentation Map (CLAUDE.md), Boot Flow (architecture.md), Local Notification Scheduling (Rebuild-from-Scratch), useAppNavigation Hook, useNotificationDeepLink Hook, app.json Expo Runtime Config, Data Pipeline (services/) (+11 more)

### Community 12 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, noUnusedLocals, noUnusedParameters, paths, strict, extends, @/*, @app-types/* (+10 more)

### Community 13 - "Offline Status Banners"
Cohesion: 0.16
Nodes (6): OfflineBanner(), Props, styles, OfflineNotice(), Props, formatFetchedAt()

### Community 14 - "Theme & Navigation Theme"
Cohesion: 0.22
Nodes (9): useAppNavTheme(), ThemeMode, createPaperTheme(), darkPalette, lightPalette, nightPalette, Palette, paperTheme (+1 more)

### Community 15 - "PWA Icons & Manifest"
Cohesion: 0.17
Nodes (11): PWA Icon 192x192 (Python + EU Stars), icon-512.png (PWA App Icon), background_color, display, icons, name, orientation, scope (+3 more)

### Community 16 - "Session Type Legend"
Cohesion: 0.29
Nodes (6): Props, SessionTypeLegendDialog(), styles, sessionTypeAccentMap, sessionTypeLegendEntries, useSessionTypeLegendEntries()

### Community 17 - "Home Hero & Search"
Cohesion: 0.22
Nodes (5): Props, styles, Props, styles, radius

### Community 18 - "Schedule Filters UI"
Cohesion: 0.25
Nodes (6): DayOption, Props, styles, Props, ScheduleFilters(), styles

### Community 19 - "Settings Row Components"
Cohesion: 0.33
Nodes (3): BaseProps, styles, SwitchProps

### Community 20 - "Detail Action Row"
Cohesion: 0.40
Nodes (3): DetailAction, Props, styles

### Community 21 - "Info Card Component"
Cohesion: 0.40
Nodes (3): Action, Props, styles

### Community 22 - "Chip Picker Input"
Cohesion: 0.40
Nodes (3): Option, Props, styles

### Community 23 - "Schedule Level Filter"
Cohesion: 0.50
Nodes (4): capitalizeWords(), Props, ScheduleLevelFilter(), styles

### Community 24 - "Settings Section Wrapper"
Cohesion: 0.40
Nodes (3): CardProps, Props, styles

### Community 25 - "Social Links Row"
Cohesion: 0.40
Nodes (3): Props, SocialLink, styles

### Community 26 - "Data Pipeline & Cache Docs"
Cohesion: 0.50
Nodes (4): Conference Data Pipeline (services/), Cache Invalidation via SCHEMA_VERSION, API_BASE Static Constant, Cache Invalidation (data-and-state.md)

### Community 27 - "Web/PWA Docs"
Cohesion: 0.50
Nodes (4): Web / PWA Specifics, webAlertPolyfill (Alert.alert Web Shim), Side Effect Isolation, Service Worker Registration Script

## Ambiguous Edges - Review These
- `PWA Icon 192x192 (Python + EU Stars)` → `icon-512.png (PWA App Icon)`  [AMBIGUOUS]
  public/icon-192.png · relation: conceptually_related_to

## Knowledge Gaps
- **255 isolated node(s):** `Props`, `styles`, `DetailAction`, `Props`, `styles` (+250 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `PWA Icon 192x192 (Python + EU Stars)` and `icon-512.png (PWA App Icon)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dependencies` connect `Package Dependencies` to `Dev Dependencies & Tooling`, `Calendar & Onboarding UI`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Why does `addSessionToCalendar()` connect `Calendar & Onboarding UI` to `Schedule List Components`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `expo-calendar` connect `Calendar & Onboarding UI` to `Package Dependencies`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **What connects `Props`, `styles`, `DetailAction` to the rest of the system?**
  _269 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Layout & Home Components` be split into smaller, more focused modules?**
  _Cohesion score 0.07506584723441616 - nodes in this community are weakly interconnected._
- **Should `Conference Data Loading` be split into smaller, more focused modules?**
  _Cohesion score 0.0977891156462585 - nodes in this community are weakly interconnected._