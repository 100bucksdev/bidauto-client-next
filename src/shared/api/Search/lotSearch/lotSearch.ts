import { $Api } from '@/config/api.config'
import { ISearchParams, TVehicles } from '@/store/searchOptions.store'
import { TLot } from '@/types/Lot.interface'
import { IPagination } from '@/types/Pagination.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface lotSearchParams
	extends Partial<ISearchParams & { page: number }> {}

export type lotSearchConfig = FetchesRequestConfig<lotSearchParams>

export const lotSearch = ({
	params,
	config,
}: lotSearchConfig): Promise<
	FetchesResponse<{
		pagination: IPagination
		lots: TLot[] & { make: TVehicles; model: string }
	}>
> => {
	return $Api.get(
		'/auction-vehicles/get-active-lots/',
		{},
		{
			params: {
				make:
					params.make?.toUpperCase() === 'ALL_MAKES' ? undefined : params.make,
				model:
					params.model?.toUpperCase() === 'ALL_MODELS'
						? undefined
						: params.model,
				auction: params.auction,
				year_from: params.yearFrom,
				year_to: params.yearTo,
				page: params.page,
				auction_date_from: !params.auctionDateFrom
					? undefined
					: params.auctionDateFrom,
				auction_date_to: !params.auctionDateTo
					? undefined
					: params.auctionDateTo,
				current_bid_from: !params.bidFrom ? undefined : params.bidFrom,
				current_bid_to: !params.bidTo ? undefined : params.bidTo,
				is_buy_now: params.isBuyNow === 'true' ? 1 : 0,
				vehicle_type: params.type,
				buy_now_price_min: params.buyNowPriceFrom || undefined,
				buy_now_price_max: params.buyNowPriceTo || undefined,
				fuel:
					params.fuel?.toUpperCase() !== 'ALL_FUELS' && params.fuel !== ''
						? params.fuel
						: undefined,
				seller:
					params.seller?.toUpperCase() !== 'ALL_SELLERS' && params.seller !== ''
						? params.seller
						: undefined,
				vehicle_condition:
					params.vehicle_condition?.toUpperCase() !== 'ALL_CONDITIONS' &&
					params.vehicle_condition !== ''
						? params.vehicle_condition
						: undefined,
				odometer_min: params.odometerFrom ? params.odometerFrom : undefined,
				odometer_max: params.odometerTo,
				insurance:
					params.insurance?.toUpperCase() === 'ALL'
						? undefined
						: params.insurance,
			},
		}
	)
}
