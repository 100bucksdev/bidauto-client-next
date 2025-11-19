import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface verifyPhoneParams {
	userUUID: string
	code: string
}

export type verifyPhoneConfig = FetchesRequestConfig<verifyPhoneParams>

export const verifyPhone = ({ params, config }: verifyPhoneConfig) => {
	return $Api.post(
		`/auth/v1/verification-code/${params.userUUID}/sms/verify`,
		{
			code: params.code,
		},
		{
			...config,
		}
	)
}
