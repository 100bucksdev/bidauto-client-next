import { $Api } from '@/config/api.config'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface deleteLotToFavouritesParams {
	lot_id: number
	auction_name: 'COPART' | 'IAAI'
}

export type deleteLotToFavouritesConfig =
	FetchesRequestConfig<deleteLotToFavouritesParams>

export const deleteLotToFavourites = async ({
	config,
	params,
}: deleteLotToFavouritesConfig): Promise<FetchesResponse<string[]>> => {
	return $Api.delete(
		`/favorite/${params.auction_name?.toLowerCase()}/${params.lot_id}/`,
		{
			...config,
		}
	)
}
