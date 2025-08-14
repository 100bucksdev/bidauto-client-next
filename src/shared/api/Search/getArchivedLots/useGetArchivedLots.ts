import { QuerySettings } from '@/index'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getArchivedLots, getArchivedLotsParams } from './getArchivedLots'

type getArchivedLotsResponse = Awaited<ReturnType<typeof getArchivedLots>>

export function useGetArchivedLotsLots(
	queryKey: readonly [string, Omit<getArchivedLotsParams, 'page'>?],
	params?: Omit<getArchivedLotsParams, 'page'>,
	settings?: QuerySettings<typeof getArchivedLots>
) {
	return useInfiniteQuery<
		getArchivedLotsResponse,
		Error,
		getArchivedLotsResponse,
		readonly [string, Omit<getArchivedLotsParams, 'page'>?],
		number
	>({
		queryKey,
		queryFn: ({ pageParam }) =>
			getArchivedLots({ params: { page: pageParam, ...params } }),
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
