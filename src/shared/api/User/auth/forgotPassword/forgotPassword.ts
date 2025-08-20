import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface forgotPasswordParams {
	email: string
	code: string
	new_password: string
}

export type forgotPasswordConfig = FetchesRequestConfig<forgotPasswordParams>

export const forgotPassword = ({ params, config }: forgotPasswordConfig) => {
	return $Api.post(
		'/auth/restore-pass-email/',
		{
			email: params.email,
			code: params.code,
			new_password: params.new_password,
		},
		{
			...config,
		}
	)
}
