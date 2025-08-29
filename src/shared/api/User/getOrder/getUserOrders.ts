import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface getUserOrdersParams {
	user_id: number | undefined
	page: number
}

export type getUserOrdersConfig = FetchesRequestConfig<getUserOrdersParams>

export const getUserOrders = ({ params, config }: getUserOrdersConfig) => {
	return $Api.get('/order/', {
		params: { page: params.page, user_id: params.user_id },
		...config,
	})
}
