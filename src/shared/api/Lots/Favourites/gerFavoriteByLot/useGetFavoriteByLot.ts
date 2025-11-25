import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import { getFavoriteByLot, getFavoriteByLotParams } from './getFavoriteByLot'

export const useGetFavoriteByLot = (
	params: getFavoriteByLotParams,
	settings?: QuerySettings<typeof getFavoriteByLot>
) => {
	return useQuery({
		queryKey: ['getFavoriteByLot', params],
		queryFn: () =>
			getFavoriteByLot({ params: params, config: settings?.config }),
		...settings?.options,
	})
}
