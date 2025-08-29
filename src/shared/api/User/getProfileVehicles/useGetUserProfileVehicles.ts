import { MutationSettings } from '@/index'
import { IUser } from '@/types/User.interface'
import { FetchesResponse } from '@astralis-team/primitive-fetch'
import { useInfiniteQuery } from '@tanstack/react-query'
import {
	getProfileVehicles,
	getUserProfileVehiclesParams,
} from './getUserProfileVehicles'

type ProfileVehiclesPageResponse = FetchesResponse<{
	pagination: { page: number; pages: number; size: number; count: number }
	vehicles: IUser
}>

export const useGetUserProfileVehicles = (
	params: Omit<getUserProfileVehiclesParams, 'page'>,
	settings?: MutationSettings<typeof getProfileVehicles>
) => {
	return useInfiniteQuery<
		ProfileVehiclesPageResponse,
		Error,
		ProfileVehiclesPageResponse,
		(string | number | undefined)[],
		number
	>({
		queryKey: ['profile-shop-vehicles'],
		queryFn: async ({ pageParam = 1 }) =>
			await getProfileVehicles({
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
