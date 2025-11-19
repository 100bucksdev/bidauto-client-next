import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import {
	sendResetCodeToEmail,
	sendResetCodeToEmailConfig,
} from './sendResetCodeToEmail'

export const useSendResetCodeToEmail = (
	settings?: MutationSettings<
		sendResetCodeToEmailConfig,
		typeof sendResetCodeToEmail
	>
) => {
	return useMutation({
		mutationKey: ['sendResetCodeToEmail'],
		mutationFn: ({ params, config }) =>
			sendResetCodeToEmail({
				params: params,
				config: { ...settings?.config, ...config },
			}),
		...settings?.options,
	})
}
