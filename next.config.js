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
	images: {
		domains: ['thumbs2.imgbox.com', 'cdn.myanimelist.net', 'res.cloudinary.com', 'i.imgur.com'],
	},
}