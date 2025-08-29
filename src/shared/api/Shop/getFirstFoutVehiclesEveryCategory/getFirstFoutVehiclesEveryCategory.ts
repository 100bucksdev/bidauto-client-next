import { $Api } from '@/config/api.config'
import { IShopVehicle } from '@/types/Shop.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export type getFirstFoutVehiclesEveryCategoryConfig = FetchesRequestConfig

export const getFirstFoutVehiclesEveryCategory = ({
	config,
}: getFirstFoutVehiclesEveryCategoryConfig): Promise<
	FetchesResponse<
		{
			category: { name: string; id: number; slug: string }
			vehicles: IShopVehicle[]
		}[]
	>
> => {
	return $Api.get('/shop/vehicles-by-cat/?purchase_mode=reservation', {
		...config,
	})
}

//getFirstFoutVehiclesEveryCategory
