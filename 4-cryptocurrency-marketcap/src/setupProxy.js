const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
    app.use(
        '​/api',
        createProxyMiddleware({
            target: 'http://siteurl1.com',
            changeOrigin: true,
        })
    );
};
