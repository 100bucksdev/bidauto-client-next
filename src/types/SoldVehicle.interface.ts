import { TVehicles } from '@/store/searchOptions.store'

export interface ISoldSearchParams {
	vehicle_type: TVehicles
	make: string
	model: string
	site: number
	year_from: string
	year_to: string
	created_at_from: string
	created_at_to: string
	auction_date_from: string
	auction_date_to: string
	sale_status: TSoldVehicleSaleStatus
	buyer_country: string
	seller_type: 'insurance' | 'dealer' | '-'
	page: number
	size: number
	odometer_min: string
	odometer_max: string
	is_buy_now: boolean
}

export type TSoldVehicleSaleStatus = 'sold' | 'not sold' | 'on approval' | '-'

export interface ISoldVehicleState {
	params: ISoldSearchParams

	setVehicleType: (vehicleType: TVehicles) => void
	setMake: (make: string) => void
	setModel: (model: string) => void
	setSite: (site: 'COPART' | 'IAAI') => void
	setYearFrom: (yearFrom: string) => void
	setYearTo: (yearTo: string) => void
	setCreatedAtFrom: (createdAtFrom: string) => void
	setCreatedAtTo: (createdAtTo: string) => void
	setAuctionDateFrom: (auctionDateFrom: string) => void
	setAuctionDateTo: (auctionDateTo: string) => void
	setSaleStatus: (saleStatus: TSoldVehicleSaleStatus) => void
	setBuyerCountry: (bayerCountry: string) => void
	setSellerType: (sellerType: 'insurance' | 'dealer' | '-') => void
	setPage: (page: number) => void
	setSize: (size: number) => void
	setOdometerMin: (odometerMin: string) => void
	setOdometerMax: (odometerMax: string) => void
	setIsBuyNow: (isBuyNow: boolean) => void
	reset: () => void
}

export type ISoldLot = {
	U_ID: number
	Auction: string
	VehicleImages: string[]
	VehicleImagesSmallHD: { hd: string; small: string }[]
	EngineVideo: string | null
	Year: number
	Make: string
	ModelDetail: string
	Color: string
	VehicleType: string
	LotCondition: string
	Title: string
	Keys: string
	Odometer: number
	OdometerBrand: string
	Drive: string
	BuyNowPrice: number | null
	OffSiteLocation: string | null
	LocationCity: string
	LocationState: string
	ActualCashValue: number | null
	EstimatedRepairCost: number | null
	ModelGroup: string
	Archived: boolean
	Insurance: boolean
	Stock: number
	URL: string
	View360: string | null
	Engine: string
	Seller: string | null
	VehicleLocation: string
	PrimaryDamage: string
	BodyStyle: string | null
	Transmission: string
	FuelType: string
	Cylinders: number
	ManufacturedIn: string
	AuctionDate: string
	VIN: string
	SecondaryDamage: string
	auctions_statuses: {
		iaai_available: boolean
		copart_available: boolean
		important_message: string | null
	}
	BuyerState: string
	BuyerCountry: string
	SaleStatus: string
	IsKeys: boolean
	PurchasePrice: number
	VehicleScore: number | null
	CopartInterior360: string | null
	ReservePrice: number | null
	PriceFuture: number | null
	EngineSize: number
	SalvageId: number | null
	AuctionType: string
}
