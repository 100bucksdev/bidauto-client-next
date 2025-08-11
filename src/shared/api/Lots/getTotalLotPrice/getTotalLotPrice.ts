import { $Api } from '@/config/api.config'
import {
	ILotCalculator,
	ILotEuCalculator,
} from '@/types/LotCalculator.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getTotalLotPriceParams {
	price: number
	lot_id: string
	auction_name: 'COPART' | 'IAAI'
	fee_type?: string
}

export type getTotalLotPriceConfig =
	FetchesRequestConfig<getTotalLotPriceParams>

export const getTotalLotPrice = async ({
	config,
	params,
}: getTotalLotPriceConfig): Promise<
	FetchesResponse<{
		calculator: ILotCalculator
		eu_calculator: ILotEuCalculator
		eur_rate: number
	}>
> => {
	return $Api.get('/calculator/', {
		price: params.price,
		lot_id: params.lot_id,
		auction: params.auction_name,
		fee_type: params.fee_type,
	})
}
