import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import {
	getInfoTextForAdmin,
	getInfoTextForAdminParams,
} from './getInfoTextForAdmin'

export const useGetInfoTextForAdmin = ({
	settings,
	params,
}: {
	settings?: QuerySettings<typeof getInfoTextForAdmin>
	params: getInfoTextForAdminParams
}) => {
	return useQuery({
		queryKey: ['GetLotInfoTextForAdmin', params.lot_id],
		queryFn: () => getInfoTextForAdmin({ params, config: settings?.config }),
		...settings?.options,
		enabled: !!params.lot_id && !!params.auction,
		select: data => data.data,
	})
}
