const proxy = [
  {
    context: '/api',
    target: 'http://localhost:3001',
    pathRewrite: { '^/api': '' }
  }
];

  module.exports = proxy;
