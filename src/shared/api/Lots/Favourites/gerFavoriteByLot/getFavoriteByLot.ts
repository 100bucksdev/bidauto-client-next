import { $Api } from '@/config/api.config'
import { IFavoriteVehicle } from '@/types/Favorite.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getFavoriteByLotParams {
	lotId: number
	auction: 'copart' | 'iaai'
}

export type getFavoriteByLotConfig =
	FetchesRequestConfig<getFavoriteByLotParams>

export const getFavoriteByLot = ({
	params,
	config,
}: getFavoriteByLotConfig): Promise<FetchesResponse<IFavoriteVehicle>> => {
	return $Api.get('/private/v1/favorites/for-lot', {
		params: {
			lot_id: params.lotId,
			auction: params.auction,
		},
		...config,
	})
}
