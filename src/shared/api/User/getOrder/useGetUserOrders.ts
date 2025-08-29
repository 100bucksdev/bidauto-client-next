import { MutationSettings } from '@/index'
import { IUser } from '@/types/User.interface'
import { FetchesResponse } from '@astralis-team/primitive-fetch'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getUserData } from '../getUserData/getUserData'
import { getUserOrders, getUserOrdersParams } from './getUserOrders'

export const useGetUserOrders = (
	params: Omit<getUserOrdersParams, 'page'>,
	settings?: MutationSettings<typeof getUserOrders>
) => {
	const { data: userDataResponse } = useQuery({
		queryKey: ['userData'],
		queryFn: () => getUserData({}),
	})

	const { is_superuser, is_staff, id } = userDataResponse?.data ?? {}

	type PageResponse = FetchesResponse<{
		pagination: { page: number; pages: number; size: number; count: number }
		user: IUser
	}>

	return useInfiniteQuery<
		PageResponse,
		Error,
		PageResponse,
		Array<string | number | undefined>,
		number
	>({
		queryKey: [
			'user_orders',
			(is_superuser || is_staff) && id !== params.user_id
				? params.user_id
				: undefined,
		],
		queryFn: ({ pageParam = 1 }) =>
			getUserOrders({
				params: { page: pageParam, ...params },
			}) as Promise<PageResponse>,
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
