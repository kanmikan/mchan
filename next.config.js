module.exports = {
	async rewrites() {
		return [
			{
				source: '/uploads',
				destination: '/404',
			},
		]
	},
	reactStrictMode: false,
	experimental: {
		scrollRestoration: true,
	},
}