import { $Api } from '@/config/api.config'
import { TLot } from '@/types/Lot.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getSimilarArchivalOffersParams {
	auction: 'COPART' | 'IAAI'
	id: string
}

export type getSimilarArchivalOffersConfig =
	FetchesRequestConfig<getSimilarArchivalOffersParams>

export const getSimilarArchivalOffers = ({
	params,
	config,
}: getSimilarArchivalOffersConfig): Promise<
	FetchesResponse<{
		lots: TLot[]
		'make-model': Record<'make' | 'model', string>
	}>
> => {
	return $Api.get(
		`/auction-vehicles/archival-offers/${params.id}/${params.auction}/`,
		{
			...config,
		}
	)
}
