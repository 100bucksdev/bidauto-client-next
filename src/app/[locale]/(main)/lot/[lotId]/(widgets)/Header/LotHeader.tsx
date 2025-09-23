import { IcArrowRight } from '@/shared/icons'
import { getBiddingTimeLeft } from '@/shared/serverActions/getBiddingTimeLeft'
import { getListOfMonthes } from '@/shared/serverActions/getListOfMonthes'
import { getListOfWeekDays } from '@/shared/serverActions/getListOfWeekDays'
import AuctionName from '@/shared/ui/AuctionName'
import { kmInMile, odometer } from '@/shared/utils/odometer'
import { priceFormat } from '@/shared/utils/priceFormat'
import { ILotInfo, TLot } from '@/types/Lot.interface'
import { ISalesHistoryItem } from '@/types/SalesHistoryItem.interface'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { FiExternalLink } from 'react-icons/fi'
import AveragePrices from './AveragePrices'
import LotHeaderFooter from './FooterOfLotHeader'

export type LotWithHistory = ILotInfo & {
	title_indicator: string
	insurance_caution: boolean
	history: ISalesHistoryItem[]
}

type documentColor = {
	green: string
	red: string
	yellow: string
	'red red': string
	grey: string
	black: string
}

const LotHeader = async ({
	lot,
	info,
	request,
}: {
	lot: TLot
	info: ILotInfo | undefined
	request: LotWithHistory
}) => {
	const t = await getTranslations()
	const price = priceFormat({ char: 'USD' })
	const isArchived = lot.Archived
	const saleDate = new Date(lot.AuctionDate)
	const timeLeft = await getBiddingTimeLeft(saleDate.getTime())

	const documentColor: documentColor = {
		green: 'bg-green-500',
		red: 'bg-red-600',
		yellow: 'bg-yellow-500',
		'red red': 'bg-red-500',
		grey: 'bg-gray-500',
		black: 'bg-black',
	}

	const listOfWeekDays = await getListOfWeekDays()
	const listOfMonths = await getListOfMonthes()

	return (
		<header className='border-2 border-gray-300 rounded-2xl p-4'>
			<div className='flex max-lg:block max-sm:block'>
				<div>
					<div className='flex gap-3 max-sm:block'>
						<Link
							href={'/'}
							className='p-2 max-sm:mb-5 bg-gray-200 flex justify-center items-center rounded-full cursor-pointer hover:bg-gray-100 saturate-150 transition-all'
						>
							<IcArrowRight width='20' height='20' />
						</Link>
						<div className='flex justify-center items-center py-0.5 px-4 bg-gray-200 rounded-full font-semibold text-sm max-sm:mb-5'>
							{t('lot.lot')} #{lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID}
						</div>
						{saleDate && (
							<div className='flex justify-center items-center py-0.5 px-4 bg-gray-200 rounded-full font-semibold text-sm gap-1 max-sm:mb-5'>
								<span>{t('lot.date')}:</span>
								<span>
									{`${
										listOfWeekDays[saleDate.getDay()]
									} ${saleDate.getDate()} ${
										listOfMonths[saleDate.getMonth()]
									}, ${saleDate
										.getHours()
										.toString()
										.padStart(2, '0')}:${saleDate
										.getMinutes()
										.toString()
										.padStart(2, '0')}`}
								</span>
							</div>
						)}
						<div className='flex'>
							<AuctionName
								withRedirect
								lot_id={lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID}
								auction_name={lot.Auction}
							/>
						</div>
					</div>
					<h1 className='flex gap-2 font-bold text-3xl mt-5 ml-1'>
						<div>{lot.Year}</div>
						<div>{lot.Make}</div>
						<div>{lot.ModelGroup}</div>
					</h1>
					<h3 className='text-lg ml-1 text-gray-500 '>
						{t('lot.bidView')}: {info?.lot_views}
					</h3>
				</div>
				<div className='ml-auto flex gap-5 items-center max-sm:block'>
					<AveragePrices
						avg_prices={info?.avg_prices}
						currentPrice={lot.CurrentBid}
					/>
					<div className='max-sm:my-5'>
						<div className='mb-3'>
							{lot.CurrentBid >= 0 && !isArchived ? (
								<div className='bg-blue-100 px-6 rounded-full text-t-blue-light py-3 text-center font-semibold'>
									<span>
										{timeLeft ? t('lot.currentBid') : t('lot.preBidClosed')}:{' '}
									</span>
									<span className=''>
										{info?.bid
											? price.format(info.bid)
											: price.format(lot.CurrentBid)}
									</span>
								</div>
							) : (
								<div className='bg-red-100 px-6 rounded-full text-red-600 py-3 text-center font-semibold'>
									<span>{t('lot.preBidClosed')}: </span>
									<span className='font-semibold'>
										{info?.bid
											? price.format(info.bid)
											: price.format(lot.CurrentBid)}
									</span>
								</div>
							)}
						</div>
						<div>
							{!!lot.BuyNowPrice && !isArchived && (
								<div className='bg-t-blue-light px-6 rounded-full text-white py-3 text-center font-semibold'>
									<span>{t('lot.buyNow')}: </span>
									<span className='font-semibold'>
										{price.format(lot.BuyNowPrice)}
									</span>
								</div>
							)}
						</div>
						<div>
							{!!lot.ReservePrice && !isArchived && (
								<div className='bg-t-blue-light px-6 rounded-full text-white py-3 text-center font-semibold'>
									<span>{t('lot.reservePrice')}: </span>
									<span className='font-semibold'>
										{price.format(lot.ReservePrice)}
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className='w-full py-3 px-5 bg-gray-200 rounded-2xl mt-3 flex items-center gap-3 relative max-lg:grid max-lg:grid-cols-3 max-lg:grid-rows-4 max-lg:py-1 max-sm:flex max-sm:flex-col max-sm:items-start max-sm:py-5'>
				<div>
					<p className='font-medium truncate'>{lot.VIN}</p>
					<p className='text-gray-500 text-sm'>VIN</p>
				</div>
				<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] max-lg:hidden max-lg:my-0 max-lg:h-0' />
				<div>
					<p className='font-medium'>{price.format(lot.EstimatedRepairCost)}</p>
					<p className='text-gray-500 text-sm'>
						{t('lot.header.estimatedFinalPrice')}
					</p>
				</div>
				<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] max-lg:hidden max-lg:my-0 max-lg:h-0' />
				<div>
					<p className='font-medium'>{price.format(lot.ActualCashValue)}</p>
					<p className='text-gray-500 text-sm'>
						{t('lot.header.actualCashValue')}
					</p>
				</div>
				<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] max-lg:hidden max-lg:my-0 max-lg:h-0' />
				<div>
					<div className=' font-medium flex gap-0.5 items-center '>
						{info?.title_indicator ? (
							<>
								{info?.title_indicator === 'red red' ? (
									<>
										<span
											className={`w-3 h-3 flex-shrink-0 rounded-full ${
												documentColor[
													info.title_indicator as keyof documentColor
												]
											}`}
										/>
										<span
											className={`w-3 h-3 flex-shrink-0 rounded-full ${
												documentColor[
													info.title_indicator as keyof documentColor
												]
											}`}
										/>
									</>
								) : (
									<span
										className={`w-3 h-3 flex-shrink-0 rounded-full ${
											documentColor[info.title_indicator as keyof documentColor]
										}`}
									/>
								)}
							</>
						) : (
							<span
								className={`w-3 h-3 rounded-full flex-shrink-0 bg-gray-500`}
							/>
						)}
						<p className='ml-0.5'>
							{lot.Title || t('lot.documentNameUnknown')}
						</p>
						<Link href={'/help/sales-documents'}>
							<span className='text-sm'>
								<FiExternalLink />
							</span>
						</Link>
					</div>
					<p className='text-gray-500 text-sm'>{t('lot.details.documents')}</p>
				</div>
				<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] max-lg:hidden max-lg:my-0 max-lg:h-0' />
				<div>
					<p
						className={`font-medium ${
							lot.Insurance ? 'text-green-600' : 'text-red-600'
						}`}
					>
						{lot.Insurance ? t('common.yes') : t('common.no')}
					</p>
					<p className='text-gray-500 text-sm'>
						{t('lot.details.insuranceCompany')}
					</p>
				</div>
				<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] max-lg:hidden max-lg:my-0 max-lg:h-0' />
				<div>
					<p className='font-medium truncate'>
						<span>
							{Number.isNaN(Number(lot.Odometer))
								? 0
								: odometer.format(Number(lot.Odometer))}{' '}
							miles{' '}
						</span>
						<span>
							(
							{Number.isNaN(Number(lot.Odometer))
								? 0
								: odometer.format(
										Math.round(Number(lot.Odometer) * kmInMile)
								  )}{' '}
							km)
						</span>
					</p>
					<p className='text-gray-500 text-sm'>{t('lot.details.odometer')}</p>
				</div>
				<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] max-lg:hidden max-lg:my-0 max-lg:h-0' />
				<div className='max-lg:col-span-1 max-lg:col-start-2'>
					<p className='font-medium truncate'>
						{lot.Seller || t('lot.noInformation')}
					</p>
					<p className='text-gray-500 text-sm'>{t('lot.details.seller')}</p>
				</div>
			</div>
			<LotHeaderFooter info={request} auction={lot.Auction} id={lot.U_ID} />
		</header>
	)
}

export default LotHeader
