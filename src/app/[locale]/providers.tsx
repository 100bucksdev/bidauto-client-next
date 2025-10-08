'use client'

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

	useEffect(() => {
		const savedLanguage = localStorage.getItem('selectedLanguage')
		if (savedLanguage) {
			router.push(`/${savedLanguage}/${window.location.pathname}`)
		} else {
			router.push(`/lt/${window.location.pathname}`)
			localStorage.setItem('selectedLanguage', 'lt')
			localStorage.setItem('isDefaultLanguage', 'true')
		}
	}, [])

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
