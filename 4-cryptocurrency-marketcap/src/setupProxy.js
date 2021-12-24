const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
    app.use(
        '​/api',
        createProxyMiddleware({
            target: 'https://serdargokhan-crypto-marketcap.netlify.app/',
            changeOrigin: true,
        })
    );
};
