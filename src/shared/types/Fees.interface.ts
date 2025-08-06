import { IPagination } from './Pagination.interface'
export type TFeeType =
	| 'non_clean_title_fee'
	| 'clean_title_fee'
	| 'crashed_toys_fee'
	| 'less_fee'

export interface IFee {
	id: number
	car_price_min: number
	car_price_max: number
	car_price_fee: number
}

export interface IFeesResponse {
	pagination: IPagination
	data: IFee[]
}

export interface IFeesFields {
	car_price_min: number
	car_price_max: number
	car_price_fee: number
}

export interface IAdditionalFeeIAAI {
	type: 'iaai'
	id: number
	int_proxy_min: number
	int_proxy_max: number
	int_fee: number
	proxy_fee: number
}

export interface IAdditionalFeeCopart {
	type: 'copart'
	id: number
	live_bid_min: number
	live_bid_max: number
	live_bid_fee: number
}

export type TAdditionalFee = IAdditionalFeeIAAI | IAdditionalFeeCopart

export interface IAdditionalFeesResponse {
	data: TAdditionalFee[]
	pagination: IPagination
}

export interface IIAAIAdditionalFeesFields {
	int_proxy_min: number
	int_proxy_max: number
	int_fee: number
	proxy_fee: number
}

export interface ICopartAdditionalFeesFields {
	live_bid_min: number
	live_bid_max: number
	live_bid_fee: number
}
