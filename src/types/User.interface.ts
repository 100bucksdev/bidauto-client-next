import { IShopVehicle } from './Shop.interface'
import { TUserDepositPlans } from './UserPlans.type'

export interface IUserBid {
	id: number
	lot_id: string
	auction_date: Date
	updated_at: Date
	created_at: Date
	higher_bid: number
	amount: number
	user_status: string
}

export interface IUserPaymentAccount {
	plan: TUserDepositPlans
	frozen_balance: number
	bid_power: number
}

export interface IUserDeliveryInfo {
	zip_code: number | string
	city: string
	address: string
	country: string
	state: string
}

export interface IUserCarfaxAccount {
	package: {
		reports_left: number
		plan_name: string
		reports: number
	}
}

export interface IUser {
	id: number
	first_name: string
	last_name: string
	email: string
	phone_number: string | null
	is_email_confirmed: boolean
	is_phone_confirmed: boolean
	country: string
	favorites: string[]
	bids: IUserBid[]
	carfax_reports: string[]
	vehicles: IShopVehicle[]
	carfax_account: IUserCarfaxAccount | null
	account: IUserPaymentAccount
	is_superuser: boolean
	is_staff: boolean
	delivery_info: IUserDeliveryInfo
}
