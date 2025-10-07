import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { DefaultMetadata } from '@/config/ceo.config'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { Roboto } from 'next/font/google'
import { notFound } from 'next/navigation'
import { useEffect } from 'react'
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

	useEffect(() => {
		const savedLanguage = localStorage.getItem('selectedLanguage')
		if (savedLanguage) {
			window.location.href = `/${savedLanguage}/${window.location.pathname}`
		} else {
			window.location.href = `/lt/${window.location.pathname}`
			localStorage.setItem('selectedLanguage', 'lt')
			localStorage.setItem('isDefaultLanguage', 'true')
		}
	})

	return (
		<html lang={locale}>
			<body className={`${roboto.variable} antialiased bg-t-white-bg`}>
				<NextIntlClientProvider>
					<Providers>
						<header>
							<Header />
						</header>
						<main>{children}</main>
						<footer>
							<Footer />
						</footer>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
