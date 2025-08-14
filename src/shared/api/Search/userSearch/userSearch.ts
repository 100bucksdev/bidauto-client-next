import { $Api } from '@/config/api.config'
import { ISearchParams } from '@/store/searchOptions.store'
import { TLot } from '@/types/Lot.interface'
import { IPagination } from '@/types/Pagination.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface userSearchParams
	extends Partial<ISearchParams & { page: number }> {}

export type userSearchConfig = FetchesRequestConfig<userSearchParams>

export const userSearch = ({
	params,
	config,
}: userSearchConfig): Promise<
	FetchesResponse<
		| {
				pagination: IPagination
				lots: TLot[]
				make_model: {
					make: Record<'name' | 'slug', string> | null
					model: Record<'name' | 'slug', string> | null
				}
		  }
		| TLot[]
		| TLot
	>
> => {
	return $Api.get(
		'/auction-vehicles/search/',
		{},
		{
			params: {
				is_archived: params.archived === 'true' ? true : false,
				q: params.q,
				page: params.page,
				make:
					params.make?.toUpperCase() === 'ALL_MAKES' ? undefined : params.make,
				model:
					params.model?.toUpperCase() === 'ALL_MODELS'
						? undefined
						: params.model,
				auction: params.auction,
				year_from: params.yearFrom,
				year_to: params.yearTo,
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
			...config,
		}
	)
}
