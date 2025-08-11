import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import {
	setLotToFavourites,
	setLotToFavouritesConfig,
} from './setLotToFavourites'

export const useSetLotToFavourites = (
	settings?: MutationSettings<
		setLotToFavouritesConfig,
		typeof setLotToFavourites
	>
) => {
	return useMutation({
		mutationKey: ['setLotToUserFavourites'],
		mutationFn: ({ params, config }) =>
			setLotToFavourites({
				params,
				config: { ...config, ...settings?.config },
			}),
		...settings?.options,
	})
}
