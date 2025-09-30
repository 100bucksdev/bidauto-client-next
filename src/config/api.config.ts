'use client'
import pfetch from '@astralis-team/primitive-fetch'

export const $Api = pfetch.create({
	baseURL:
		`${process.env.NEXT_PUBLIC_API_URL_CLIENT}/api/v1` ||
		'http://localhost:8000/api/v1',
	headers: {
		'Content-Type': 'application/json',
	},
	credentials: 'include',
})

$Api.interceptors.request.use(config => {
	const accessToken = localStorage.getItem('access_token')
	if (accessToken && config?.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})
