import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import { verifyPhone, verifyPhoneConfig } from './verifyPhone'

export const useVerifyPhone = (
	settings?: MutationSettings<verifyPhoneConfig, typeof verifyPhone>
) => {
	return useMutation({
		mutationKey: ['verifyPhone'],
		mutationFn: ({ params, config }) =>
			verifyPhone({
				params,
				config: { ...config, ...settings?.config },
			}),
		...settings?.options,
	})
}
