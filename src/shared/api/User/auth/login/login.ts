import { $Api } from '@/config/api.config'
import { ITokens } from '@/types/Tokens.interface'
import { IUser } from '@/types/User.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface loginParams {
	email: string
	password: string
}

export type loginConfig = FetchesRequestConfig<loginParams>

export const login = ({
	params,
	config,
}: loginConfig): Promise<FetchesResponse<ITokens & Record<'user', IUser>>> => {
	return $Api.post(
		'/auth/token/',
		{
			email: params.email,
			password: params.password,
		},
		{
			...config,
		}
	)
}
