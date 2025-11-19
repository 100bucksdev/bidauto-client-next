'use client'

import pfetch from '@astralis-team/primitive-fetch'

export const $Api = pfetch.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL_CLIENT ?? 'http://localhost/',
	// 'https://api.bidauto.online/',
	credentials: 'include',
})

$Api.interceptors.request.use(config => {
	;(config as any)._originalRequest = new Request(config.url, config)
	const token = localStorage.getItem('access_token')
	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

$Api.interceptors.response.use(
	res => res,
	async error => {
		if (error.response?.status === 401) {
			try {
				const refresh = localStorage.getItem('refresh_token')
				if (!refresh) throw new Error('No refresh token')

				const refreshRes = await fetch(
					`${
						process.env.NEXT_PUBLIC_API_URL_CLIENT ??
						// 'http://localhost:8000/api/v1'
						'https://api.bidauto.online/'
					}/auth/v1/refresh`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ refresh }),
					}
				)

				if (!refreshRes.ok) throw new Error('Failed to refresh')
				const data = await refreshRes.json()
				localStorage.setItem('access_token', data.access)
				localStorage.setItem('refresh_token', data.refresh)

				// повторяем оригинальный запрос с новым токеном
				const req = (error.request as any)?._originalRequest
				if (req) {
					const newReq = new Request(req, {
						headers: {
							...Object.fromEntries(req.headers),
							Authorization: `Bearer ${data.access}`,
						},
					})
					return fetch(newReq)
				}
			} catch (refreshErr) {
				localStorage.removeItem('access_token')
				localStorage.removeItem('refresh_token')
				window.location.href = '/login'
			}
		}

		throw error
	}
)
