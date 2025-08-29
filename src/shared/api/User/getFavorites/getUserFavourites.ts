import { $Api } from '@/config/api.config'
import { IUser } from '@/types/User.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getUserFavouritesParams {
	user_id?: number
	page: number
	sort: number
}

export type getUserFavouritesConfig =
	FetchesRequestConfig<getUserFavouritesParams>

export const getUserFavourites = ({
	params,
	config,
}: getUserFavouritesConfig): Promise<
	FetchesResponse<{
		pagination: { page: number; pages: number; size: number; count: number }
		user: IUser
	}>
> => {
	return $Api.get('/favorite/', {
		params: {
			page: params.page,
			filter_by: params.sort,
			user_id: params.user_id,
		},
		...config,
	})
}
