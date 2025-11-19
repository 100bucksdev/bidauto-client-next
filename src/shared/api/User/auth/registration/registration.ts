import { $Api } from '@/config/api.config'
import { IUserInRegistration } from '@/types/User.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface registrationParams {
	first_name: string
	last_name: string
	phone_number: string
	email: string
	password: string
	// country: string
}

export type registrationConfig = FetchesRequestConfig<registrationParams>

export const registration = ({
	params,
	config,
}: registrationConfig): Promise<FetchesResponse<IUserInRegistration>> => {
	return $Api.post(
		'/auth/v1/register',
		{
			email: params.email,
			password: params.password,
			first_name: params.first_name,
			last_name: params.last_name,
			phone_number: params.phone_number,
			// country: params.country || 'LT',
		},
		{
			...config,
		}
	)
}
