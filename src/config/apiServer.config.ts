import pfetch from '@astralis-team/primitive-fetch'
import { cookies } from 'next/headers'

export const $ApiServer = pfetch.create({
	baseURL:
		process.env.API_URL_SERVER || 'http://host.docker.internal:8000/api/v1',
	headers: {
		'Content-Type': 'application/json',
	},
	credentials: 'include',
})

$ApiServer.interceptors.request.use(async config => {
	const cookieStore = await cookies()
	const accessToken = cookieStore.get('access_token')?.value
	if (accessToken && config?.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})
