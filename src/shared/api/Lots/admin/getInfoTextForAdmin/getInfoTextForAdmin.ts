import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface getInfoTextForAdminParams {
	auction: 'COPART' | 'IAAI'
	lot_id: string
}

export type getInfoTextForAdminConfig =
	FetchesRequestConfig<getInfoTextForAdminParams>

export const getInfoTextForAdmin = ({
	config,
	params,
}: getInfoTextForAdminConfig) => {
	return $Api.get<{ text: string }>(
		`/admin/posting/get-post-info/text/?lot_id=${params.lot_id}&auction=${params.auction}`,
		{
			...config,
		}
	)
}
