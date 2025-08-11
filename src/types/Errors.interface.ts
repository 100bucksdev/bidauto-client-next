export interface BackendError {
	response: {
		data: {
			details: string
			messages: {
				message: string
			}
		}
	}
}
