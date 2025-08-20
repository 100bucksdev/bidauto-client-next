import { FetchesResponse } from '@astralis-team/primitive-fetch'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { getUserData } from '../getUserData/getUserData'
import { getUserBids, getUserBidsParams } from './getUserBids'

export const useGetUserBids = async (
	params: Omit<getUserBidsParams, 'page'>
) => {
	const { is_superuser, is_staff, id } = await getUserData({})

	type PageResponse = FetchesResponse<{}>

	return useInfiniteQuery<
		PageResponse,
		Error,
		InfiniteData<PageResponse>,
		[string],
		number
	>({
		queryKey: ['ByNowOffers'],
		queryFn: ({ pageParam }) =>
			getUserBids({ params: { page: pageParam, ...params } }),
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
