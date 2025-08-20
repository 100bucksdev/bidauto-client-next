import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import { verifyMail, verifyMailConfig } from './verifyMail'

export const useVerifyMail = (
	settings?: MutationSettings<verifyMailConfig, typeof verifyMail>
) => {
	return useMutation({
		mutationKey: ['verifyEmail'],
		mutationFn: ({ params, config }) =>
			verifyMail({ params, config: { ...config, ...settings?.config } }),
		...settings?.options,
	})
}
