module.exports = {
	lintOnSave: false,
	publicPath: './',
	outputDir: 'dist',
	assetsDir: './admin/',
	devServer: {
		open: true,
		host: 'localhost',
		port: 8888,
		https: false,
		proxy: {
			'/cgi': {
				target: 'http://192.168.10.1',
				ws: true,
				changOrigin: true,
				pathRewrite: {
					'^/cgi': '/cgi-bin/http.cgi'
				}
			}
		}
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
