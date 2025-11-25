import { ILotCalculator, ILotEuCalculator } from './LotCalculator.interface'
import { ISalesHistoryItem } from './SalesHistoryItem.interface'

export interface IAvgPrices {
	min: number
	max: number
	avg: number
}

export interface IAuctionsStatuses {
	iaai_available: boolean
	copart_available: boolean
}

export interface TLot {
	lot_id: number
	site: number
	base_site: string
	salvage_id: number
	odometer: number
	price_new: number
	price_future: number
	price_reserve: number
	current_bid: number
	auction_date: string
	cost_priced: number
	cost_repair: number
	year: number
	cylinders: number
	state: string
	vehicle_type: string
	auction_type: string
	make: string
	model: string
	series: string
	damage_pr: string
	damage_sec: string
	keys: string
	odobrand: string
	fuel: string
	drive: string
	transmission: string
	color: string
	status: string
	title: string
	vin: string
	engine: string
	engine_size: number
	location: string
	location_old: string
	location_id: number
	country: string
	document: string
	document_old: string
	currency: string
	seller: string
	is_buynow: boolean
	iaai_360: string
	copart_exterior_360: string[]
	copart_interior_360: string
	video: string
	link_img_hd: string[]
	link_img_small: string[]
	is_offsite: boolean
	location_offsite: string
	link: string
	body_type: string
	seller_type: string
	vehicle_score: string
	form_get_type: 'history' | 'active'
}

export interface ILotInfo {
	insurance_caution: boolean
	history: ISalesHistoryItem[]
	bid: number
	lot_views: number
	avg_prices: IAvgPrices
	min_price_calculated: {
		calculator: ILotCalculator
		eu_calculator: ILotEuCalculator
		eur_rate: number
	}
	max_price_calculated: {
		calculator: ILotCalculator
		eu_calculator: ILotEuCalculator
		eur_rate: number
	}
}

export type TLotTitleColorData =
	| 'grey'
	| 'green'
	| 'yellow'
	| 'red'
	| 'red red'
	| 'black'

export interface ILotTitleIndicators {
	color: TLotTitleColorData
}
