import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use((req, _res, next) => {
  console.log(`[dev-proxy] ${req.method} ${req.url}`);
  next();
});

app.use(
  "/programme",
  createProxyMiddleware({
    changeOrigin: true,
    logger: console,
    router: (req) => {
      // extract year from the path: /programme/ep{year}/...
      const match = req.url.match(/^\/ep(\d{4})\b/);
      const year = match ? match[1] : "2025";
      return `https://static.europython.eu/programme/ep${year}`;
    },
    pathRewrite: (path) => {
      // strip the /programme/ep{year} prefix because it's already in target
      return path.replace(/^\/ep\d{4}/, "");
    },
  })
);

app.listen(PORT, () => {
  console.log(
    `Dev proxy running at http://localhost:${PORT}/programme/ep{year} → https://static.europython.eu/programme/ep{year}`
  );
});
