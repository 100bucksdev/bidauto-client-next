import { QuerySettings } from '@/index'
import { IOffers } from '@/types/Offers.interface'
import { IPagination } from '@/types/Pagination.interface'
import { FetchesResponse } from '@astralis-team/primitive-fetch'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { getBuyNowOffers } from './getBuyNowOffers'

export function useGetBuyNowOffers(
	settings?: QuerySettings<typeof getBuyNowOffers>
) {
	type PageResponse = FetchesResponse<{
		pagination: IPagination
		data: IOffers[]
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
			getBuyNowOffers({ params: { page: pageParam } }),
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
