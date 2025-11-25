'use client'

import { useGetSimilarArchivalOffers } from '@/shared/api/Lots/getSimilarArchivalOffers/useGetSimilarArchivalOffers'
import { auctionName } from '@/shared/utils/auctionName'
import { TLot } from '@/types/Lot.interface'
import { useState } from 'react'
import { LotWithHistory } from './LotHeader'
import SalesHistory from './SalesHistory/SalesHistory'
import SalesHistoryTitle from './SalesHistory/SalesHistoryTitle'
import SimilarArchivalOffers from './SimilarArchival/SimilarArchivalOffers'
import SimilarArchivalOffersTitle from './SimilarArchival/SimilarArchivalOffersTitle'

const LotHeaderFooter = ({
	info,
	lot,
}: {
	info: LotWithHistory
	lot: TLot
}) => {
	const [isSalesHistoryOpen, setIsSalesHistoryOpen] = useState(false)
	const [isSimilarArchivalOffersOpen, setIsSimilarArchivalOffersOpen] =
		useState(false)

	const handleSalesHistoryToggle = (value: boolean) => {
		setIsSalesHistoryOpen(value)
		if (value) {
			setIsSimilarArchivalOffersOpen(false)
		}
	}

	const handleSimilarOffersToggle = (value: boolean) => {
		setIsSimilarArchivalOffersOpen(value)
		if (value) {
			setIsSalesHistoryOpen(false)
		}
	}

	const data = useGetSimilarArchivalOffers(
		{
			auction: auctionName(lot.site),
			model: lot.model,
			make: lot.make,
			year: lot.year,
			vehicle_type: lot.vehicle_type,
		},
		{
			options: {
				enabled: isSimilarArchivalOffersOpen,
			},
		}
	)

	return (
		<>
			<div className='grid grid-cols-2 max-sm:grid-cols-1 max-sm:grid-rows-2'>
				<SalesHistoryTitle
					setIsOpen={handleSalesHistoryToggle}
					isOpen={isSalesHistoryOpen}
				/>
				<SimilarArchivalOffersTitle
					setIsOpen={handleSimilarOffersToggle}
					isOpen={isSimilarArchivalOffersOpen}
				/>
			</div>
			<div>
				<SalesHistory data={info} isOpen={isSalesHistoryOpen} />
			</div>
			<div>
				<SimilarArchivalOffers
					lot={data.data?.data.data}
					isLoading={data.isLoading}
					auction={auctionName(lot.site)}
					isOpen={isSimilarArchivalOffersOpen}
					make_model={{ make: lot.make, model: lot.model }}
				/>
			</div>
		</>
	)
}

export default LotHeaderFooter
