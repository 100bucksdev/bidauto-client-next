'use client'

import { useGetSimilarArchivalOffers } from '@/shared/api/Lots/getSimilarArchivalOffers/useGetSimilarArchivalOffers'
import { FetchesResponse } from '@astralis-team/primitive-fetch'
import { useState } from 'react'
import { LotWithHistory } from './LotHeader'
import SalesHistory from './SalesHistory/SalesHistory'
import SalesHistoryTitle from './SalesHistory/SalesHistoryTitle'
import SimilarArchivalOffers from './SimilarArchival/SimilarArchivalOffers'
import SimilarArchivalOffersTitle from './SimilarArchival/SimilarArchivalOffersTitle'

const LotHeaderFooter = ({
	info,
	auction,
	id,
}: {
	info: FetchesResponse<LotWithHistory>
	auction: 'COPART' | 'IAAI'
	id: string
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
			auction,
			id,
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
				<SalesHistory {...info} isOpen={isSalesHistoryOpen} />
			</div>
			<div>
				<SimilarArchivalOffers
					data={data.data?.data}
					isLoading={data.isLoading}
					auction={auction}
					isOpen={isSimilarArchivalOffersOpen}
				/>
			</div>
		</>
	)
}

export default LotHeaderFooter
