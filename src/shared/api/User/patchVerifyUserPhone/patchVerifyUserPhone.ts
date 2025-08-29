import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface patchVerifyUserPhoneParams {
	id?: number | string
}

export type patchVerifyUserPhoneConfig =
	FetchesRequestConfig<patchVerifyUserPhoneParams>

export const patchVerifyUserPhone = ({
	params,
	config,
}: patchVerifyUserPhoneConfig) => {
	return $Api.patch(
		`/v1/admin/users/${params.id}/update/`,
		{
			is_phone_confirmed: true,
		},
		{
			...config,
		}
	)
}
