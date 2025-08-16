import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import { auctionMakeBid, auctionMakeBidConfig } from './makeBid'

export const useAuctionMakeBid = (
	settings?: MutationSettings<auctionMakeBidConfig, typeof auctionMakeBid>
) => {
	return useMutation({
		mutationKey: ['auctionMakeBid'],
		mutationFn: ({ params, config }) =>
			auctionMakeBid({ params, config: { ...config, ...settings?.config } }),
		...settings?.options,
	})
}
