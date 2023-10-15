const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      "/api":{
        target:"http://47.94.103.61:8081/",
        changeOrigin: true,
      }
    }
  }
})
