import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface verifyMailParams {
	userUUID: string
	code: string
}

export type verifyMailConfig = FetchesRequestConfig<verifyMailParams>

export const verifyMail = ({ params, config }: verifyMailConfig) => {
	return $Api.post(
		`/auth/v1/verification-code/${params.userUUID}/email/verify`,
		{
			code: params.code,
		},
		{
			...config,
		}
	)
}
