import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import {
	reservationChekcout,
	reservationChekcoutConfig,
} from './reservationChekcout'

export const useReservationChekcout = (
	settings?: MutationSettings<
		reservationChekcoutConfig,
		typeof reservationChekcout
	>
) => {
	return useMutation({
		mutationKey: ['MakeReservationChekout'],
		mutationFn: ({ params, config }) =>
			reservationChekcout({
				params,
				config: { ...config, ...settings?.config },
			}),
		...settings?.options,
	})
}
