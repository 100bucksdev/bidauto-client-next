import { $Api } from '@/config/api.config'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface sendSmsParams {
	userUUID: string
}

export type sendSmsConfig = FetchesRequestConfig<sendSmsParams>

export const sendSms = ({
	params,
	config,
}: sendSmsConfig): Promise<FetchesResponse<Record<'phone_number', string>>> => {
	return $Api.post(
		`/auth/v1/verification-code/${params.userUUID}/sms/send-code`,
		{
			...config,
		}
	)
}
