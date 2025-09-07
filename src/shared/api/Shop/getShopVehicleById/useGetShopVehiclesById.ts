import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import {
	getShopVehicleById,
	getShopVehicleByIdParams,
} from './getShopVehicleById'

export const useGetShopVehicleById = (
	params: getShopVehicleByIdParams,
	settings?: QuerySettings<any>
) => {
	return useQuery({
		queryKey: ['getShopVehicleById', params],
		queryFn: () => getShopVehicleById({ params, config: settings?.config }),
		...(settings?.options ?? {}),
	})
}
