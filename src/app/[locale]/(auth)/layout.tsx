import ChatGPTWidget from '@/components/AI/ChatGPTWidget'
import { DefaultMetadata } from '@/config/ceo.config'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { Roboto } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../../global.css'
import { Providers } from '../providers'

const roboto = Roboto({
	variable: '--font-roboto-sans',
	subsets: ['latin'],
})

export const metadata: Metadata = DefaultMetadata

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ locale: string }>
}>) {
	const { locale } = await params
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	return (
		<html lang={locale}>
			<body className={`${roboto.variable} antialiased`}>
				<NextIntlClientProvider>
					<Providers>
						<main>{children}</main>
						<ChatGPTWidget />
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
