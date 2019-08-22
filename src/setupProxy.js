const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api/media', { pathRewrite: { '^/api/media': '' }, target: 'https://testmedia.mesensei.com/', 'secure': false, 'changeOrigin': true }));
};