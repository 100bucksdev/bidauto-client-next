import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import { getUserData } from './getUserData'

export const useGetUserData = (
	settings?: QuerySettings<typeof getUserData>
) => {
	return useQuery({
		queryKey: ['getUserData'],
		queryFn: () => getUserData({ config: settings?.config }),
		...settings?.options,
		select: data => data.data,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		retry: 1,
	})
}
