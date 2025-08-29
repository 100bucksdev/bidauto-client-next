import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface GetUserInvoiceParams {
	id: number
	user_id?: number
}

export type GetUserInvoiceConfig = FetchesRequestConfig<GetUserInvoiceParams>

export const getUserInvoice = async ({
	params,
	config,
}: GetUserInvoiceConfig) => {
	return $Api.get<ArrayBuffer>(`/order/get-invoice/${params.id}/`, {
		...config,
		params: { user_id: params.user_id },
		parse: 'arrayBuffer',
	})
}
