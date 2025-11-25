import { $Api } from '@/config/api.config'
import { ICalculator } from '@/types/CalculatorLocation.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getTotalLotPriceParams {
	price: number
	auction_name: 'COPART' | 'IAAI'
	fee_type?: string
	vehicle_type: string
	destination: string
	location: string
}

export type getTotalLotPriceConfig =
	FetchesRequestConfig<getTotalLotPriceParams>

export const getTotalLotPrice = async ({
	config,
	params,
}: getTotalLotPriceConfig): Promise<FetchesResponse<ICalculator>> => {
	return $Api.post(
		'/calculator/v1/public/calculator',
		{
			price: params.price,
			auction: params.auction_name,
			fee_type: params.fee_type,
			vehicle_type: params.vehicle_type,
			destination: params.destination,
			location: params.location,
		},
		{
			...config,
		}
	)
}
