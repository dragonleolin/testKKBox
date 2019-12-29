const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/oauth2/token",
    proxy({
      target: "https://account.kkbox.com/oauth2/token",
      changeOrigin: true
    })
  );
};
