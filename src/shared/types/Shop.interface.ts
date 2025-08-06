import { IOrder } from './Order.interface'
import { IUser } from './User.interface'

export type TShopVehicleStatuses =
	| 'for_sale'
	| 'reserved'
	| 'paid'
	| 'delivered_terminal'
	| 'loaded_into_container'
	| 'won_in_auction'

export type TShopVehicleResponseStatuses = Record<TShopVehicleStatuses, string>

export interface IShopVehicle {
	id: number
	images: AuctionImage[]
	price: Record<'last' | 'prev' | 'discount', string | undefined | null>
	name: string
	vin: string
	odometer: number
	fuel_type: string
	keys: boolean
	transmission: string
	engine: string
	primary_damage: string
	secondary_damage: string
	visible: boolean
	special_notes: string
	delivery_state: TShopVehicleStatuses
	created_at: string
	updated_at: string
	auction: IShopAuction | null
	purchase_mode: TShopPurchaseMode
	order: null | IOrder
	buyer: IUser | null
	category: { id: number; slug: string; name: string }
}

export interface IShopAuction {
	id: number
	start_time: Date | string
	end_time: Date | string
	gap_minutes_for_win: number
	initial_price: number
	min_bid: number
	won_bid: number | null
	is_combined: boolean
	is_auction_active: boolean
}

export type TShopPurchaseMode = 'reservation' | 'auction' | 'combined'

export type AuctionImage = {
	id: number | null
	image_url: string
	small_image_url: string
	order: number
}

export interface ICreateShopVehicle
	extends Omit<
		IShopVehicle,
		| 'id'
		| 'images'
		| 'created_at'
		| 'updated_at'
		| 'buyer'
		| 'delivery_state'
		| 'price'
		| 'category'
	> {
	price: number | undefined
	images: File[] | null
	category: number | undefined
}

export interface IChangeShopVehicle extends ICreateShopVehicle {}
