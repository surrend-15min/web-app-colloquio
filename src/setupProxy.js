const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Configurazione del proxy per la prima API
  app.use(
    '/api1',
    createProxyMiddleware({
      target: 'https://89nutx8pxe.execute-api.eu-central-1.amazonaws.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api1': '/dev',
      },
    })
  );

  // Configurazione del proxy per la seconda API
  app.use(
    '/api2',
    createProxyMiddleware({
      target: 'https://wcjyl7qkhh.execute-api.eu-central-1.amazonaws.com',
      changeOrigin: true,
    })
  );
};
