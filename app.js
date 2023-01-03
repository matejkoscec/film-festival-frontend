/* eslint-disable */
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const path = require("path");

const app = express();

// Configuration
const { PORT, API_BASE_URL } = process.env;

// Proxy
if (API_BASE_URL) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: API_BASE_URL,
      changeOrigin: true,
    })
  );
}

app.use(express.static(path.join(__dirname, "dist")));

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
