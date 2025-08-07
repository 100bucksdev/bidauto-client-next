import { $Api } from '@/config/api.config'
import { IUser } from '@/shared/types/User.interface'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export type getUserDataConfig = FetchesRequestConfig

export const getUserData = async (config: getUserDataConfig) => {
	const response = await $Api.get<IUser>('/auth/user-info', {
		...config,
	})

	return response
}
