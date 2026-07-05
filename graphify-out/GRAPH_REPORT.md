# Graph Report - .  (2026-07-06)

## Corpus Check
- 8 files · ~29,375 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 548 nodes · 1193 edges · 29 communities (25 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Schedule List Components|Schedule List Components]]
- [[_COMMUNITY_App Bootstrap & Data Providers|App Bootstrap & Data Providers]]
- [[_COMMUNITY_Screen Layout & Conference Config|Screen Layout & Conference Config]]
- [[_COMMUNITY_NPM Dependencies|NPM Dependencies]]
- [[_COMMUNITY_Conference Data FetchCache Service|Conference Data Fetch/Cache Service]]
- [[_COMMUNITY_SessionBreak List Items & Legend|Session/Break List Items & Legend]]
- [[_COMMUNITY_Navigation Routes & CoC Data|Navigation Routes & CoC Data]]
- [[_COMMUNITY_Expo App Config (app.json)|Expo App Config (app.json)]]
- [[_COMMUNITY_App Root & Nav Theme|App Root & Nav Theme]]
- [[_COMMUNITY_TypeScript Path Aliases|TypeScript Path Aliases]]
- [[_COMMUNITY_Schedule Filter Components|Schedule Filter Components]]
- [[_COMMUNITY_Calendar Sync|Calendar Sync]]
- [[_COMMUNITY_CoC Contacts Screen|CoC Contacts Screen]]
- [[_COMMUNITY_Home Hero & Need-to-Know Cards|Home Hero & Need-to-Know Cards]]
- [[_COMMUNITY_Favorites Store & Local Storage|Favorites Store & Local Storage]]
- [[_COMMUNITY_Search Bar & Offline Banner|Search Bar & Offline Banner]]
- [[_COMMUNITY_Theme & Color Palettes|Theme & Color Palettes]]
- [[_COMMUNITY_Settings Row Components|Settings Row Components]]
- [[_COMMUNITY_Detail Action Row|Detail Action Row]]
- [[_COMMUNITY_Info Card|Info Card]]
- [[_COMMUNITY_Chip Picker Input|Chip Picker Input]]
- [[_COMMUNITY_Settings Section|Settings Section]]
- [[_COMMUNITY_Social Links Row|Social Links Row]]
- [[_COMMUNITY_Dev Proxy Script|Dev Proxy Script]]
- [[_COMMUNITY_App Icon Asset|App Icon Asset]]
- [[_COMMUNITY_Default Prod Base URL Constant|Default Prod Base URL Constant]]
- [[_COMMUNITY_Legacy Color Export|Legacy Color Export]]

## God Nodes (most connected - your core abstractions)
1. `spacing` - 31 edges
2. `useAppNavigation()` - 23 edges
3. `useConferenceData()` - 21 edges
4. `Architecture (docs)` - 20 edges
5. `useSettings()` - 19 edges
6. `useFavorites()` - 15 edges
7. `radius` - 15 edges
8. `Data and State (docs)` - 14 edges
9. `expo` - 13 edges
10. `useEffectiveTimeZone()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `pnpm-workspace nodeLinker: hoisted` --conceptually_related_to--> `CI Type Check Job`  [INFERRED]
  pnpm-workspace.yaml → .github/workflows/ci.yml
- `Architecture (docs)` --references--> `ConferenceDataProvider (src/store/conferenceData.tsx)`  [EXTRACTED]
  docs/architecture.md → architecture.md
- `Architecture (docs)` --references--> `FavoritesProvider (src/store/favorites.tsx)`  [EXTRACTED]
  docs/architecture.md → architecture.md
- `Architecture (docs)` --references--> `SettingsProvider (src/store/settings.tsx)`  [EXTRACTED]
  docs/architecture.md → architecture.md
- `Architecture (docs)` --references--> `useAppTheme hook`  [EXTRACTED]
  docs/architecture.md → architecture.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **App bootstrap: App.tsx mounts SettingsProvider, ConferenceDataProvider, FavoritesProvider** — architecture_app_tsx, architecture_settingsprovider, architecture_conferencedataprovider, architecture_favoritesprovider [EXTRACTED 1.00]
- **Cross-cutting hooks centralizing side effects and derived values** — architecture_usescheduleNotifications, architecture_usecalendarsync, architecture_useappnavigation, architecture_useeffectivetimezone, architecture_useapptheme [EXTRACTED 1.00]
- **Documentation suite organized by docs/README.md** — docs_readme_index, docs_architecture_doc, docs_project_structure_doc, docs_development_workflow_doc, docs_navigation_doc, docs_configuration_doc, docs_data_and_state_doc, docs_testing_doc, docs_future_work_doc [EXTRACTED 1.00]

## Communities (29 total, 4 thin omitted)

### Community 0 - "Schedule List Components"
Cohesion: 0.08
Nodes (50): Props, UpcomingList(), SearchBar(), createStyles(), MarkdownBody(), Props, Props, SessionList() (+42 more)

### Community 1 - "App Bootstrap & Data Providers"
Cohesion: 0.06
Nodes (64): app.json (Expo config), App.tsx (root component), ConferenceDataProvider (src/store/conferenceData.tsx), src/config/conference.ts, src/config/constants.ts, src/data/sessionTypes.ts, dev-proxy.mjs, FavoritesProvider (src/store/favorites.tsx) (+56 more)

### Community 2 - "Screen Layout & Conference Config"
Cohesion: 0.09
Nodes (40): Props, ScreenContainer(), styles, FavoriteToggleButton(), IconButtonProps, Props, CONFERENCE_META, CONFERENCE_YEARS (+32 more)

### Community 3 - "NPM Dependencies"
Cohesion: 0.04
Nodes (46): dependencies, expo, expo-calendar, expo-font, expo-haptics, expo-notifications, expo-status-bar, expo-system-ui (+38 more)

### Community 4 - "Conference Data Fetch/Cache Service"
Cohesion: 0.09
Nodes (41): addMinutesToIso(), buildBasePath(), buildDays(), buildProdBaseUrl(), CachedConferencePayload, conferenceCacheKey(), fetchJson(), isConferenceData() (+33 more)

### Community 5 - "Session/Break List Items & Legend"
Cohesion: 0.09
Nodes (29): BreakListItem(), Props, styles, nameOrUnknown(), Props, SessionListItem(), styles, Props (+21 more)

### Community 6 - "Navigation Routes & CoC Data"
Cohesion: 0.11
Nodes (28): navigationRef, AgendaStackParamList, AgendaStackRoutes, CombinedParamList, HomeStackParamList, HomeStackRoutes, OnboardingStackParamList, OnboardingStackRoutes (+20 more)

### Community 7 - "Expo App Config (app.json)"
Cohesion: 0.07
Nodes (29): backgroundColor, foregroundImage, adaptiveIcon, edgeToEdgeEnabled, package, permissions, predictiveBackGestureEnabled, expo (+21 more)

### Community 8 - "App Root & Nav Theme"
Cohesion: 0.13
Nodes (14): AppContent(), builtStacks, stackScreenOptions, Tab, useAppNavTheme(), extractSessionId(), navigateToSession(), useNotificationDeepLink() (+6 more)

### Community 9 - "TypeScript Path Aliases"
Cohesion: 0.10
Nodes (19): compilerOptions, baseUrl, noUnusedLocals, noUnusedParameters, paths, strict, extends, @/* (+11 more)

### Community 10 - "Schedule Filter Components"
Cohesion: 0.12
Nodes (11): DayOption, Props, styles, Props, styles, capitalizeWords(), Props, ScheduleLevelFilter() (+3 more)

### Community 11 - "Calendar Sync"
Cohesion: 0.22
Nodes (16): AddResult, BulkOptions, BulkResult, RemoveResult, SingleOptions, useCalendarSync(), addSessionToCalendar(), cacheKey() (+8 more)

### Community 12 - "CoC Contacts Screen"
Cohesion: 0.20
Nodes (7): Contact, Props, styles, PaddedScrollView(), Props, contacts, styles

### Community 13 - "Home Hero & Need-to-Know Cards"
Cohesion: 0.24
Nodes (8): HomeHeroCard(), Props, styles, NeedToKnowList(), needToKnow, NeedToKnowCard, styles, spacing

### Community 14 - "Favorites Store & Local Storage"
Cohesion: 0.32
Nodes (10): FavoritesContext, FavoritesContextValue, FavoritesProvider(), KEY_PER_YEAR(), loadFavorites(), saveFavorites(), loadJsonData(), loadJsonFromStorage() (+2 more)

### Community 15 - "Search Bar & Offline Banner"
Cohesion: 0.25
Nodes (6): Props, styles, OfflineBanner(), Props, styles, radius

### Community 16 - "Theme & Color Palettes"
Cohesion: 0.32
Nodes (5): darkPalette, lightPalette, nightPalette, Palette, paperTheme

### Community 17 - "Settings Row Components"
Cohesion: 0.33
Nodes (4): BaseProps, SettingsSwitchRow(), styles, SwitchProps

### Community 18 - "Detail Action Row"
Cohesion: 0.40
Nodes (3): DetailAction, Props, styles

### Community 19 - "Info Card"
Cohesion: 0.40
Nodes (3): Action, Props, styles

### Community 20 - "Chip Picker Input"
Cohesion: 0.40
Nodes (3): Option, Props, styles

### Community 21 - "Settings Section"
Cohesion: 0.40
Nodes (4): CardProps, Props, SettingsSection(), styles

### Community 22 - "Social Links Row"
Cohesion: 0.40
Nodes (3): Props, SocialLink, styles

## Knowledge Gaps
- **210 isolated node(s):** `name`, `slug`, `version`, `orientation`, `icon` (+205 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `spacing` connect `Home Hero & Need-to-Know Cards` to `Schedule List Components`, `Screen Layout & Conference Config`, `Session/Break List Items & Legend`, `Navigation Routes & CoC Data`, `CoC Contacts Screen`, `Search Bar & Offline Banner`, `Theme & Color Palettes`, `Settings Row Components`, `Detail Action Row`, `Info Card`, `Chip Picker Input`, `Settings Section`, `Social Links Row`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `useSettings()` connect `Screen Layout & Conference Config` to `App Root & Nav Theme`, `Schedule List Components`, `Home Hero & Need-to-Know Cards`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `Session` connect `Schedule List Components` to `Screen Layout & Conference Config`, `Calendar Sync`, `Conference Data Fetch/Cache Service`, `Session/Break List Items & Legend`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _218 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Schedule List Components` be split into smaller, more focused modules?**
  _Cohesion score 0.08257229832572298 - nodes in this community are weakly interconnected._
- **Should `App Bootstrap & Data Providers` be split into smaller, more focused modules?**
  _Cohesion score 0.05505952380952381 - nodes in this community are weakly interconnected._
- **Should `Screen Layout & Conference Config` be split into smaller, more focused modules?**
  _Cohesion score 0.08597285067873303 - nodes in this community are weakly interconnected._