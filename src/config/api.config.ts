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
