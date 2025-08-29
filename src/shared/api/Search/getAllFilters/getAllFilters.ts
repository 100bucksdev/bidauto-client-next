import { $Api } from '@/config/api.config'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getAllFiltersParams {
	auction: 'IAAI' | 'COPART'
}

export type getAllFiltersConfig = FetchesRequestConfig<getAllFiltersParams>

export const getAllFilters = ({
	params,
	config,
}: getAllFiltersConfig): Promise<
	FetchesResponse<{
		fuels: Record<'slug' | 'name', string>[]
		lot_conditions: Record<'slug' | 'name', string>[]
		vehicles_types: Record<'slug' | 'name', string>[]
	}>
> => {
	return $Api.get('/auction-vehicles/get-basic-filters/', {
		params: {
			auction: params.auction,
		},
		...config,
	})
}
