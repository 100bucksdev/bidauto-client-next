import pfetch from '@astralis-team/primitive-fetch'

const isServer = typeof window === 'undefined'

export const $Api = pfetch.create({
	baseURL: isServer
		? process.env.API_URL_SERVER || 'http://host.docker.internal:8000/api/v1'
		: process.env.NEXT_PUBLIC_API_URL_CLIENT || 'http://localhost:8000/api/v1',
	headers: {
		'Content-Type': 'application/json',
	},
	credentials: 'include',
})

$Api.interceptors.request.use(config => {
	const accessToken = localStorage.getItem('access_token')

	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

// $Api.interceptors.response.use(
// 	config => config,
// 	async error => {
// 		const originalRequest = error

// 		if (
// 			(error?.response?.status === 401 ||
// 				error?.response?.status === 401 ||
// 				errorCatch(error) === 'Unauthorized') &&
// 			error
// 		) {
// 			originalRequest = true
// 			try {
// 				await refresh()
// 				return axiosWithAuth.request(originalRequest)
// 			} catch (error) {
// 				if (errorCatch(error) === 'Unauthorized') {
// 					removeFromStorage()
// 					NextResponse.redirect(new URL('/auth/login'))
// 				}
// 			}
// 		}

// 		throw error
// 	}
// )
