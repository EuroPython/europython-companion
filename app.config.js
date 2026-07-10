// Build-time only: read by the Expo CLI/Node while resolving config, never
// shipped into src/ or the client bundle. Defaults to root; deploy-web.yaml
// sets WEB_BASE_URL=/europython-companion for the GitHub Pages build.
const baseUrl = process.env.WEB_BASE_URL ?? "";

module.exports = {
  expo: {
    name: "EuroPython",
    slug: "europython-companion",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    ios: {
      icon: "./assets/icon-ios.png",
      supportsTablet: true,
      bundleIdentifier: "eu.europython.companion",
      infoPlist: {
        NSCalendarsUsageDescription:
          "Allow EuroPython Companion to add sessions to your calendar.",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon-adaptive.png",
        backgroundColor: "#001B31",
      },
      predictiveBackGestureEnabled: false,
      permissions: ["READ_CALENDAR", "WRITE_CALENDAR"],
      package: "eu.europython.companion",
    },
    web: {
      favicon: "./assets/icon.png",
      name: "EuroPython",
      description: "Your companion for the EuroPython in your pocket.",
      themeColor: "#001B31",
    },
    experiments: {
      baseUrl,
    },
    plugins: [
      "expo-notifications",
      "expo-font",
      "expo-calendar",
      "expo-system-ui",
      "expo-status-bar",
      "expo-image",
      [
        "expo-splash-screen",
        {
          image: "./assets/icon.png",
          resizeMode: "contain",
          backgroundColor: "#001B31",
        },
      ],
    ],
  },
};
