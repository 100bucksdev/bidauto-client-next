import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import { getUserInvoice, GetUserInvoiceConfig } from './getUserInvoice'

export function useGetUserInvoice(
	settings?: MutationSettings<GetUserInvoiceConfig, typeof getUserInvoice>
) {
	return useMutation({
		mutationFn: ({ params, config }) =>
			getUserInvoice({
				params,
				config: { ...config, ...settings?.config },
			}),
		...settings?.options,
		onSuccess: (data, variables, context) => {
			const blob = new Blob([data.data], { type: 'application/pdf' })
			const url = window.URL.createObjectURL(blob)

			const newWindow = window.open('', '_blank')

			if (newWindow) {
				newWindow.location.href = url
			} else {
				window.location.href = url
			}

			settings?.options?.onSuccess?.(data, variables, context)
		},
	})
}
