import { TLot } from './Lot.interface'

export interface IOffers {
	id: number
	vehicle: TLot
	difference: number
	lot_id: string
	buy_now_price: number
	average_price: number
	picked: boolean
}
