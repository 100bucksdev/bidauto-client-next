import { $Api } from '@/config/api.config'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getModelsByMakeParams {
	make: string
	vehicle_type: string
}

export type getModelsByMakeConfig = FetchesRequestConfig<getModelsByMakeParams>

export const getModelsByMake = async ({
	config,
	params,
}: getModelsByMakeConfig): Promise<
	FetchesResponse<Record<'name' | 'slug', string>[]>
> => {
	return $Api.get('/auction-vehicles/get-models-by-make-vehicle-type/', {
		params: {
			make: params.make,
			vehicle_type: params.vehicle_type,
		},
		...config,
	})
}
