import { $Api } from '@/config/api.config'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface reservationChekcoutParams {
	id: number
}

export type reservationChekcoutConfig =
	FetchesRequestConfig<reservationChekcoutParams>

export const reservationChekcout = ({
	params,
	config,
}: reservationChekcoutConfig): Promise<FetchesResponse<{ url: string }>> => {
	return $Api.post(
		`/shop/vehicle/${params.id}/make-reservation/`,
		{},
		{
			...config,
		}
	)
}
