import { $Api } from '@/config/api.config'
import { ITokens } from '@/types/Tokens.interface'
import { IUser } from '@/types/User.interface'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface verifyMailParams {
	email: string
	code: string
}

export type verifyMailConfig = FetchesRequestConfig<verifyMailParams>

export const verifyMail = ({
	params,
	config,
}: verifyMailConfig): Promise<
	FetchesResponse<ITokens & Record<'user', IUser>>
> => {
	return $Api.post(
		'/auth/verifyemail/',
		{
			email: params.email,
			code: params.code,
		},
		{
			...config,
		}
	)
}
