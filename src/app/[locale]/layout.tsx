import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { DefaultMetadata } from '@/config/ceo.config'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { Roboto } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../global.css'

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
					<header>
						<Header />
					</header>
					<main className='mx-72'>{children}</main>
					<footer>
						<Footer />
					</footer>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
