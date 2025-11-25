export interface FeeItem {
	name: string
	price: number
}

export interface AdditionalFees {
	summ: number
	fees: FeeItem[]
	auction_fee: number
	internet_fee: number
	live_fee: number
}

export interface CalculatorBase {
	broker_fee: number
	transportation_price: FeeItem[]
	ocean_ship: FeeItem[]
	additional: AdditionalFees
	totals: FeeItem[]
	auction_fee: number
	live_fee: number
	internet_fee: number
}

export interface Vats {
	vats: FeeItem[]
	eu_vats: FeeItem[]
}

export interface EuCalculator extends CalculatorBase {
	vats: Vats
	custom_agency: number
}

export interface CalculatorGroup<T> {
	calculator: T
	eu_calculator: EuCalculator
}

export interface ICalculator {
	calculator_in_dollars: CalculatorGroup<CalculatorBase>
	calculator_in_currency: CalculatorGroup<CalculatorBase>
}
