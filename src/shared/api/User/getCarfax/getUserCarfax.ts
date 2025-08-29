import { $Api } from '@/config/api.config'
import { IUser } from '@/types/User.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getUserCarfaxParams {
	user_id: number | undefined
	sort: string
	page: number
}

export type getUserCarfaxConfig = FetchesRequestConfig<getUserCarfaxParams>

export const getUserCarfax = ({
	params,
	config,
}: getUserCarfaxConfig): Promise<
	FetchesResponse<{
		pagination: { page: number; pages: number; size: number; count: number }
		user: IUser
	}>
> => {
	return $Api.get('/carfax/', {
		params: { user_id: params.user_id, sort: params.sort, page: params.page },
		...config,
	})
}
