import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import { sendMail, sendMailConfig } from './sendMail'

export const useSendEmail = (
	settings?: MutationSettings<sendMailConfig, typeof sendMail>
) => {
	return useMutation({
		mutationKey: ['sendEmail'],
		mutationFn: ({ params, config }) =>
			sendMail({ params, config: { ...config, ...settings?.config } }),
		...settings?.options,
	})
}
