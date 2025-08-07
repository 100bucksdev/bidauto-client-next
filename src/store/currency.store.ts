import { toEuro } from '@/shared/utils/ExchageRates'
import { create } from 'zustand'

interface ICurrencyState {
	eurCurrency: number
	setEurCurrency: (eurCurrency: number) => void
}

export const currencyStore = create<ICurrencyState>()(set => ({
	eurCurrency: toEuro,

	setEurCurrency: eurCurrency =>
		set(() => ({
			eurCurrency,
		})),
}))
