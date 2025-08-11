import { TVehicles } from '@/store/searchOptions.store'

export interface ISearchLotParams {
	make?: string
	model?: string
	yearFrom?: string
	yearTo?: string
	isBuyNow?: 'true' | 'false'
	auciton?: 'COPART' | 'IAAI'
	type?: TVehicles
	archived?: 'true' | 'false'
	vin?: string
	bidFrom?: string
	bidTo?: string
	auctionDateFrom?: string
	auctionDateTo?: string
	buyNowPriceFrom?: string
	buyNowPriceTo?: string
	q?: string
}

type RequiredFields<T> = {
	[K in keyof T]-?: T[K]
}

export interface ISearchOptions
	extends RequiredFields<Omit<ISearchLotParams, 'type' | 'archived' | 'vin'>> {}
