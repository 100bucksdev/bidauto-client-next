import { $Api } from '@/config/api.config'
import { IShopVehicle } from '@/types/Shop.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getShopVehicleByIdParams {
	id: number
}

export type getShopVehicleByIdConfig =
	FetchesRequestConfig<getShopVehicleByIdParams>

export const getShopVehicleById = ({
	params,
	config,
}: getShopVehicleByIdConfig): Promise<FetchesResponse<IShopVehicle>> => {
	return $Api.get(
		`/shop/vehicle/${params.id}/`,
		{},
		{
			...config,
		}
	)
}
