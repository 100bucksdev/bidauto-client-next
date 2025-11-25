export interface IFavoriteVehicle {
	lot_id: number
	auction: string
	title: string
	auction_date: string
	vin: string
	images: string[]
	odometer: number
	location: string
	damage_pr: string
	damage_sec: string
	fuel: string
	transmission: string
	engine_size: string
	cylinders: string
	seller: string
	document: string
	status: string
	id: number
	form_get_type: 'active' | 'history'
}
