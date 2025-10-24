import { $Api } from '@/config/api.config'
import { IAppState } from '@/types/AppState.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export type getStateConfig = FetchesRequestConfig

export const getAppState = (
	config?: getStateConfig
): Promise<FetchesResponse<IAppState>> => {
	return $Api.get('/site-settings/', {
		...config,
	})
}
