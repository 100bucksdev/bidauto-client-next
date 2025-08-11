import { MutationSettings } from '@/index'
import { useMutation } from '@tanstack/react-query'
import {
	deleteLotToFavourites,
	deleteLotToFavouritesConfig,
} from './deleteLotFromFavourites'

export const useDeleteLotFromFavourites = (
	settings?: MutationSettings<
		deleteLotToFavouritesConfig,
		typeof deleteLotToFavourites
	>
) => {
	return useMutation({
		mutationKey: ['deleteLotFromMutation'],
		mutationFn: ({ params, config }) =>
			deleteLotToFavourites({
				params,
				config: { ...config, ...settings?.config },
			}),
		...settings?.options,
	})
}
