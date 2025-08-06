'use client'

import { useBiddingTimeLeft } from '@/shared/hooks/useBiddingTimeLeft'
import { IcFuel, IcOdometr, IcTransmision } from '@/shared/icons'
import { TLot } from '@/shared/types/Lot.interface'
import { AuctionImage } from '@/shared/types/Shop.interface'
import { priceFormat } from '@/shared/utils/priceFormat'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CardPhotos from './CardPhoto'

const CarCard = ({ lot }: { lot: TLot }) => {
	const t = useTranslations()

	function getSmallImages(lot: TLot): string[] | undefined {
		if (lot.VehicleImagesSmallHD && lot.VehicleImagesSmallHD.length > 0) {
			return lot.VehicleImagesSmallHD.map(image => image.small).filter(
				(small): small is string => small !== undefined
			)
		}
		return lot.VehicleImages || undefined
	}

	const img = getSmallImages(lot)

	const path = useRouter()
	const [photos, setPhotos] = useState<string[] | AuctionImage[]>(img ?? [])
	const price = priceFormat({ char: 'USD' })
	const auctionDateEnd = new Date(lot.AuctionDate)

	const timeLeft = useBiddingTimeLeft(auctionDateEnd.getTime())

	const formatToThousands = (num: number): string => {
		if (num < 1000) return num.toString()
		return `${Math.round(num / 1000)}k`
	}

	return (
		<div className='w-[250px] relative bg-white rounded-xl'>
			<CardPhotos photos={photos} setPhotos={setPhotos} />
			<div className='px-3 pb-2'>
				<div
					className='flex gap-1 flex-wrap text-black text-lg font-semibold hover:underline cursor-pointer'
					onClick={() =>
						path.push(
							`/lot/${
								lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID
							}?auction_name=${lot.Auction}`
						)
					}
				>
					<div>{lot.Make}</div>
					<div className='break-all'>{lot.ModelGroup}</div>
					<div>({lot.Year})</div>
				</div>
				<div className='text-xs text-slate-400'>
					{timeLeft ? timeLeft : 'Auction over'}
				</div>
			</div>
			<div className='bg-gray-300 px-3 py-2 grid grid-cols-3 text-sm'>
				<div className='flex gap-1.5 flex-col justify-center items-center'>
					<IcOdometr />
					{formatToThousands(parseInt(lot.Odometer))} Miles{' '}
				</div>
				<div className='flex gap-1.5 flex-col justify-center items-center'>
					<IcFuel />
					{lot.FuelType.split(' ')[0]}
				</div>
				<div className='flex gap-1.5 flex-col justify-center items-center'>
					<IcTransmision />
					{lot.Transmission}
				</div>
			</div>
			<div className='flex items-center px-3 pb-3 pt-2'>
				<div>
					<p className='font-semibold text-lg'>
						{price.format(lot.CurrentBid)}
					</p>
					<p className='text-sm text-gray-400'>Price</p>
				</div>
				<button
					className='ml-auto py-1.5 px-3 bg-t-blue-light rounded-full text-white'
					onClick={() =>
						path.push(
							`/lot/${
								lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID
							}?auction_name=${lot.Auction}`
						)
					}
				>
					{t('lot.card.button')}
				</button>
			</div>
		</div>
	)
}

export default CarCard
