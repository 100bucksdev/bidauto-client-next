import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface sendMailParams {
	email: string
}

export type sendMailConfig = FetchesRequestConfig<sendMailParams>

export const sendMail = ({ params, config }: sendMailConfig) => {
	return $Api.post(
		'/auth/send-email/',
		{
			email: params.email,
		},
		{
			...config,
		}
	)
}
