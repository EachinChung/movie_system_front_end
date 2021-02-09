module.exports = {
  productionSourceMap: false,
  devServer: {
    open:true,
    host: "0.0.0.0",
    port: '8080',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/admin': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
}
