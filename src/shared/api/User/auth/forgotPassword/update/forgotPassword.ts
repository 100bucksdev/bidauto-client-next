import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface forgotPasswordParams {
	email: string
	code: string
	new_password1: string
	new_password2: string
}

export type forgotPasswordConfig = FetchesRequestConfig<forgotPasswordParams>

export const forgotPassword = ({ params, config }: forgotPasswordConfig) => {
	return $Api.post(
		'/auth/v1/password-reset',
		{
			email: params.email,
			code: params.code,
			new_password1: params.new_password1,
			new_password2: params.new_password2,
		},
		{
			...config,
		}
	)
}
