import { create } from 'zustand'
const currentYear = String(new Date(Date.now()).getFullYear())

export type TCopartVehicles =
	| 'automobile'
	| 'heavy_truck'
	| 'trailer'
	| 'motorcycle'
	| 'boat'
	| 'medium_truck'
	| 'atv'
	| 'recreational_vehicle(rv)'
	| 'jet_ski'
	| 'bus'
	| 'other_goods'
	| 'industrial_equipment'
	| 'snowmobile'
	| 'agriculture_and_farm_equipment'
	| 'dirt_bike'
	| 'inspection'
	| 'construction_equipment'

export type TIAAIVehicles =
	| 'automobile'
	| 'boat'
	| 'straight_truck'
	| 'wagon_4_dr.'
	| 'crew_pickup'
	| 'truck'
	| 'other'
	| 'utility'
	| 'sedan_4_dr.'
	| 'motorcycle'
	| 'motor_home'
	| 'hatchback_2_dr.'
	| 'emergency_equipment'
	| 'trailer'
	| 'cargo_van'
	| 'hatchback_4_dr.'
	| 'club_cab_pickup'
	| 'travel_trailer'
	| 'sedan'
	| 'pickup'
	| 'sports_van'
	| 'bus'
	| 'extended_cargo_van'
	| 'tractor_truck'
	| '3_door_extended_cab_pickup'
	| 'crew_cab'
	| 'sport_utility'
	| 'hatchback'
	| 'coupe'
	| 'extended_cab'
	| 'heavy_equipment'
	| 'double_cab'
	| 'passenger_van'
	| 'standard_cab'
	| 'inc(strip_chass)2dr'
	| 'sedan_4_door'
	| 'snowmobile'
	| 'convertible'
	| 'personal_watercraft'
	| 'pickup_4_door'
	| 'incomplete_chassis'
	| 'farm_equipment'
	| 'side_by_side'
	| 'van_passenger_3_door'
	| 'truck_tractor'
	| 'pickup_2_door'
	| 'suv_4_door'
	| 'step_van'
	| 'chassis'
	| 'cruiser'
	| 'wagon'
	| 'g1500_passenger_van'
	| 'extended_passenger_van'
	| 'extended_wagon'
	| 'van_passenger_4_door'
	| 'tilt_cab'
	| 'quad_cab'
	| 'coupe_2_door'
	| 'sd_crew_cab'
	| 'hatchback_2_door'

export type TVehicles = TCopartVehicles | TIAAIVehicles

export interface ISearchParams {
	site: 'copart' | 'iaai' | '1' | '2' | '3' | 'all' | '' // site*
	make: string | null // make
	model: string | null // model
	vehicle_type: string | null // vehicle_type
	year_from: number | null // year_from
	year_to: number | null // year_to
	auction_date_from: string | null // auction_date_from
	auction_date_to: string | null // auction_date_to
	transmission: string[] | null // transmission[]
	status: string[] | null // status[]
	drive: string[] | null // drive[]
	damage_pr: string[] | null // damage_pr[]
	document: string[] | null // document[]
	odometer_min: number | null // odometer_min
	odometer_max: number | null // odometer_max
	seller_type: 'insurance' | 'dealer' | null // seller_type
	sort: 'auction_date' | 'created_at' | null // sort
	direction: 'ASC' | 'DESC' | null // direction
	page: number // page
	size: number // size
	buy_now: boolean | null // buy_now
	fuel: string[] | null // fuel[]
}

const defaultState: ISearchParams = {
	isBuyNow: 'false',
	auction: 'COPART',
	make: 'All_Makes',
	model: 'All_Models',
	yearFrom: '2000',
	yearTo: currentYear,
	bidFrom: '',
	bidTo: '',
	auctionDateFrom: '',
	auctionDateTo: '',
	buyNowPriceFrom: '',
	buyNowPriceTo: '',
	archived: 'false',
	type: 'automobile',
	vin: '',
	fuel: 'ALL_FUELS',
	seller: 'ALL_SELLERS',
	vehicle_condition: 'ALL_CONDITIONS',
	insurance: 'ALL',
	odometerFrom: '0',
	odometerTo: '250000',
	q: '',
}

interface ISearchState {
	params: ISearchParams

	setIsBuyNow: (isBuyNow: 'true' | 'false') => void
	setAuction: (auction: 'COPART' | 'IAAI') => void
	setMake: (make: string) => void
	setModel: (make: string) => void
	setYearFrom: (yearFrom: string) => void
	setYearTo: (yearTo: string) => void
	setBidFrom: (bidFrom: string) => void
	setBidTo: (bidTo: string) => void
	setAuctionDateFrom: (auctionDateFrom: string) => void
	setAuctionDateTo: (auctionDateTo: string) => void
	setBuyNowPriceFrom: (buyNowPriceFrom: string) => void
	setBuyNowPriceTo: (buyNowPriceTo: string) => void
	setArchived: (arhived: 'true' | 'false') => void
	setType: (type: TVehicles) => void
	setVin: (vin: string) => void
	setFuel: (fuel: string) => void
	setSeller: (seller: string) => void
	setVehicleCondition: (lotCondition: string) => void
	setInsurance: (insurance: 'ALL' | '1' | '0') => void
	setOdometerFrom: (odometerFrom: string) => void
	setQ: (q: string) => void
	setOdometerTo: (odometerTo: string) => void
	toDefault: () => void
	setUrl: (params: any) => void
}

export const searchOptions = create<ISearchState>()(set => ({
	params: {
		...defaultState,
	},

	setIsBuyNow: isBuyNow =>
		set(state => ({ params: { ...state.params, isBuyNow } })),
	setAuction: auction =>
		set(state => ({
			params: { ...state.params, auction },
		})),
	setMake: make => set(state => ({ params: { ...state.params, make } })),
	setModel: model => set(state => ({ params: { ...state.params, model } })),
	setYearFrom: yearFrom =>
		set(state => ({ params: { ...state.params, yearFrom } })),
	setYearTo: yearTo => set(state => ({ params: { ...state.params, yearTo } })),
	setBidFrom: bidFrom =>
		set(state => ({ params: { ...state.params, bidFrom } })),
	setBidTo: bidTo => set(state => ({ params: { ...state.params, bidTo } })),
	setAuctionDateFrom: auctionDateFrom =>
		set(state => ({ params: { ...state.params, auctionDateFrom } })),
	setAuctionDateTo: auctionDateTo =>
		set(state => ({ params: { ...state.params, auctionDateTo } })),
	setBuyNowPriceFrom: buyNowPriceFrom =>
		set(state => ({ params: { ...state.params, buyNowPriceFrom } })),
	setBuyNowPriceTo: buyNowPriceTo =>
		set(state => ({ params: { ...state.params, buyNowPriceTo } })),
	setArchived: archived =>
		set(state => ({ params: { ...state.params, archived } })),
	setType: type => set(state => ({ params: { ...state.params, type, q: '' } })),
	setVin: vin => set(state => ({ params: { ...state.params, vin } })),
	setFuel: fuel => set(state => ({ params: { ...state.params, fuel } })),
	setSeller: seller => set(state => ({ params: { ...state.params, seller } })),
	setInsurance: insurance =>
		set(state => ({
			params: {
				...state.params,
				insurance,
			},
		})),
	setQ: q => set(state => ({ params: { ...state.params, q } })),
	setOdometerFrom: odometerFrom =>
		set(state => ({ params: { ...state.params, odometerFrom } })),
	setOdometerTo: odometerTo =>
		set(state => ({ params: { ...state.params, odometerTo } })),
	setVehicleCondition: vehicleCondition =>
		set(state => ({
			params: { ...state.params, vehicle_condition: vehicleCondition },
		})),
	toDefault: () => set(() => ({ params: defaultState })),

	setUrl: url =>
		set(() => ({
			params: {
				...defaultState,
				...Object.fromEntries(
					Object.entries(url).filter(([_, value]) => value !== undefined)
				),
			},
		})),
}))

export function getStringParams() {
	const { params } = searchOptions()

	return Object.fromEntries(
		Object.entries(params)
			.filter(([_, value]) => {
				if (value === undefined || value === '') return false
				if (typeof value === 'object' && value !== null) {
					return (
						'value' in value && value.value !== undefined && value.value !== ''
					)
				}
				return true
			})
			.map(([key, value]) => {
				if (typeof value === 'object' && value !== null && 'value' in value) {
					return [key, value.value]
				}
				return [key, value]
			})
	)
}
