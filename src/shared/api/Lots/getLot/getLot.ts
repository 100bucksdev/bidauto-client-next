import { $Api } from '@/config/api.config'
import { TLot } from '@/types/Lot.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getLotParams {
	vinOrId: number | string | undefined
	auction?: 'COPART' | 'IAAI'
}

export type getLotConfig = FetchesRequestConfig<getLotParams>

export const getLot = async ({
	config,
	params,
}: getLotConfig): Promise<FetchesResponse<TLot[] | TLot>> => {
	return $Api.get(`/auction-vehicles/get-vin-or-lot/`, {
		params: {
			vin_or_id: params.vinOrId,
			auction: params.auction,
		},
		...config,
	})
}
