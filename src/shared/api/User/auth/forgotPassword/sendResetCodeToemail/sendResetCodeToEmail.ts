import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface sendResetCodeToEmailParams {
	email: string
}

export type sendResetCodeToEmailConfig =
	FetchesRequestConfig<sendResetCodeToEmailParams>

export const sendResetCodeToEmail = ({
	params,
	config,
}: sendResetCodeToEmailConfig) => {
	return $Api.post(
		'/auth/v1/verification-code/email/send-reset-pass-code',
		{
			email: params.email,
		},
		{
			...config,
		}
	)
}
