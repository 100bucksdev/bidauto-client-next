import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import { getFirstFoutVehiclesEveryCategory } from './getFirstFoutVehiclesEveryCategory'

export const useGetFirstFoutVehiclesEveryCategory = (
	settings?: QuerySettings<typeof getFirstFoutVehiclesEveryCategory>
) => {
	return useQuery({
		queryKey: ['getFirstFoutVehiclesEveryCategory'],
		queryFn: () => getFirstFoutVehiclesEveryCategory({ ...settings?.config }),
		...settings?.options,
	})
}
