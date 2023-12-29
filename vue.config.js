const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      "/api":{
        target:"http://47.94.103.61:8081/",
        changeOrigin: true,
      },
      "/webhooks":{
        target:"http://47.94.103.61:5005/",
        changeOrigin: true,
      }
    }
  },
  configureWebpack:{
    plugins: [
      new NodePolyfillPlugin()
    ]
  }
})
