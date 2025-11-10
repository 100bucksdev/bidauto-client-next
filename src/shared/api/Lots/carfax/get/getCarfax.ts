import { $Api } from '@/config/api.config'
import { ICarfax } from '@/types/Carfax.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getCarfaxParams {
	auction: 'COPART' | 'IAAI'
	id: string
}

export type getCarfaxConfig = FetchesRequestConfig<getCarfaxParams>

export const getCarfax = ({
	params,
	config,
}: getCarfaxConfig): Promise<FetchesResponse<ICarfax>> => {
	return $Api.get(`/carfax/${params.auction.toLowerCase()}/${params.id}/`, {
		...config,
	})
}
