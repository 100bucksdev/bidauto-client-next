export interface IAppealMessage {
	id: number | string | undefined
	message_images: string[] | { id: number; image_url: string }[]
	message: string
	role: 'admin' | 'user'
	timestamp: string
	seen: boolean | undefined
}

export interface IAppealCreate {
	reason: string
	appeal_images: File[]
	order: number
}

export interface IAppeal {
	id: number
	appeal_images: { id: number; image_url: string }[]
	reason: string
	state: string
	new_messages: number
	solved: boolean
	order: number
	timestamp: string
}
