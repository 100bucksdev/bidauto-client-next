import { $Api } from '@/config/api.config'
import { IUser } from '@/types/User.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getUserBidsParams {
	sort: string
	user_id?: number
	user_status?: string
	page: number
}

export type getUserBidsConfig = FetchesRequestConfig<getUserBidsParams>

export const getUserBids = ({
	params,
	config,
}: getUserBidsConfig): Promise<
	FetchesResponse<{
		pagination: { page: number; pages: number; size: number; count: number }
		user: IUser
	}>
> => {
	return $Api.get('/bid/', {
		params: {
			page: params.page,
			filter_by: params.sort,
			user_id: params.user_id,
			user_status: params.user_status,
		},
		...config,
	})
}
