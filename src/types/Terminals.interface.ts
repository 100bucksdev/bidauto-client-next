export interface ITerminalsPrices {
	savannah: number
	newyork: number
	houston: number
	miami: number
	chicago: number
}

export type TTerminals =
	| 'SAVANNAH'
	| 'NEW YORK'
	| 'HOUSTON'
	| 'MIAMI'
	| 'CHICAGO'

export interface ITerminalsPricesNj extends Omit<ITerminalsPrices, 'NEWYORK'> {
	nj: number
	location: string
}
