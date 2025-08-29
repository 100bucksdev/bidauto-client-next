import { $Api } from '@/config/api.config'
import { IPagination } from '@/types/Pagination.interface'
import {
	IShopVehicle,
	TShopVehicleResponseStatuses,
} from '@/types/Shop.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getAllAuctionVehiclesParams {
	page: number
	search?: string
	category?: string | string[]
}

export type getAllAuctionVehiclesConfig =
	FetchesRequestConfig<getAllAuctionVehiclesParams>

export const getAllAuctionVehicles = ({
	params,
	config,
}: getAllAuctionVehiclesConfig): Promise<
	FetchesResponse<{
		pagination: IPagination
		vehicles: IShopVehicle[]
		vehicles_statuses: TShopVehicleResponseStatuses
		category: null | { id: number; name: string; slug: string }
	}>
> => {
	return $Api.get(`/shop/?purchase_mode=auction combined`, {
		params: {
			search: params.search,
			page: params.page,
			category_id: params.category,
			purchase_mode: 'auction combined',
		},
		...config,
	})
}
