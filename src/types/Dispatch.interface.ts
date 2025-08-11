interface IDispatchPreviewData {
	address1: string
	address2: string
	buyerNumber: string
	city: string
	companyName: string
	contact: string
	contactPhone: string
	customerId: string
	state: string
	zipCode: string
}

export interface IDispatchPreview {
	delivery_location: IDispatchPreviewData
	pickup_location: IDispatchPreviewData
}
