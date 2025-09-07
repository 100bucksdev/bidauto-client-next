import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**', // все домены
				pathname: '/**', // все пути
			},
			// // Copart
			// {
			// 	protocol: 'https',
			// 	hostname: 'cs.copart.com',
			// 	port: '',
			// 	pathname: '/**',
			// },
			// // IAAI
			// {
			// 	protocol: 'https',
			// 	hostname: 'vis.iaai.com',
			// 	port: '',
			// 	pathname: '/**',
			// 	search: '**', // важно: разрешаем query-параметры
			// },
		],
	},
	eslint: {
		// ❌ Не прерывать build из-за eslint-ошибок
		ignoreDuringBuilds: true,
	},
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
