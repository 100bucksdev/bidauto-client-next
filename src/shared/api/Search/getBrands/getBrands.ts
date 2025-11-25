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
	return $Api.get(
		`/auction-api/public/v1/filters/${params.vehicleType}/makes`,
		{
			params: {
				vehicle_type_slug: params.vehicleType,
			},
			...config,
		}
	)
}
