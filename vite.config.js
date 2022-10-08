// vite.config.js
const { resolve } = require('path')

module.exports = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        chicknugbot: resolve(__dirname, 'chick-nug-bot/index.html')
      }
    }
  }
}