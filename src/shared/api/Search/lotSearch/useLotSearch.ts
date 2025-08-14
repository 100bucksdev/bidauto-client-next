import { QuerySettings } from '@/index'
import { useInfiniteQuery } from '@tanstack/react-query'
import { lotSearch, lotSearchParams } from './lotSearch'

type LotSearchResponse = Awaited<ReturnType<typeof lotSearch>>

export function useSearchLots(
	queryKey: readonly [string, Omit<lotSearchParams, 'page'>?],
	params?: Omit<lotSearchParams, 'page'>,
	settings?: QuerySettings<typeof lotSearch>
) {
	return useInfiniteQuery<
		LotSearchResponse,
		Error,
		LotSearchResponse,
		readonly [string, Omit<lotSearchParams, 'page'>?],
		number
	>({
		queryKey,
		queryFn: ({ pageParam }) =>
			lotSearch({ params: { page: pageParam, ...params } }),
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
