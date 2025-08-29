import { MutationSettings } from '@/index'
import { IUser } from '@/types/User.interface'
import { FetchesResponse } from '@astralis-team/primitive-fetch'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getUserData } from '../getUserData/getUserData'
import { getUserBids, getUserBidsParams } from './getUserBids'

type BidsPageResponse = FetchesResponse<{
	pagination: { page: number; pages: number; size: number; count: number }
	user: IUser
}>

export const useGetUserBids = (
	params: Omit<getUserBidsParams, 'page'>,
	settings?: MutationSettings<typeof getUserBids>
) => {
	const { data: userDataResponse } = useQuery({
		queryKey: ['userData'],
		queryFn: () => getUserData({}),
	})

	const { is_superuser, is_staff, id } = userDataResponse?.data ?? {}

	return useInfiniteQuery<
		BidsPageResponse,
		Error,
		BidsPageResponse,
		(string | number | undefined)[],
		number
	>({
		queryKey: [
			'bids',
			params.sort,
			params.user_status,
			(is_superuser || is_staff) && id !== params.user_id
				? params.user_id
				: undefined,
		],
		queryFn: async ({ pageParam = 1 }) =>
			await getUserBids({
				params: { page: pageParam, ...params },
			}),
		initialPageParam: 1,
		getNextPageParam: lastPage => {
			const { page, pages } = lastPage.data.pagination
			return page >= pages ? null : page + 1
		},
		retry: 0,
		...settings?.options,
	})
}
