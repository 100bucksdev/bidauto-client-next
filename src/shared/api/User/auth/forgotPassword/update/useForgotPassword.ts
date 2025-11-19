import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword, forgotPasswordConfig } from './forgotPassword'

export const useForgotPassword = (
	settings?: MutationSettings<forgotPasswordConfig, typeof forgotPassword>
) => {
	return useMutation({
		mutationKey: ['forgotPassByEmail'],
		mutationFn: ({ params, config }) =>
			forgotPassword({ params, config: { ...config, ...settings?.config } }),
		...settings?.options,
	})
}
