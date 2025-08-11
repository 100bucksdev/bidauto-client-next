'use client'

import { ISalesHistoryItem } from '@/types/SalesHistoryItem.interface'

import { FetchesResponse } from '@astralis-team/primitive-fetch'
import { useTranslations } from 'next-intl'
import { Fragment, useEffect, useState } from 'react'
import { LotWithHistory } from '../LotHeader'
import SalesHistoryItem from './SalesHistoryItem'
import SalesHistoryItemMask from './SalesHistoryItemMask'

const SalesHistory = ({
	data,
	isOpen,
}: FetchesResponse<LotWithHistory> & {
	isOpen: boolean
}) => {
	const t = useTranslations()
	const info = data
	const [history, setHistory] = useState(info?.history)

	useEffect(() => {
		if (info) {
			setHistory(info.history.reverse())
		}
	}, [info])

	return (
		<>
			{isOpen && (
				<>
					{!data ? (
						<>
							<div className='overflow-x-auto'>
								<div className='inline-flex flex-col min-w-[900px] w-full '>
									<div className='inline-flex justify-center text-center px-8 max-md:px-2 max-md:text-lg py-3 text-xl '>
										<div className='flex justify-around w-full'>
											<div className='select-none min-w-32 font-semibold'>
												Auction
											</div>
											<div className='select-none min-w-44 font-semibold'>
												Sale date
											</div>
											<div className='select-none font-semibold min-w-44'>
												Lot number
											</div>
											<div className='select-none font-semibold min-w-44'>
												Final bid
											</div>
											<div className='select-none font-semibold min-w-44'>
												Buyer country
											</div>
											<div className='select-none font-semibold min-w-44'>
												Status
											</div>
										</div>
									</div>
									<>
										<div className='inline-flex gap-y-3 flex-col px-8 max-md:px-2 py-3'>
											<SalesHistoryItemMask />
											<SalesHistoryItemMask />
											<SalesHistoryItemMask />
										</div>
									</>
								</div>
							</div>
						</>
					) : (
						<>
							{history?.length ? (
								<div className='overflow-x-auto bg-gray-200 mt-2 rounded-2xl'>
									<div className='inline-flex flex-col min-w-[800px] w-full'>
										<div className='inline-flex justify-center text-center px-8 max-md:px-2 max-md:text-lg py-3 text-xl'>
											<div className='flex justify-around w-full'>
												<div className='select-none min-w-32 font-semibold'>
													Auction
												</div>
												<div className='select-none min-w-44 font-semibold'>
													Sale date
												</div>
												<div className='select-none font-semibold min-w-44'>
													Lot number
												</div>
												<div className='select-none font-semibold min-w-44'>
													Final bid
												</div>
												<div className='select-none font-semibold min-w-44'>
													Buyer country
												</div>
												<div className='select-none font-semibold min-w-44'>
													Status
												</div>
											</div>
										</div>
										<>
											<div className='inline-flex gap-y-3 flex-col px-8 max-md:px-2 py-3'>
												<>
													{history.map(
														(el: ISalesHistoryItem, index: number) => (
															<Fragment key={index}>
																<SalesHistoryItem item={el} />
																{history.length - 1 === index ? '' : <hr />}
															</Fragment>
														)
													)}
												</>
											</div>
										</>
									</div>
								</div>
							) : (
								<>
									<div className='text-center font-semibold text-2xl py-4'>
										{t('lot.salesHistory.noHistory')}
									</div>
								</>
							)}
						</>
					)}
				</>
			)}
		</>
	)
}

export default SalesHistory
