import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import {
	getSimilarArchivalOffers,
	getSimilarArchivalOffersParams,
} from './getSimilarArchivalOffers'

export const useGetSimilarArchivalOffers = (
	params: getSimilarArchivalOffersParams,
	settings?: QuerySettings<typeof getSimilarArchivalOffers>
) => {
	return useQuery({
		queryKey: ['getSimilarArchivalOffers', params],
		queryFn: () =>
			getSimilarArchivalOffers({ params, config: settings?.config }),
		...settings?.options,
	})
}
