# Graph Report - europython-companion  (2026-07-06)

## Corpus Check
- 92 files · ~29,277 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 543 nodes · 834 edges · 34 communities (28 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.69)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `de37b266`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

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
- [[_COMMUNITY_conference.ts|conference.ts]]
- [[_COMMUNITY_homeInfo.ts|homeInfo.ts]]
- [[_COMMUNITY_onboarding.ts|onboarding.ts]]
- [[_COMMUNITY_share.ts|share.ts]]

## God Nodes (most connected - your core abstractions)
1. `Architecture (docs)` - 20 edges
2. `Data and State (docs)` - 14 edges
3. `paths` - 13 edges
4. `Project Structure (docs)` - 12 edges
5. `expo` - 11 edges
6. `Development Workflow (docs)` - 11 edges
7. `scripts` - 9 edges
8. `useScheduleNotifications()` - 9 edges
9. `Documentation Index` - 9 edges
10. `src/services/data.ts` - 9 edges

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

## Communities (34 total, 6 thin omitted)

### Community 0 - "Schedule List Components"
Cohesion: 0.19
Nodes (7): Props, styles, Props, Props, StateMessage(), styles, styles

### Community 1 - "App Bootstrap & Data Providers"
Cohesion: 0.06
Nodes (64): app.json (Expo config), App.tsx (root component), ConferenceDataProvider (src/store/conferenceData.tsx), src/config/conference.ts, src/config/constants.ts, src/data/sessionTypes.ts, dev-proxy.mjs, FavoritesProvider (src/store/favorites.tsx) (+56 more)

### Community 2 - "Screen Layout & Conference Config"
Cohesion: 0.07
Nodes (44): FavoriteToggleButton(), IconButtonProps, Props, AddResult, BulkOptions, BulkResult, RemoveResult, SingleOptions (+36 more)

### Community 3 - "NPM Dependencies"
Cohesion: 0.07
Nodes (28): dependencies, expo, expo-calendar, @expo/dom-webview, expo-font, expo-haptics, expo-notifications, expo-splash-screen (+20 more)

### Community 4 - "Conference Data Fetch/Cache Service"
Cohesion: 0.08
Nodes (46): addMinutesToIso(), buildBasePath(), buildDays(), buildProdBaseUrl(), CachedConferencePayload, conferenceCacheKey(), fetchJson(), isConferenceData() (+38 more)

### Community 5 - "Session/Break List Items & Legend"
Cohesion: 0.06
Nodes (29): DetailAction, Props, styles, Props, styles, createStyles(), MarkdownBody(), Props (+21 more)

### Community 6 - "Navigation Routes & CoC Data"
Cohesion: 0.10
Nodes (28): navigationRef, AgendaStackParamList, AgendaStackRoutes, CombinedParamList, HomeStackParamList, HomeStackRoutes, OnboardingStackParamList, OnboardingStackRoutes (+20 more)

### Community 7 - "Expo App Config (app.json)"
Cohesion: 0.06
Nodes (26): backgroundColor, foregroundImage, adaptiveIcon, package, permissions, predictiveBackGestureEnabled, builtStacks, expo (+18 more)

### Community 8 - "App Root & Nav Theme"
Cohesion: 0.13
Nodes (9): MAX_DATE_ISO, NOTIFICATION_LEAD_OPTIONS, ScheduleItem, groupBySessionStartLabel(), normalizeIso(), SortableScheduleItem, SortableStartInput, toSortableStartItem() (+1 more)

### Community 9 - "TypeScript Path Aliases"
Cohesion: 0.11
Nodes (18): compilerOptions, noUnusedLocals, noUnusedParameters, paths, strict, extends, @/*, @app-types/* (+10 more)

### Community 10 - "Schedule Filter Components"
Cohesion: 0.09
Nodes (15): DayOption, Props, styles, Props, styles, capitalizeWords(), Props, ScheduleLevelFilter() (+7 more)

### Community 11 - "Calendar Sync"
Cohesion: 0.22
Nodes (8): useEffectiveTimeZone(), getEffectiveTimeZone(), SettingsContext, SettingsContextValue, SettingsState, ThemeMode, TimeZonePreference, useSettings()

### Community 12 - "CoC Contacts Screen"
Cohesion: 0.25
Nodes (5): Contact, Props, styles, contacts, styles

### Community 13 - "Home Hero & Need-to-Know Cards"
Cohesion: 0.10
Nodes (11): HomeHeroCard(), Props, styles, NeedToKnowList(), Props, Action, Props, styles (+3 more)

### Community 14 - "Favorites Store & Local Storage"
Cohesion: 0.32
Nodes (10): FavoritesContext, FavoritesContextValue, FavoritesProvider(), KEY_PER_YEAR(), loadFavorites(), saveFavorites(), loadJsonData(), loadJsonFromStorage() (+2 more)

### Community 15 - "Search Bar & Offline Banner"
Cohesion: 0.16
Nodes (8): Props, OfflineBanner(), Props, styles, OfflineNotice(), Props, styles, styles

### Community 16 - "Theme & Color Palettes"
Cohesion: 0.24
Nodes (5): PaddedScrollView(), Props, ScheduledItem, styles, styles

### Community 17 - "Settings Row Components"
Cohesion: 0.22
Nodes (9): scripts, android, dev:proxy, format, format:check, ios, start, typecheck (+1 more)

### Community 18 - "Detail Action Row"
Cohesion: 0.25
Nodes (8): devDependencies, babel-plugin-module-resolver, express, http-proxy-middleware, prettier, @types/express, @types/react, typescript

### Community 19 - "Info Card"
Cohesion: 0.25
Nodes (4): Props, styles, SlideAction, styles

### Community 20 - "Chip Picker Input"
Cohesion: 0.40
Nodes (3): Option, Props, styles

### Community 21 - "Settings Section"
Cohesion: 0.33
Nodes (5): main, name, packageManager, private, version

### Community 22 - "Social Links Row"
Cohesion: 0.20
Nodes (6): Props, SocialLink, styles, Props, SpeakerAvatar(), styles

### Community 28 - "Legacy Color Export"
Cohesion: 0.83
Nodes (3): extractSessionId(), navigateToSession(), useNotificationDeepLink()

### Community 29 - "conference.ts"
Cohesion: 0.33
Nodes (4): CONFERENCE_META, CONFERENCE_YEARS, ConferenceMeta, DEFAULT_CONFERENCE_YEAR

## Knowledge Gaps
- **212 isolated node(s):** `name`, `slug`, `version`, `orientation`, `icon` (+207 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SpeakerAvatar()` connect `Social Links Row` to `Session/Break List Items & Legend`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `Session` connect `Screen Layout & Conference Config` to `App Root & Nav Theme`, `Conference Data Fetch/Cache Service`, `Session/Break List Items & Legend`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _220 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Bootstrap & Data Providers` be split into smaller, more focused modules?**
  _Cohesion score 0.05505952380952381 - nodes in this community are weakly interconnected._
- **Should `Screen Layout & Conference Config` be split into smaller, more focused modules?**
  _Cohesion score 0.07393483709273183 - nodes in this community are weakly interconnected._
- **Should `NPM Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Conference Data Fetch/Cache Service` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._