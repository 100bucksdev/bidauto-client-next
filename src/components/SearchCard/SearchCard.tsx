'use client'

import { getBiddingTimeLeft } from '@/shared/serverActions/getBiddingTimeLeft'
import { getBidStatuses } from '@/shared/serverActions/getBidStatus'
import { getListOfMonthes } from '@/shared/serverActions/getListOfMonthes'
import { getListOfWeekDays } from '@/shared/serverActions/getListOfWeekDays'
import AuctionName from '@/shared/ui/AuctionName'
import { kmInMile, odometer } from '@/shared/utils/odometer'
import { priceFormat } from '@/shared/utils/priceFormat'
import { TLot } from '@/types/Lot.interface'
import { AuctionImage } from '@/types/Shop.interface'
import { IUserBid } from '@/types/User.interface'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiCalendar } from 'react-icons/fi'
import CardPhotos from '../CarCard/CardPhoto'
import InsuranceBar from './InsuranceBar'

interface SearchCardProps {
	lot: TLot
	user_bid?: IUserBid
	redirectWithAuction?: boolean
	withCarfax?: boolean
}

const SearchCard = ({
	lot,
	user_bid,
	redirectWithAuction = false,
	withCarfax = false,
}: SearchCardProps) => {
	const t = useTranslations()
	const path = useRouter()
	const price = priceFormat({ char: 'USD' })
	const isArchived = lot.Archived

	const [photos, setPhotos] = useState<string[] | AuctionImage[]>([])
	const [listOfWeekDays, setListOfWeekDays] = useState<string[]>([])
	const [listOfMonths, setListOfMonths] = useState<string[]>([])
	const [timeLeft, setTimeLeft] = useState<string | false>('')

	function getSmallImages(lot: TLot): string[] {
		if (lot.VehicleImagesSmallHD?.length) {
			return lot.VehicleImagesSmallHD.map(i => i.small).filter(
				Boolean
			) as string[]
		}
		return lot.VehicleImages || []
	}

	useEffect(() => {
		setPhotos(getSmallImages(lot))
	}, [lot])

	useEffect(() => {
		async function fetchData() {
			const [weekDays, months, statuses] = await Promise.all([
				getListOfWeekDays(),
				getListOfMonthes(),
				getBidStatuses(),
			])
			setListOfWeekDays(weekDays)
			setListOfMonths(months)

			if (lot.AuctionDate) {
				const left = await getBiddingTimeLeft(
					new Date(lot.AuctionDate).getTime()
				)
				setTimeLeft(left)
			}
		}
		fetchData()
	}, [lot.AuctionDate])

	const saleDate = lot.AuctionDate ? new Date(lot.AuctionDate) : null

	return (
		<div className='flex flex-col md:flex-row border rounded-xl p-3 my-2.5 gap-3 bg-white shadow-sm'>
			{/* Фото */}
			<div className='w-full md:w-1/3 flex-shrink-0'>
				<CardPhotos photos={photos} setPhotos={setPhotos} />
			</div>

			{/* Информация */}
			<div className='flex-1 flex justify-between'>
				<section>
					{/* Заголовок */}
					<button
						onClick={() =>
							path.push(
								`/lot/${lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID}${
									redirectWithAuction ? `?auction_name=${lot.Auction}` : ''
								}`
							)
						}
						className='text-lg mt-2.5 md:text-2xl font-semibold hover:underline text-left mb-1'
					>
						{lot.Year} {lot.Make} {lot.ModelGroup}
					</button>
					{/* Основные детали */}
					<div className='text-md text-gray-600 space-y-1'>
						<div>
							<span className='font-semibold'>{t('lot.details.lotId')}: </span>
							<span className='text-black'>
								{lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID}
							</span>
						</div>
						<div className='bg-gray-500 h-[1px] w-full' />
						<div>
							<span className='font-semibold'>VIN: </span>
							<span className='text-black'>{lot.VIN}</span>
						</div>
						<div className='bg-gray-500 h-[1px] w-full' />
						<div>
							<span className='font-semibold'>
								{t('lot.details.odometer')}:{' '}
							</span>
							<span className='text-black'>
								{odometer.format(Number(lot.Odometer))} mi /{' '}
								{odometer.format(Math.round(Number(lot.Odometer) * kmInMile))}{' '}
								km
							</span>
						</div>
						<div className='bg-gray-500 h-[1px] w-full' />
						<div>
							<span className='font-semibold'>
								{t('lot.details.location')}:{' '}
							</span>
							<span className='text-black'>
								{lot.LocationCity}, {lot.LocationState}
							</span>
						</div>
						<div className='bg-gray-500 h-[1px] w-full' />
						<div>
							<span className='font-semibold'>{t('lot.details.damage')}: </span>
							<span className='text-black'>{lot.PrimaryDamage}</span>
						</div>
						<div className='bg-gray-500 h-[1px] w-full' />
					</div>
				</section>
				<section className='w-2/4'>
					{/* Время аукциона */}
					{saleDate && (
						<div className='flex items-center justify-center gap-2 mt-2 text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full w-full'>
							<FiCalendar className='text-gray-500' />
							<span>
								{listOfWeekDays[saleDate.getDay()]}
								{saleDate.getDate()}.{listOfMonths[saleDate.getMonth()]}
								{saleDate.getMonth()}.{saleDate.getFullYear()}{' '}
								{saleDate.getHours().toString().padStart(2, '0')}:
								{saleDate.getMinutes().toString().padStart(2, '0')}
							</span>
						</div>
					)}

					{/* Цена и ставки */}
					<div className='mt-2 flex flex-wrap gap-2 text-base w-full'>
						{lot.CurrentBid >= 0 && !isArchived && (
							<div className='bg-blue-100 text-center text-blue-700 px-3 py-2 w-full rounded-full'>
								{t('lot.currentBid')}:{' '}
								<span className='font-semibold'>
									{price.format(lot.CurrentBid)}
								</span>
							</div>
						)}
						{lot.BuyNowPrice && !isArchived && (
							<div className='bg-green-100 text-center text-green-700 px-3 py-2 w-full rounded-full'>
								{t('lot.buyNow')}:{' '}
								<span className='font-semibold'>
									{price.format(lot.BuyNowPrice)}
								</span>
							</div>
						)}
						{isArchived && lot.CurrentBid && (
							<div className='bg-red-100 text-center text-red-700 px-3 py-2 w-full rounded-full'>
								{t('lot.finalBid')}:{' '}
								<span className='font-semibold'>
									{price.format(lot.CurrentBid)}
								</span>
							</div>
						)}
					</div>

					{/* User Bid */}
					{user_bid && (
						<div className='mt-2 flex flex-wrap gap-2 text-base w-full'>
							<div className='bg-blue-500 text-white px-2 py-2 rounded-full w-full text-center'>
								{t('lot.userBid.yourBid')}:{' '}
								<span className='font-semibold'>
									{price.format(user_bid.amount)}
								</span>
							</div>
						</div>
					)}

					{/* Auction + Insurance */}
					<div className='mt-2 flex gap-2 justify-between items-center text-sm w-full'>
						<div className='w-full text-center'>
							<AuctionName auction_name={lot.Auction} />
						</div>

						{lot.Insurance && (
							<div className='w-full text-center'>
								{' '}
								<InsuranceBar />{' '}
							</div>
						)}
					</div>

					{/* Carfax */}
					{withCarfax && (
						<a
							target='_blank'
							href={`${process.env.NEXT_REACT_APP_CLIENT_URL}/carfax?auction=${
								lot.Auction
							}&id=${lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID}`}
							className='mt-2 inline-block w-full text-center bg-green-500 text-white py-1 rounded-full hover:underline'
						>
							{t('lot.sideBar.getReports')}
						</a>
					)}
				</section>
			</div>
		</div>
	)
}

export default SearchCard
