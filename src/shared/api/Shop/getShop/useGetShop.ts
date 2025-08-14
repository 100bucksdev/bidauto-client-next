import { QuerySettings } from '@/index'
import { IPagination } from '@/types/Pagination.interface'
import {
	IShopVehicle,
	TShopVehicleResponseStatuses,
} from '@/types/Shop.interface'
import { FetchesResponse } from '@astralis-team/primitive-fetch'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { getShop, getShopParams } from './getShop'

export function useGetShop(
	params?: Omit<getShopParams, 'page'>,
	settings?: QuerySettings<typeof getShop>
) {
	type PageResponse = FetchesResponse<{
		pagination: IPagination
		vehicles: IShopVehicle[]
		vehicles_statuses: TShopVehicleResponseStatuses
		category: null | { id: number; name: string; slug: string }
	}>

	return useInfiniteQuery<
		PageResponse,
		Error,
		InfiniteData<PageResponse>,
		[string],
		number
	>({
		queryKey: ['ByNowOffers'],
		queryFn: ({ pageParam }) =>
			getShop({ params: { page: pageParam, ...params } }),
		initialPageParam: 1,
		getNextPageParam: lastPage => {
			if ('pagination' in lastPage.data) {
				const { page, pages } = lastPage.data.pagination
				if (!pages) return null
				return page >= pages ? null : page + 1
			}
			return null
		},
		retry: 0,
		...settings?.options,
	})
}
