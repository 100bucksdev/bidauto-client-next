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

export interface ICopartLot {
	ActualCashValue: number
	Archived: boolean
	Auction: 'COPART'
	AuctionDate: string
	BodyStyle: any
	BuyNowPrice: number
	Color: string
	CurrentBid: number
	ReservePrice: number | null
	Cylinders: string
	Drive: string
	Engine: string
	EstimatedRepairCost: number
	FuelType: string
	Keys: boolean
	LocationCity: string
	LocationState: string
	LotCondition: string
	Make: string
	ModelDetail: string
	ModelGroup: string
	Odometer: string
	OdometerBrand: string
	PrimaryDamage: string
	SaleStatus: string
	SecondaryDamage: string
	Seller: string
	SpecialNotes: string
	StartCode: string
	Title: string
	Transmission: string
	U_ID: string
	VIN: string
	VehicleImages: string[] | undefined
	VehicleImagesSmallHD?:
		| {
				hd?: string
				small?: string
		  }[]
		| undefined
	VehicleType: string
	Year: number
	Insurance: boolean
	auctions_statuses: IAuctionsStatuses
}

export interface IIAAILot {
	ActualCashValue: number
	Archived: boolean
	Auction: 'IAAI'
	AuctionDate: string
	BodyStyle: any
	BuyNowPrice: number
	ReservePrice: number | null
	Color: string
	CurrentBid: number
	Cylinders: string
	Drive: string
	Engine: string
	EstimatedRepairCost: number
	FuelType: string
	Keys: boolean
	LocationCity: string
	LocationState: string
	LotCondition: string
	Make: string
	ModelDetail: string
	ModelGroup: string
	Odometer: string
	OdometerBrand: string
	PrimaryDamage: string
	SaleStatus: string
	SecondaryDamage: string
	Seller: string
	SpecialNotes: string
	Title: string
	Transmission: string
	U_ID: string
	VIN: string
	Interior: string
	ManufacturedIn: string
	Options: string
	RestraintSystem: string
	Loss: string
	Airbags: string
	VehicleImages: string[]
	VehicleImagesSmallHD?:
		| {
				hd?: string
				small?: string
		  }[]
		| undefined
	VehicleType: string
	Year: number
	Insurance: boolean
	Stock: string
	View360: string
	auctions_statuses: IAuctionsStatuses
	EngineVideo: string
}

export type TLot = IIAAILot | ICopartLot

export interface ILotInfo {
	title_indicator: string
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
