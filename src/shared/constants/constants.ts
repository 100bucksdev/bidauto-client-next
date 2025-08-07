export const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'image/svg+xml',
]

export const shopVehicleDeliverStatuses = {
	for_sale: 'For sale',
	reserved: 'Reserved',
	won_in_auction: 'Won in auction',
	paid: 'Paid',
	delivered_terminal: 'Delivered to terminal',
	loaded_into_container: 'Loaded into container',
}

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL
