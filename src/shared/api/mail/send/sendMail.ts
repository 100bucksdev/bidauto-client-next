import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface sendMailParams {
	userUUID: string
}

export type sendMailConfig = FetchesRequestConfig<sendMailParams>

export const sendMail = ({ params, config }: sendMailConfig) => {
	return $Api.post(
		`/auth/v1/verification-code/${params.userUUID}/email/send-code`,
		{
			...config,
		}
	)
}
