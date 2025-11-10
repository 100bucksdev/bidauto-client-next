import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import { getCarfax, getCarfaxParams } from './getCarfax'

export const useGetCarfax = (
	params: getCarfaxParams,
	settings?: QuerySettings<typeof getCarfax>
) => {
	return useQuery({
		queryKey: ['getCarfax', params],
		queryFn: () => getCarfax({ params, config: settings?.config }),
		...settings?.options,
	})
}
