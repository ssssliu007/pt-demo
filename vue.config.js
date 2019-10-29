

module.exports = {
  publicPath: '/',
  lintOnSave: true,
  configureWebpack: (config) => {
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...
      config.mode = 'production';
		} else {
      // 为开发环境修改配置...
      config.devtool = 'source-map',
      config.mode = 'development';
		}
  },
  devServer: {
    // host: '127.0.0.1', // can be overwritten by process.env.HOST
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://192.168.0.119:8000',   //代理接口
        // target: 'http://192.168.0.135:8000', //代理接口
        // target: 'http://192.168.0.119:8000',   
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''    //代理的路径
        }
      }
    }

  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}