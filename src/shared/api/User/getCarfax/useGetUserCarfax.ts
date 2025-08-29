import { MutationSettings } from '@/index'
import { IUser } from '@/types/User.interface'
import { FetchesResponse } from '@astralis-team/primitive-fetch'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getUserData } from '../getUserData/getUserData'
import { getUserCarfax, getUserCarfaxParams } from './getUserCarfax'

type CarfaxPageResponse = FetchesResponse<{
	pagination: { page: number; pages: number; size: number; count: number }
	user: IUser
}>

export const useGetUserCarfax = (
	params: Omit<getUserCarfaxParams, 'page'>,
	settings?: MutationSettings<typeof getUserCarfax>
) => {
	const { data: userDataResponse } = useQuery({
		queryKey: ['userData'],
		queryFn: () => getUserData({}),
	})

	const { is_superuser, is_staff, id } = userDataResponse?.data ?? {}

	return useInfiniteQuery<
		CarfaxPageResponse,
		Error,
		CarfaxPageResponse,
		(string | number | undefined)[],
		number
	>({
		queryKey: [
			'carfax',
			params.sort,
			(is_superuser || is_staff) && id !== params.user_id
				? params.user_id
				: undefined,
		],
		queryFn: async ({ pageParam }) =>
			await getUserCarfax({
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
