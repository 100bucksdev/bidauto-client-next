import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import { getAppState } from './getState'

export const useGetAppState = (
	Settings?: QuerySettings<typeof getAppState>
) => {
	return useQuery({
		queryKey: ['app-state'],
		queryFn: () => getAppState(Settings?.config),
		...Settings?.options,
	})
}
