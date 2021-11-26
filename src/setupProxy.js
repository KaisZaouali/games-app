const { createProxyMiddleware } = require("http-proxy-middleware");

var backendUrl = "http://localhost:3005";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware("/api", {
      target: backendUrl,
      changeOrigin: true,
      logLevel: "debug",
      secure: false,
      pathRewrite: function (path, req) {
        return path.replace("/api", "");
      },
    })
  );
};
