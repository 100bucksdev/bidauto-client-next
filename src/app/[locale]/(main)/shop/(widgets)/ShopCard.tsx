'use client'

import CardPhotos from '@/components/CarCard/CardPhoto'
import { IcFuel, IcOdometr, IcTransmision } from '@/shared/icons'
import { priceFormat } from '@/shared/utils/priceFormat'
import { AuctionImage, IShopVehicle } from '@/types/Shop.interface'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const ShopCard = ({ car }: { car: IShopVehicle }) => {
	const t = useTranslations()
	const path = useRouter()
	const [photos, setPhotos] = useState<string[] | AuctionImage[]>(car?.images)
	const priceFormatter = priceFormat({ char: 'USD' })
	// const auctionDateEnd = new Date(lot.AuctionDate);

	// const timeLeft = useBiddingTimeLeft(auctionDateEnd.getTime());

	const formatToThousands = (num: number): string => {
		if (num < 1000) return num.toString()
		return `${Math.round(num / 1000)}k`
	}

	if (!car) return
	return (
		<div className='w-[270px] relative bg-white rounded-xl'>
			<CardPhotos
				boxCl='max-xl:!w-auto max-xl:!min-h-[17vw]'
				photos={photos}
				setPhotos={setPhotos}
				loop={false}
				photoCl='max-xl:!max-h-[170px]'
			/>
			<div className='px-3 pb-2'>
				<div
					className='flex gap-1 flex-wrap text-black text-lg font-semibold hover:underline cursor-pointer'
					onClick={() => path.push(`/shop/${car.id}`)}
				>
					{car.name}
				</div>
				{/* <div className="text-xs text-slate-400">
          {timeLeft ? timeLeft : "Auction over"}
        </div> */}
			</div>
			<div className='bg-gray-300 px-3 py-2 grid grid-cols-3 text-sm'>
				<div className='flex gap-1.5 flex-col justify-center items-center'>
					<IcOdometr />
					{formatToThousands(parseInt(car.odometer.toString()))} Miles{' '}
				</div>
				<div className='flex gap-1.5 flex-col justify-center items-center'>
					<IcFuel />
					{car.fuel_type.split(' ')[0]}
				</div>
				<div className='flex gap-1.5 flex-col justify-center items-center'>
					<IcTransmision />
					{car.transmission}
				</div>
			</div>
			<div className='flex items-center px-3 pb-3 pt-2'>
				<div>
					<p className='font-semibold text-lg'>
						{car.price.prev ? (
							<div className='relative'>
								<p className='text-sm ml-2 text-gray-600 font-normal line-through'>
									{priceFormatter.format(Number(car.price.prev))}
								</p>
								<span>{priceFormatter.format(Number(car.price.last))} </span>
								<span className='text-sm text-gray-600'>
									(-{car.price.discount}%)
								</span>
							</div>
						) : car.price.last ? (
							<div className='relative'>
								<span>{priceFormatter.format(Number(car.price.last))}</span>
							</div>
						) : null}
					</p>
				</div>
				<button
					className='ml-auto py-1.5 px-3 bg-t-blue-light rounded-full text-white'
					onClick={() => path.push(`/shop/${car.id}`)}
				>
					{t('lot.card.button')}
				</button>
			</div>
		</div>
	)
}

export default ShopCard
