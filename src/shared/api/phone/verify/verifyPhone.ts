import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface verifyPhoneParams {
	phone_number: string
	code: string
	email: string
}

export type verifyPhoneConfig = FetchesRequestConfig<verifyPhoneParams>

export const verifyPhone = ({ params, config }: verifyPhoneConfig) => {
	return $Api.post(
		'/auth/verifyphone/',
		{
			phone_number: params.phone_number,
			code: params.code,
			email: params.email,
		},
		{
			...config,
		}
	)
}
