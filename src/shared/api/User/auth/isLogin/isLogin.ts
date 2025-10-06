import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export type isLoginConfig = FetchesRequestConfig

export const isLogin = (config?: isLoginConfig) => {
	return $Api.get('/auth/is-logged-in/', {
		...config,
	})
}
