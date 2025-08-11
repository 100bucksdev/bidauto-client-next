import { $Api } from '@/config/api.config'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface setLotToFavouritesParams {
	lot_id: number
	auction_name: 'COPART' | 'IAAI'
}

export type setLotToFavouritesConfig =
	FetchesRequestConfig<setLotToFavouritesParams>

export const setLotToFavourites = async ({
	config,
	params,
}: setLotToFavouritesConfig): Promise<FetchesResponse<string[]>> => {
	return $Api.post(
		`/favorite/${params.auction_name?.toLowerCase()}/${params.lot_id}/`,
		{
			...config,
		}
	)
}
