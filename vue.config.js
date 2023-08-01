const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://10.0.11.50',
        changeOrigin: true,
      }
    }
  },
})
