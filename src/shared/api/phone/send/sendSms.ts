import { $Api } from '@/config/api.config'
import {
	FetchesRequestConfig,
	FetchesResponse,
} from '@astralis-team/primitive-fetch'

export interface sendSmsParams {
	phone_number: string
	email: string | undefined
}

export type sendSmsConfig = FetchesRequestConfig<sendSmsParams>

export const sendSms = ({
	params,
	config,
}: sendSmsConfig): Promise<FetchesResponse<Record<'phone_number', string>>> => {
	return $Api.post(
		'/auth/send-sms/',
		{
			phone_number: params.phone_number,
			email: params.email,
		},
		{
			...config,
		}
	)
}
