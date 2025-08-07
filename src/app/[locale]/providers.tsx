'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

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

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
