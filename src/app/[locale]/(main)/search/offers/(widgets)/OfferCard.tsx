'use client'

import CardPhotos from '@/components/CarCard/CardPhoto'
import InsuranceBar from '@/components/SearchCard/InsuranceBar'
import { getBiddingTimeLeft } from '@/shared/serverActions/getBiddingTimeLeft'
import { getBidStatuses } from '@/shared/serverActions/getBidStatus'
import { getListOfMonthes } from '@/shared/serverActions/getListOfMonthes'
import { getListOfWeekDays } from '@/shared/serverActions/getListOfWeekDays'
import AuctionName from '@/shared/ui/AuctionName'
import { kmInMile, odometer } from '@/shared/utils/odometer'
import { priceFormat } from '@/shared/utils/priceFormat'
import { TLot } from '@/types/Lot.interface'
import { IOffers } from '@/types/Offers.interface'
import { AuctionImage } from '@/types/Shop.interface'
import { IUserBid } from '@/types/User.interface'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { FiCalendar } from 'react-icons/fi'

const OfferCard = async ({
	lot,
	redirectWithAuction = false,
	withCarfax = false,
	user_bid,
}: {
	lot: IOffers
	user_bid?: IUserBid
	redirectWithAuction?: boolean
	withCarfax?: boolean
}) => {
	function getSmallImages(lot: TLot): string[] | undefined {
		if (lot.VehicleImagesSmallHD && lot.VehicleImagesSmallHD.length > 0) {
			return lot.VehicleImagesSmallHD.map(image => image.small).filter(
				(small): small is string => small !== undefined
			)
		}
		return lot.VehicleImages || undefined
	}

	const img = getSmallImages(lot.vehicle)

	const t = useTranslations()
	const path = useRouter()
	const [photos, setPhotos] = useState<string[] | AuctionImage[]>(img ?? [])

	useEffect(() => {
		setPhotos(img ?? [])
	}, [lot.vehicle])

	const auctionDate = lot.vehicle.AuctionDate
	const listOfWeekDays = await getListOfWeekDays()
	const listOfMonths = await getListOfMonthes()
	const saleDate = new Date(lot.vehicle.AuctionDate)
	const timeLeft = await getBiddingTimeLeft(saleDate.getTime())

	const price = priceFormat({ char: 'USD' })

	const bidStatusesLabels = await getBidStatuses()

	const isArchived = lot.vehicle.Archived

	return (
		<>
			<div
				className={
					'flex max-xl:block border-2 border-gray-400 rounded-2xl my-2.5 p-2'
				}
			>
				<div className='max-2xl:flex max-2xl:justify-center'>
					<div className={'max-2xl:mb-3 w-full'}>
						<CardPhotos photos={photos ?? []} setPhotos={setPhotos} />
					</div>
				</div>
				<div className='flex max-md:flex-col w-full'>
					<div className='px-3 max-md:px-0 max-md:w-full 2xl:w-[60%] lg:w-[60%] max-lg:w-[50%] mt-3 max-md:mb-3 max-md:pb-3'>
						<div className='flex gap-x-5 justify-between items-start'>
							<button
								onClick={() =>
									path.push(
										`/lot/${
											lot.vehicle.Auction === 'IAAI'
												? lot.vehicle.Stock
												: lot.vehicle.U_ID
										}${
											redirectWithAuction
												? `/${lot.vehicle.Auction.toUpperCase()}`
												: ''
										}`
									)
								}
								className='flex gap-1 hover:underline text-2xl text-start font-semibold flex-wrap'
							>
								<div>{lot.vehicle.Year}</div>
								<div>{lot.vehicle.Make}</div>
								<div>{lot.vehicle.ModelGroup}</div>
							</button>
						</div>
						<div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.lotId')}: </span>
									<span className='font-medium'>
										{lot.vehicle.Auction === 'IAAI'
											? lot.vehicle.Stock
											: lot.vehicle.U_ID}
									</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>VIN: </span>
									<span className='font-medium'>{lot.vehicle.VIN}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.odometer')}: </span>
									<span className='font-medium'>
										{odometer.format(Number(lot.vehicle.Odometer))} miles{' '}
									</span>
									<span className='font-medium'>
										{`(${odometer.format(
											Math.round(Number(lot.vehicle.Odometer) * kmInMile)
										)} km)`}
									</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.location')}: </span>
									<span className='font-medium'>
										{lot.vehicle.LocationCity} {lot.vehicle.LocationState}
									</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.damage')}: </span>
									<span className='font-medium'>
										{lot.vehicle.PrimaryDamage}
									</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
						</div>
					</div>
					<div className='2xl:w-[40%] max-lg:w-[50%] max-md:w-full lg:w-[40%] xl:w-[50%] px-3 justify-items-end flex flex-col'>
						<div className='flex max-sm:flex-col items-center gap-2 max-md:gap-1 mb-2 justify-end w-full text-center'>
							{auctionDate ? (
								<div className='flex items-center justify-center bg-gray-200 py-1.5 px-2 rounded-full gap-x-2 my-2 w-auto max-sm:w-full text-center'>
									<span>
										<FiCalendar />
									</span>
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
							) : (
								''
							)}
							<div className='w-auto max-sm:w-full'>
								{timeLeft ? (
									<span className='flex justify-center py-1 px-3 rounded-full bg-green-100 text-green-500 w-full text-center'>
										{timeLeft}
									</span>
								) : !isArchived ? (
									<span className='text-orange-500 bg-orange-200 py-1 px-3 rounded-full flex justify-center w-full text-center'>
										{t('lot.preBidClosed')}
									</span>
								) : (
									''
								)}
							</div>
						</div>

						<div className='flex flex-col gap-3'>
							{lot.buy_now_price >= 0 ? (
								<div className='w-full bg-blue-200 text-t-blue-light flex flex-wrap justify-center gap-x-2 py-1.5 px-3 rounded-full'>
									<span>{t('lot.buyNow')}:</span>
									<span className='font-semibold'>
										{`${price.format(lot.buy_now_price)}`}
									</span>
								</div>
							) : (
								<div className='w-full text-red-500 bg-red-200 flex justify-center py-1.5 px-2 rounded-full font-semibold'>
									No price
								</div>
							)}
							{lot.average_price >= 0 ? (
								<div className='w-full bg-blue-200 text-t-blue-light flex flex-wrap justify-center gap-x-2 py-1.5 px-3 rounded-full'>
									<span>{t('lot.averagePrices.average')}:</span>
									<span className='font-semibold'>
										{`${price.format(lot.average_price)}`}
									</span>
								</div>
							) : (
								<div className='w-full text-red-500 bg-red-200 flex justify-center py-1.5 px-2 rounded-full font-semibold'>
									No price
								</div>
							)}
						</div>

						{!user_bid ? (
							''
						) : (
							<>
								<div className='w-full bg-blue-500 flex-wrap text-t-text-primary flex items-center gap-x-2 justify-center py-1.5 px-2 rounded-full mt-2'>
									<span>{t('lot.userBid.yourBid')}:</span>
									<span className='font-semibold'>
										{price.format(user_bid.amount)}
									</span>
								</div>
								<div className='w-full bg-gray-200 flex items-center gap-x-2 justify-center py-1.5 px-2 rounded-full mt-2'>
									<span>{t('profile.statuses.header')}:</span>
									<span className='font-semibold'>
										{
											bidStatusesLabels[
												user_bid.user_status?.toLowerCase() as
													| 'lost'
													| 'win'
													| 'placed'
											]
										}
									</span>
								</div>
							</>
						)}
						{withCarfax ? (
							<a
								target='_blank'
								href={`${
									process.env.VITE_REACT_APP_CLIENT_URL
								}/carfax?auction=${lot.vehicle.Auction}&id=${
									lot.vehicle.Auction === 'IAAI'
										? lot.vehicle.Stock
										: lot.vehicle.U_ID
								}`}
								className='px-2 py-1.5 w-full flex mt-2 items-end justify-center bg-green-500 text-t-text-primary rounded-full hover:underline cursor-pointer'
							>
								<span>{t('lot.sideBar.getReports')}</span>
							</a>
						) : (
							''
						)}

						<div className='flex items-center justify-end mt-2 gap-2 w-full'>
							<div className='w-full text-center'>
								<AuctionName auction_name={lot.vehicle.Auction} />
							</div>
							<div className='w-full text-center'>
								{lot.vehicle.Insurance ? <InsuranceBar /> : ''}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default OfferCard
