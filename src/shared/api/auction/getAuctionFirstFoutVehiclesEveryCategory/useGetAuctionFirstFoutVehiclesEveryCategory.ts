import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import { getAuctionFirstFoutVehiclesEveryCategory } from './getAuctionFirstFoutVehiclesEveryCategory'

export const useGetAuctionFirstFoutVehiclesEveryCategory = (
	settings?: QuerySettings<typeof getAuctionFirstFoutVehiclesEveryCategory>
) => {
	return useQuery({
		queryKey: ['getAuctionFirstFoutVehiclesEveryCategory'],
		queryFn: () =>
			getAuctionFirstFoutVehiclesEveryCategory({ ...settings?.config }),
		...settings?.options,
	})
}
