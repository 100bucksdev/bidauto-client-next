export interface ITerminalsPrices {
	savannah: number
	newyork: number
	houston: number
	miami: number
	chicago: number
	losangeles: number
}

export type TTerminals =
	| 'SAVANNAH'
	| 'NEW YORK'
	| 'HOUSTON'
	| 'MIAMI'
	| 'CHICAGO'
	| 'LOS ANGELES'

export interface ITerminalsPricesNj extends Omit<ITerminalsPrices, 'NEWYORK'> {
	nj: number
	location: string
}
