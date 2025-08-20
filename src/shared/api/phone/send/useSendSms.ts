import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import { sendSms, sendSmsConfig } from './sendSms'

export const useSendSms = (
	settings?: MutationSettings<sendSmsConfig, typeof sendSms>
) => {
	return useMutation({
		mutationKey: ['sendSms'],
		mutationFn: ({ params, config }) =>
			sendSms({ params, config: { ...config, ...settings?.config } }),
		...settings?.options,
	})
}
