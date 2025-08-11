import { $Api } from '@/config/api.config'
import { ILotInfo } from '@/types/Lot.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getIndicatorsParams {
	auction: 'COPART' | 'IAAI'
	id: number
}

export type getIndicatorsConfig = FetchesRequestConfig<getIndicatorsParams>

export const getIndicators = ({
	params,
	config,
}: getIndicatorsConfig): Promise<FetchesResponse<ILotInfo>> => {
	if (!params.id) {
		return Promise.reject('ID is required')
	}

	return $Api.get<ILotInfo>(
		`/auction-vehicles/indicators/${params.auction}/${params.id}/`
	)
}
