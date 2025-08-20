import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import { login, loginConfig } from './login'

export const useLogin = (
	settings?: MutationSettings<loginConfig, typeof login>
) => {
	return useMutation({
		mutationKey: ['userLogin'],
		mutationFn: ({ params, config }) =>
			login({ params, config: { ...config, ...settings?.config } }),
		...settings?.options,
		onSuccess: data => {
			localStorage.setItem('access_token', data.data.access)
		},
	})
}
