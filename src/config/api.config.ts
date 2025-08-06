import pfetch from '@astralis-team/primitive-fetch'

export const $TestApi = pfetch.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
	headers: {
		'Content-Type': 'application/json',
	},
	credentials: 'include',
})
