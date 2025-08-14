import { $Api } from '@/config/api.config'
import { IPagination } from '@/types/Pagination.interface'
import { ISoldLot, ISoldSearchParams } from '@/types/SoldVehicle.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface getSoldVehiclesParams
	extends Partial<ISoldSearchParams & { page: number; q?: string }> {}

export type getSoldVehiclesConfig = FetchesRequestConfig<getSoldVehiclesParams>

export const getSoldVehicle = ({
	params,
	config,
}: getSoldVehiclesConfig): Promise<
	FetchesResponse<{ pagination: IPagination; lots: ISoldLot[] }>
> => {
	return $Api.get(
		'/auction-vehicles/sold-vehicles-db/',
		{},
		{
			params: {
				vehicle_type: params?.vehicle_type,
				make: params?.make === 'All_Makes' ? '' : params?.make,
				model: params?.model === 'All_Models' ? '' : params?.model,
				site: params?.site,
				year_from: params?.year_from,
				year_to: params?.year_to,
				created_at_from: params?.created_at_from,
				created_at_to: params?.created_at_to,
				auction_date_from: params?.auction_date_from,
				auction_date_to: params?.auction_date_to,
				sale_status: params?.sale_status === '-' ? '' : params?.sale_status,
				buyer_country: params?.buyer_country,
				seller_type: params?.seller_type === '-' ? '' : params?.seller_type,
				page: params.page,
				size: params?.size,
				odometer_min: params?.odometer_min,
				odometer_max: params?.odometer_max,
				is_buy_now: params?.is_buy_now,
				q: params.q || '',
			},
			...config,
		}
	)
}
