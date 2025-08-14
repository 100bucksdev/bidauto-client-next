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

export interface getShopParams {
	search?: string
	category?: string | string[]
	page: number
}

export type getShopConfig = FetchesRequestConfig<getShopParams>

export const getShop = ({
	params,
	config,
}: getShopConfig): Promise<
	FetchesResponse<{
		pagination: IPagination
		vehicles: IShopVehicle[]
		vehicles_statuses: TShopVehicleResponseStatuses
		category: null | { id: number; name: string; slug: string }
	}>
> => {
	return $Api.get(
		'/shop/?purchase_mode=reservation',
		{},
		{
			params: {
				search: params.search,
				page: params.page,
				category_id: params.category,
				purchase_mode: 'reservation',
			},
		}
	)
}
