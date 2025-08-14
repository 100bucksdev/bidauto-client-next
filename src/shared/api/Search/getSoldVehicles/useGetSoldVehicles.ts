import { QuerySettings } from '@/index'
import { IPagination } from '@/types/Pagination.interface'
import { ISoldLot } from '@/types/SoldVehicle.interface'
import { FetchesResponse } from '@astralis-team/primitive-fetch'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { getSoldVehicle, getSoldVehiclesParams } from './getSoldVehicles'

export function useGetBuyNowOffers(
	params: getSoldVehiclesParams,
	settings?: QuerySettings<typeof getSoldVehicle>
) {
	type PageResponse = FetchesResponse<{
		pagination: IPagination
		data: ISoldLot[]
	}>

	return useInfiniteQuery<
		PageResponse,
		Error,
		InfiniteData<PageResponse>,
		[string, typeof params],
		number
	>({
		queryKey: ['ByNowOffers', params],
		queryFn: ({ pageParam }) =>
			getSoldVehicle({ params: { page: pageParam, ...params } }),
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
