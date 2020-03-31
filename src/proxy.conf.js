const PROXY_CONFIG = [
  {
    context: ['/api', '/services', '/management', '/swagger-resources', '/v2/api-docs', '/h2-console', '/oauth2', '/login', '/auth'],
    target: 'http://localhost:8180',
    secure: false,
    changeOrigin: false,
  },
];

module.exports = PROXY_CONFIG;
