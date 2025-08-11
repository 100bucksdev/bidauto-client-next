import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface postBidParams {
	lot_id: string
	auction: 'COPART' | 'IAAI'
	bid_amount: number
}

export type postBidConfig = FetchesRequestConfig<postBidParams>

export const postBid = async ({ config, params }: postBidConfig) => {
	return $Api.post(
		'/bid/',
		{
			lot_id: params.lot_id,
			auction: params.auction,
			bid_amount: params.bid_amount,
		},
		{
			...config,
		}
	)
}
