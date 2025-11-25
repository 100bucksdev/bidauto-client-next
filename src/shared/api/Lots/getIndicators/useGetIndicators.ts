import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import { getIndicators, getIndicatorsParams } from './getIndicators'

export const useGetIndicators = (
	params: getIndicatorsParams,
	settings?: QuerySettings<typeof getIndicators>
) => {
	return useQuery({
		queryKey: ['get-indicators', params],
		queryFn: () => getIndicators({ params, config: settings?.config }),
		...settings?.options,
	})
}
