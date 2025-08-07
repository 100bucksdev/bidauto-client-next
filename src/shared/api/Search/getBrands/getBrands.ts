import { $Api } from '@/config/api.config'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getBrandsParams {
	vehicleType: string
}

export type getBrandsConfig = FetchesRequestConfig<getBrandsParams>

export const getBrands = async ({
	config,
	params,
}: getBrandsConfig): Promise<
	FetchesResponse<Record<'name' | 'slug', string>[]>
> => {
	return $Api.get('/auction-vehicles/get-makes-by-vehicle-type/', {
		params: {
			vehicle_type: params.vehicleType,
		},
		...config,
	})
}
