import { IUserLocationResponse } from '@/types/UserLocationResponse.interface'
import pfetch, { FetchesResponse } from '@astralis-team/primitive-fetch'
import { useQuery } from '@tanstack/react-query'

const getLocation = (): Promise<FetchesResponse<IUserLocationResponse>> => {
	return pfetch.get('https://ipinfo.io/json')
}

export function useUserLocation() {
	return useQuery({
		queryKey: ['getUserLocation'],
		queryFn: () => getLocation(),
	})
}
