module.exports = {
	lintOnSave: false,
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: './admin/',
	devServer: {
		disableHostCheck: true,
		// proxy: {
		// 	'/v1': {
		// 		target: 'http://api.douban.com/v1',
		// 		changeOrigin: true,
		// 		ws: true,
		// 		pathRewrite: {
		// 			'^/v1': ''
		// 		}
		// 	}
		// }
	},
	css: {
		loaderOptions: {
		  less: {
			lessOptions: {
			  modifyVars: {
				'primary-color': '#1DA57A',
				'link-color': '#1DA57A',
				'border-radius-base': '2px',
			  },
			  javascriptEnabled: true,
			},
		  },
		},
	  }
};
