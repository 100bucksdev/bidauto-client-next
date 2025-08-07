import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import { getLot, getLotParams } from './getLot'

export function useGetLot({
	settings,
	params,
}: {
	settings?: QuerySettings<typeof getLot>
	params: getLotParams
}) {
	return useQuery({
		queryKey: ['getLot', params],
		queryFn: () => getLot({ params, config: settings?.config }),
		enabled: !!params.vinOrId && !!params.auction,
		...settings?.options,
	})
}
