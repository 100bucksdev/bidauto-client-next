import { $Api } from '@/config/api.config'
import { IOffers } from '@/types/Offers.interface'
import { IPagination } from '@/types/Pagination.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getBuyNowOffersParams {
	page: number
}

export type getBuyNowOffersConfig = FetchesRequestConfig<getBuyNowOffersParams>

export const getBuyNowOffers = ({
	params,
	config,
}: getBuyNowOffersConfig): Promise<
	FetchesResponse<{
		pagination: IPagination
		data: IOffers[]
	}>
> => {
	return $Api.get(
		'/auction-vehicles/buy-now-offers/',
		{},
		{
			params: {
				page: params.page,
			},
			...config,
		}
	)
}
