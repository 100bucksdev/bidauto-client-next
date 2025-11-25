import { $Api } from '@/config/api.config'
import { TLot } from '@/types/Lot.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getSimilarArchivalOffersParams {
	auction: 'copart' | 'iaai'
	make: string
	model: string
	year: number
	vehicle_type: string
}

export type getSimilarArchivalOffersConfig =
	FetchesRequestConfig<getSimilarArchivalOffersParams>

export const getSimilarArchivalOffers = ({
	params,
	config,
}: getSimilarArchivalOffersConfig): Promise<
	FetchesResponse<{
		data: TLot[]
		'make-model': Record<'make' | 'model', string>
	}>
> => {
	return $Api.get(`/public/v1/lot/similar-sales/`, {
		params: {
			site: params.auction,
			make: params.make,
			model: params.model,
			year: params.year,
			vehicle_type: params.vehicle_type,
		},
		...config,
	})
}
