import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import { registration, registrationConfig } from './registration'

export const useRegistration = (
	settings?: MutationSettings<registrationConfig, typeof registration>
) => {
	return useMutation({
		mutationKey: ['registerUser'],
		mutationFn: ({ params, config }) =>
			registration({ params, config: { ...config, ...settings?.config } }),
		...settings?.options,
	})
}
