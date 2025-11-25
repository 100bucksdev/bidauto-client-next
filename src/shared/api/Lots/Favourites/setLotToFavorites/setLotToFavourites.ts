import { $Api } from '@/config/api.config'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface setLotToFavouritesParams {
	favorite_id: number
}

export type setLotToFavouritesConfig =
	FetchesRequestConfig<setLotToFavouritesParams>

export const setLotToFavourites = async ({
	config,
	params,
}: setLotToFavouritesConfig): Promise<FetchesResponse<string[]>> => {
	return $Api.post(
		`/private/v1/favorites/`,
		{
			favorite_id: params.favorite_id,
		},
		{
			...config,
		}
	)
}
