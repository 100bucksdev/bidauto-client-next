import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface auctionMakeBidParams {
	id: number
	amount: number
}

export type auctionMakeBidConfig = FetchesRequestConfig<auctionMakeBidParams>

export const auctionMakeBid = ({ params, config }: auctionMakeBidConfig) => {
	const formData = new FormData()

	formData.append('amount', params.amount.toString())

	return $Api.post(`/auction/${params.id}/bids/`, formData, {
		...config,
	})
}
