import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface getUserBidsParams {
	sort: string
	user_id?: number
	user_status?: string
	page: number
}

export type getUserBidsConfig = FetchesRequestConfig<getUserBidsParams>

export const getUserBids = ({ params, config }: getUserBidsConfig) => {
	return $Api.get(
		'/bid/',
		{},
		{
			params: {
				page: params.page,
				filter_by: params.sort,
				user_id: params.user_id,
				user_status: params.user_status,
			},
			...config,
		}
	)
}
