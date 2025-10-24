'use client'

import CardPhotos from '@/components/CarCard/CardPhoto'
import InsuranceBar from '@/components/SearchCard/InsuranceBar'
import { useBiddingTimeLeft } from '@/shared/hooks/useBiddingTimeLeft'
import { useBidStatuses } from '@/shared/hooks/useBidStatuses'
import { useMonths } from '@/shared/hooks/useMonths'
import { useWeekDays } from '@/shared/hooks/useWeekDays'
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

const OfferCard = ({
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
	const listOfWeekDays = useWeekDays()
	const listOfMonths = useMonths()
	const saleDate = new Date(lot.vehicle.AuctionDate)
	const timeLeft = useBiddingTimeLeft(Number(auctionDate))
	const price = priceFormat({ char: 'USD' })
	const bidStatusesLabels = useBidStatuses()
	const isArchived = lot.vehicle.Archived

	return (
		<div className='flex flex-col md:flex-row border-2 border-gray-300 rounded-2xl overflow-hidden my-4 bg-white shadow-sm hover:shadow-md transition-all duration-300'>
			{/* Левая часть — фото */}
			<div className='md:w-1/3 w-full flex items-center justify-center bg-gray-50 p-3'>
				<div className='w-full max-w-[340px] aspect-[4/3] overflow-hidden rounded-xl'>
					<CardPhotos photos={photos ?? []} setPhotos={setPhotos} />
				</div>
			</div>

			{/* Правая часть — информация */}
			<div className='flex flex-col justify-between w-full md:w-2/3 p-4'>
				{/* Верх — основная информация */}
				<div>
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
						className='flex flex-wrap text-2xl font-semibold text-start hover:underline'
					>
						{lot.vehicle.Year} {lot.vehicle.Make} {lot.vehicle.ModelGroup}
					</button>

					<div className='mt-3 grid grid-cols-2 sm:grid-cols-2 gap-y-2 text-sm text-gray-700'>
						<div>
							<b>{t('lot.details.lotId')}:</b>{' '}
							{lot.vehicle.U_ID ?? lot.vehicle.U_ID}
						</div>
						<div>
							<b>VIN:</b> {lot.vehicle.VIN}
						</div>
						<div>
							<b>{t('lot.details.odometer')}:</b>{' '}
							{odometer.format(Number(lot.vehicle.Odometer))} mi (
							{odometer.format(
								Math.round(Number(lot.vehicle.Odometer) * kmInMile)
							)}{' '}
							km)
						</div>
						<div>
							<b>{t('lot.details.location')}:</b> {lot.vehicle.LocationCity},{' '}
							{lot.vehicle.LocationState}
						</div>
						<div>
							<b>{t('lot.details.damage')}:</b> {lot.vehicle.PrimaryDamage}
						</div>
					</div>
				</div>

				{/* Средняя часть — даты и статусы */}
				<div className='flex flex-wrap items-center justify-between mt-3 gap-2 text-sm'>
					{auctionDate && (
						<div className='flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full'>
							<FiCalendar />
							<span>
								{listOfWeekDays[saleDate.getDay()]} {saleDate.getDate()}{' '}
								{listOfMonths[saleDate.getMonth()]},{' '}
								{saleDate.getHours().toString().padStart(2, '0')}:
								{saleDate.getMinutes().toString().padStart(2, '0')}
							</span>
						</div>
					)}
					{timeLeft ? (
						<span className='bg-green-100 text-green-600 px-3 py-1 rounded-full'>
							{timeLeft}
						</span>
					) : !isArchived ? (
						<span className='bg-orange-100 text-orange-500 px-3 py-1 rounded-full'>
							{t('lot.preBidClosed')}
						</span>
					) : null}
				</div>

				{/* Нижняя часть — цены, ставки и кнопки */}
				<div className='mt-3 flex flex-col sm:flex-row flex-wrap justify-between gap-2 text-sm'>
					{/* Цены */}
					<div className='flex flex-col gap-2 w-full sm:w-auto'>
						<div className='bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-center'>
							{t('lot.buyNow')}: <b>{price.format(lot.buy_now_price)}</b>
						</div>
						<div className='bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-center'>
							{t('lot.averagePrices.average')}:{' '}
							<b>{price.format(lot.average_price)}</b>
						</div>
					</div>

					{/* Пользовательская ставка */}
					{user_bid && (
						<div className='flex flex-col gap-2 w-full sm:w-auto'>
							<div className='bg-blue-500 text-white px-4 py-1 rounded-full text-center'>
								{t('lot.userBid.yourBid')}:{' '}
								<b>{price.format(user_bid.amount)}</b>
							</div>
							<div className='bg-gray-200 px-4 py-1 rounded-full text-center'>
								{t('profile.statuses.header')}:{' '}
								<b>
									{
										bidStatusesLabels[
											user_bid.user_status?.toLowerCase() as
												| 'lost'
												| 'win'
												| 'placed'
										]
									}
								</b>
							</div>
						</div>
					)}

					{/* Carfax */}
					{withCarfax && (
						<a
							target='_blank'
							href={`${process.env.VITE_REACT_APP_CLIENT_URL}/carfax?auction=${
								lot.vehicle.Auction
							}&id=${
								lot.vehicle.Auction === 'IAAI'
									? lot.vehicle.Stock
									: lot.vehicle.U_ID
							}`}
							className='bg-green-500 text-white px-4 py-1 rounded-full text-center hover:underline w-full sm:w-auto'
						>
							{t('lot.sideBar.getReports')}
						</a>
					)}
				</div>

				{/* Подвал — аукцион и страховка */}
				<div className='flex justify-between items-center mt-3 text-sm'>
					<AuctionName auction_name={lot.vehicle.Auction} />
					{lot.vehicle.Insurance && <InsuranceBar />}
				</div>
			</div>
		</div>
	)
}

export default OfferCard
