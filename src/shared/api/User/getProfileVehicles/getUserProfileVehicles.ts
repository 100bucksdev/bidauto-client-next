import { $Api } from '@/config/api.config'
import { IPagination } from '@/types/Pagination.interface'
import { IUser } from '@/types/User.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getUserProfileVehiclesParams {
	page: number
}

export type getUserProfileVehiclesConfig =
	FetchesRequestConfig<getUserProfileVehiclesParams>

export const getProfileVehicles = ({
	params,
	config,
}: getUserProfileVehiclesConfig): Promise<
	FetchesResponse<{ vehicles: IUser; pagination: IPagination }>
> => {
	return $Api.get('/shop/profile/', {
		params: { page: params.page },
		...config,
	})
}
