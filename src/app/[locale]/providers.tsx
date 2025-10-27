'use client'

import { SupportChatProvider } from '@/components/AI/hook/useSupportChat'
import { usePathname } from '@/i18n/navigation'
import { GoogleReCaptchaProvider } from '@google-recaptcha/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'

export function Providers({ children }: PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
				},
				mutations: {
					// onError: (error: unknown) => {
					// 	const backendErrorMessage =
					// 		(error as BackendError)?.response?.data?.message ||
					// 		'Щось пішло не так'
					// 	toast({
					// 		title: 'Помилка',
					// 		description: backendErrorMessage,
					// 		variant: 'destructive',
					// 	})
					// },
				},
			},
		})
	)

	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		const savedLanguage = localStorage.getItem('selectedLanguage')
		if (savedLanguage) {
			router.push(`/${savedLanguage}${pathname}`)
		} else {
			router.push(`/lt${pathname}`)
			localStorage.setItem('selectedLanguage', 'lt')
			localStorage.setItem('isDefaultLanguage', 'true')
		}
	}, [])

	return (
		<GoogleReCaptchaProvider
			type='v3'
			siteKey={
				process.env.NEXT_PUBLIC_RECAPTCHA_KEY ||
				'6LcsN7gpAAAAAIeq9lUlHXNGapKqqzgygsngw8Mw'
			}
		>
			<SupportChatProvider>
				<QueryClientProvider client={client}>{children}</QueryClientProvider>
			</SupportChatProvider>
		</GoogleReCaptchaProvider>
	)
}
