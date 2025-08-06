import { IAppeal } from './Appeal.interface'
import { ICalculatorLocation } from './CalculatorLocation.interface'
import { IContainer } from './Container.interface'
import { AuctionImage } from './Shop.interface'
import { TTerminals } from './Terminals.interface'
import { IUser } from './User.interface'

export interface IOrder {
	id: number
	auction_name: string
	auction_city: ICalculatorLocation
	terminal: TTerminals
	lot_id: number
	from_dealer: boolean
	car_value: number
	extra_fee: { name: string; amount: number | undefined }[]
	vin: string
	vehicle_name: string
	keys: boolean
	new_used: boolean
	damage: boolean
	wheels: boolean
	running: boolean
	airbag: boolean
	radio: boolean
	insurance: boolean
	color: string
	container: IContainer
	user: IUser
	depth_video: IOrderDepthVideo
	auction_image: AuctionImage[] | null
	created_at: string
	delivery_status: TOrderDeliveryStatuses
	auto_generated: boolean
	items: Record<string, number> | null
	vehicle_type: 'CAR' | 'MOTO'
	appeal: IAppeal | null
	fee_type: string
}

export interface IOrderDepthVideo {
	is_depth_video: boolean
	is_video_attached: boolean
	depth_video_url: string
}

export interface ICreateOrder
	extends Omit<
		IOrder,
		| 'id'
		| 'user'
		| 'car_value'
		| 'lot_id'
		| 'container'
		| 'auction_city'
		| 'auction_image'
		| 'delivery_status'
		| 'auto_generated'
		| 'items'
		| 'insurance'
		| 'radio'
		| 'airbag'
		| 'running'
		| 'wheels'
		| 'new_used'
		| 'appeal'
	> {
	depth_video_url: string
	user: { id: number; first_name: string; last_name: string }
	car_value: string | number
	lot_id: string | number
	auction_image: File[] | null
	container: { id: number; container_key: string }
	auction_city: ICalculatorLocation | undefined
}

export interface IChangeOrder
	extends Omit<ICreateOrder, 'car_value' | 'lot_id'> {
	car_value: string
	lot_id: string
}

export type TOrderDeliveryStatuses =
	| 'pending_payment'
	| 'paid'
	| 'unpaid'
	| 'picked_up'
	| 'delivered_terminal'
	| 'loaded_into_container'
	| 'no_title'

export const orderDeliveryStatusesLabels = {
	pending_payment: 'Pending payment',
	paid: 'Paid',
	unpaid: 'Not paid on time',
	picked_up: 'Picked up from auction',
	delivered_terminal: 'Delivered to terminal',
	loaded_into_container: 'Loaded into container',
	no_title: 'Waiting for vehicle documents',
}

export interface IOrderDecodeVin {
	trim: string
	vehicle_weight: string
	drive_type: string | null
	cylinders: string
	primary_fuel_type: string
	secondary_fuel_type: string | null
	electro_level: string | null
}
