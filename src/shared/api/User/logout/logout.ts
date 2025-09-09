import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export type LogoutConfig = FetchesRequestConfig

export const logout = (config: LogoutConfig) => {
	return $Api.post('/auth/token/blacklist/', {}, config)
}
