import { $Api } from '@/config/api.config'
import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

export interface getInfoImageForAdminParams {
	auction: 'COPART' | 'IAAI'
	lot_id: string
}

export type getInfoImageForAdminConfig =
	FetchesRequestConfig<getInfoImageForAdminParams>

export const getInfoImageForAdmin = async ({
	config,
	params,
}: getInfoImageForAdminConfig) => {
	const response = await $Api.get(
		`/v1/admin/posting/get-post-info/images/?lot_id=${params.lot_id}&auction=${params.auction}`,
		{
			...config,
		}
	)

	const blob = new Blob([response.data as ArrayBuffer], {
		type: response.headers.get('content-type') || 'application/zip',
	})
	const url = window.URL.createObjectURL(blob)

	const a = document.createElement('a')
	a.href = url
	a.download = 'vehicle_images.zip'
	document.body.appendChild(a)
	a.click()

	window.URL.revokeObjectURL(url)
	document.body.removeChild(a)
}
