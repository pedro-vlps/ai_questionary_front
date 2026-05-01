const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cookieParser = require("cookie-parser");

const api_url = process.env.REACT_APP_BASE_API_URL

const app = express();

// Parse de cookies
app.use(cookieParser());

// 🔥 PROXY PARA API (URL INTERNA DO RAILWAY)
app.use(
  "/api",
  createProxyMiddleware({
    target: api_url,
    changeOrigin: true,
    secure: false,
    ws: true,
    onProxyReq: (proxyReq, req, res) => {
      // Preserva headers originais
      proxyReq.setHeader('Content-Type', req.headers['content-type'] || 'application/json');
      
      // Encaminha cookies do browser para a API
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      // Encaminha cookies da API de volta para o browser
      if (proxyRes.headers['set-cookie']) {
        res.setHeader('Set-Cookie', proxyRes.headers['set-cookie']);
      }
    },
    cookieDomainRewrite: {
      "*": "" // Remove domínio dos cookies para funcionar no domínio atual
    },
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