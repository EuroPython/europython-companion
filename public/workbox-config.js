// Must match the WEB_BASE_URL used for the same build (see app.config.js).
const baseUrl = process.env.WEB_BASE_URL ?? "";

module.exports = {
  globDirectory: "dist",
  globPatterns: ["**/*.{js,css,html,png,ico,json,webp,ttf,woff,woff2}"],
  swDest: "dist/service-worker.js",
  skipWaiting: true,
  clientsClaim: true,
  navigateFallback: `${baseUrl}/index.html`,
  globIgnores: [], // so the fonts in node_modules are included
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
  runtimeCaching: [
    {
      urlPattern: ({ url }) =>
        url.origin === "https://programme.europython.eu" &&
        url.pathname.startsWith("/media/avatars/"),
      handler: "CacheFirst",
      options: {
        cacheName: "speaker-avatars",
        // Pretalx avatar URLs are content-addressed
        expiration: { maxEntries: 250, maxAgeSeconds: 60 * 24 * 60 * 60 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
  ],
};
