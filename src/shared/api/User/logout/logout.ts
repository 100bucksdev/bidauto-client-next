import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export type LogoutConfig = FetchesRequestConfig

export const logout = (config: LogoutConfig) => {
	const token = localStorage.getItem('refresh_token')

	return $Api.post(
		'/auth/token/blacklist/',
		{
			refresh: token,
		},
		config
	)
}
