import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import { postBid, postBidConfig } from './postBid'

export const usePlaceBid = (
	settings?: MutationSettings<postBidConfig, typeof postBid>
) => {
	return useMutation({
		mutationKey: ['PlaceBid', settings],
		mutationFn: ({ params, config }) =>
			postBid({ params, config: { ...settings?.config, ...config } }),
		...settings?.options,
	})
}
