/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
        // localPatterns: [{
        //     protocol: 'http',
        //     hostname: 'localhost',
        //     port: '3000',
        // }],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
        }, 
        {
            protocol: 'https',
            hostname: 'cloud.appwrite.io',
            port: '',
        },
        {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
        }
    ],
    domains: [
        'images.unsplash.com',
        'cloud.appwrite.io',
        'localhost',
        ''
    ],
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
				],
			},
		];
	},
};

export default nextConfig;
