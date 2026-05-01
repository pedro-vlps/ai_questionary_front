const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const api_url = process.env.REACT_APP_BASE_API_URL

const app = express();

// 🔥 PROXY PARA API (URL INTERNA DO RAILWAY)
app.use(
  "/api",
  createProxyMiddleware({
    target: api_url,
    changeOrigin: true,
  })
);

// 📦 Servir o build do React
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});