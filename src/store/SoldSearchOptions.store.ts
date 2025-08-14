import {
	ISoldSearchParams,
	ISoldVehicleState,
} from '@/types/SoldVehicle.interface'
import { create } from 'zustand'

const defaultState: ISoldSearchParams = {
	vehicle_type: 'automobile',
	make: 'All_Makes',
	model: 'All_Models',
	site: 0, // 0 for Copart, 1 for IAAI
	year_from: '2000',
	year_to: '2025',
	created_at_from: '',
	created_at_to: '',
	auction_date_from: '',
	auction_date_to: '',
	sale_status: '-',
	buyer_country: 'LTU',
	seller_type: '-',
	page: 1,
	size: 15,
	odometer_min: '0',
	odometer_max: '250000',
	is_buy_now: false,
}

export const SoldVehicleSearchOptionsStore = create<ISoldVehicleState>(set => ({
	params: {
		...defaultState,
	},
	setVehicleType: vehicle_type =>
		set(state => ({
			params: {
				...state.params,
				vehicle_type,
			},
		})),
	setMake: make =>
		set(state => ({
			params: {
				...state.params,
				make,
			},
		})),
	setModel: model =>
		set(state => ({
			params: {
				...state.params,
				model,
			},
		})),
	setSite: site =>
		set(state => ({
			params: {
				...state.params,
				site: site === 'COPART' ? 0 : site === 'IAAI' ? 1 : 0, // 1 for Copart, 0 for IAAI
			},
		})),
	setYearFrom: year_from =>
		set(state => ({
			params: {
				...state.params,
				year_from,
			},
		})),
	setYearTo: year_to =>
		set(state => ({
			params: {
				...state.params,
				year_to,
			},
		})),
	setCreatedAtFrom: created_at_from =>
		set(state => ({
			params: {
				...state.params,
				created_at_from,
			},
		})),
	setCreatedAtTo: created_at_to =>
		set(state => ({
			params: {
				...state.params,
				created_at_to,
			},
		})),
	setAuctionDateFrom: auction_date_from =>
		set(state => ({
			params: {
				...state.params,
				auction_date_from,
			},
		})),
	setAuctionDateTo: auction_date_to =>
		set(state => ({
			params: {
				...state.params,
				auction_date_to,
			},
		})),
	setSaleStatus: sale_status =>
		set(state => ({
			params: {
				...state.params,
				sale_status,
			},
		})),
	setBuyerCountry: buyer_country =>
		set(state => ({
			params: {
				...state.params,
				buyer_country,
			},
		})),
	setSellerType: seller_type =>
		set(state => ({
			params: {
				...state.params,
				seller_type,
			},
		})),
	setPage: page =>
		set(state => ({
			params: {
				...state.params,
				page,
			},
		})),
	setSize: size =>
		set(state => ({
			params: {
				...state.params,
				size,
			},
		})),
	setOdometerMin: odometer_min =>
		set(state => ({
			params: {
				...state.params,
				odometer_min,
			},
		})),
	setOdometerMax: odometer_max =>
		set(state => ({
			params: {
				...state.params,
				odometer_max,
			},
		})),
	setIsBuyNow: is_buy_now =>
		set(state => ({
			params: {
				...state.params,
				is_buy_now,
			},
		})),
	reset: () =>
		set({
			params: {
				...defaultState,
			},
		}),
}))

export function getSoldVehiclesStringParams() {
	const { params } = SoldVehicleSearchOptionsStore()

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
