import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface getUserInvoiceParams {
	id: number
	user_id?: number
}

export type downloadUserInvoiceConfig =
	FetchesRequestConfig<getUserInvoiceParams>

export const downloadUserInvoice = ({
	params,
	config,
}: downloadUserInvoiceConfig) => {
	return $Api.get<ArrayBuffer>(`/v1/order/get-invoice/${params.id}/`, {
		params: { user_id: params.user_id },
		parse: 'arrayBuffer',
		...config,
	})
}
