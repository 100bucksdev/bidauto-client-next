import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import {
	downloadUserInvoice,
	downloadUserInvoiceConfig,
} from './downloadUserInvoice'

export function useDownloadUserInvoice(
	settings?: MutationSettings<
		downloadUserInvoiceConfig,
		typeof downloadUserInvoice
	>
) {
	return useMutation({
		mutationFn: ({ params, config }) =>
			downloadUserInvoice({
				params,
				config: { ...config, ...settings?.config },
			}),
		...settings?.options,
		onSuccess: (data, variables, context) => {
			const blob = new Blob([data.data], { type: 'application/pdf' })
			const url = window.URL.createObjectURL(blob)

			const a = document.createElement('a')
			a.href = url
			a.download = 'invoice.pdf'

			document.body.appendChild(a)
			a.click()

			document.body.removeChild(a)
			window.URL.revokeObjectURL(url)

			settings?.options?.onSuccess?.(data, variables, context)
		},
	})
}
