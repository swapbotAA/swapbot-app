const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave:false,
//   devServer:{
//     proxy:{
//       "/api":{
//         target:"http://47.94.103.61:8081/",
//         changeOrigin: true,
//       },
//       "/webhooks":{
//         target:"http://18.142.253.142:5005/",
//         changeOrigin: true,
//       }
//     }
//   },
//   configureWebpack:{
//     plugins: [
//       new NodePolyfillPlugin()
//     ]
//   }
// })
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer:{
    proxy:{
      "/api":{
        target: process.env.NODE_ENV === "production" ? "http://ec2-13-229-242-67.ap-southeast-1.compute.amazonaws.com:8081/api/" : "http://ec2-13-229-242-67.ap-southeast-1.compute.amazonaws.com:8081/api/",
        changeOrigin: process.env.NODE_ENV === "production" ? false : true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      "/webhooks":{
        target:"http://18.142.253.142:5005/webhooks/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/webhooks': ''
        }
      },
      // "/serviceworker/redirect":{
      //   target:"/",
      //   changeOrigin: false,
      //   ws: true,
      //   pathRewrite: {
      //     '^/serviceworker/redirect': ''
      //   }
      // }
    }
  },
  configureWebpack:{
    plugins: [
      new NodePolyfillPlugin()
    ]
  }
})