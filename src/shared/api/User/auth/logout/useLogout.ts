import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import { logout, LogoutConfig } from './logout'

export const useLogout = (
	settings?: MutationSettings<LogoutConfig, typeof logout>
) => {
	return useMutation({
		mutationKey: ['logout'],
		mutationFn: ({ params, config }) =>
			logout({ params, config: { ...config, ...settings?.config } }),
		...settings?.options,
		onSuccess: () => {
			localStorage.removeItem('access_token')
		},
	})
}
