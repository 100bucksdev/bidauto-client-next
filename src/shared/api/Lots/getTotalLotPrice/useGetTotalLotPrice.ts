import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import { getTotalLotPrice, getTotalLotPriceParams } from './getTotalLotPrice'

export const useGetTotalLotPrice = (params: getTotalLotPriceParams, settings?: QuerySettings<typeof getTotalLotPrice>) => {
	return useQuery({
		queryKey: ['getTotalLotPrice', params],
		queryFn: () => getTotalLotPrice({params, config: settings?.config}),
		select: data => data.data
		...settings?.options
	})
}