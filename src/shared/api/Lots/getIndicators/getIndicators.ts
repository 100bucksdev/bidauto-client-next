import { $Api } from '@/config/api.config'
import { ILotTitleIndicators } from '@/types/Lot.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getIndicatorsParams {
	auction: 'copart' | 'iaai'
	title_name: string
}

export type getIndicatorsConfig = FetchesRequestConfig<getIndicatorsParams>

export const getIndicators = ({
	params,
	config,
}: getIndicatorsConfig): Promise<FetchesResponse<ILotTitleIndicators>> => {
	if (!params.title_name) {
		return Promise.reject('Title name is required')
	}

	return $Api.get<ILotTitleIndicators>(
		`/auction-api/public/v1/lot/title-indicators`,
		{
			params: {
				auction: params.auction,
				title_name: params.title_name,
			},
			...config,
		}
	)
}
