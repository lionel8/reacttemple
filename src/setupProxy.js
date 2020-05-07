// https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
// https://github.com/chimurai/http-proxy-middleware

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api/rest', createProxyMiddleware({
      target: 'https://query.aliyun.com',  // target host
      changeOrigin: true,  // needed for virtual hosted sites
      ws: false,  // proxy websockets
      pathRewrite: {
        '^/api': ''
      },
      router: {
        // when request.headers.host == 'dev.localhost:3000',
        // override target 'http://www.example.org' to 'http://localhost:8000'
        'dev.localhost:3000': 'http://localhost:8000',
      }
    })
  );
};
