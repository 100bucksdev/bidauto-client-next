import { QuerySettings } from '@/index'
import { useInfiniteQuery } from '@tanstack/react-query'
import { userSearch, userSearchParams } from './userSearch'

type UserSearchResponse = Awaited<ReturnType<typeof userSearch>>

export function useUserSearch(
	params: Omit<userSearchParams, 'page'>,
	settings?: QuerySettings<typeof userSearch>
) {
	return useInfiniteQuery<
		UserSearchResponse,
		Error,
		UserSearchResponse,
		[string, typeof params],
		number
	>({
		queryKey: ['user_search', params],
		queryFn: ({ pageParam }) =>
			userSearch({ params: { page: pageParam, ...params } }),
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
