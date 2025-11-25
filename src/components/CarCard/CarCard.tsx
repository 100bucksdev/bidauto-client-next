'use client'

import { useBiddingTimeLeft } from '@/shared/hooks/useBiddingTimeLeft'
import { IcFuel, IcOdometr, IcTransmision } from '@/shared/icons'
import { auctionName } from '@/shared/utils/auctionName'
import { priceFormat } from '@/shared/utils/priceFormat'
import { TLot } from '@/types/Lot.interface'
import { AuctionImage } from '@/types/Shop.interface'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaCar } from 'react-icons/fa'
import CardPhotos from './CardPhoto'

interface SafeCarCardProps {
	lot: TLot
}

const SafeCarCard = ({ lot }: SafeCarCardProps) => {
	const t = useTranslations()
	const router = useRouter()

	const [photos, setPhotos] = useState<string[] | AuctionImage[]>(
		() => lot.link_img_small ?? []
	)

	// Безопасный price formatter
	const priceFormatter = priceFormat({ char: 'USD' })

	// Безопасная дата аукциона
	const auctionDateEnd = lot.auction_date
		? new Date(lot.auction_date)
		: new Date()
	const timeLeft = useBiddingTimeLeft(auctionDateEnd.getTime())

	// Безопасное форматирование чисел
	const formatToThousands = (num: number): string => {
		if (isNaN(num)) return '—'
		if (num < 1000) return num.toString()
		return `${Math.round(num / 1000)}k`
	}

	const lotPath = `/lot/${lot.lot_id}/${auctionName(lot.site)}/`

	return (
		<div className='w-[250px] relative bg-white rounded-xl'>
			{/* Карточка с фото или placeholder */}
			{photos.length > 0 ? (
				<div className='p-3'>
					<CardPhotos photos={photos} setPhotos={setPhotos} />
				</div>
			) : (
				<div className='w-full h-[200px] bg-gray-200 grid place-items-center rounded-xl'>
					<FaCar className='text-5xl text-gray-400' />
				</div>
			)}

			<div className='px-3 pb-2'>
				<div
					className='flex gap-1 flex-wrap text-black text-lg font-semibold hover:underline cursor-pointer'
					onClick={() => router.push(lotPath)}
				>
					<div>{lot.make || '—'}</div>
					<div className='break-all'>{lot.model || '—'}</div>
					<div>({lot.year || '—'})</div>
				</div>
				<div className='text-xs text-slate-400'>
					{timeLeft || 'Auction over'}
				</div>
			</div>

			<div className='bg-gray-300 px-3 py-2 grid grid-cols-3 text-sm'>
				<div className='flex gap-1.5 flex-col justify-center items-center'>
					<IcOdometr />
					{formatToThousands(lot.odometer || 0)} Miles
				</div>
				<div className='flex gap-1.5 flex-col justify-center items-center'>
					<IcFuel />
					{lot.fuel ? lot.fuel.split(' ')[0] : '—'}
				</div>
				<div className='flex gap-1.5 flex-col justify-center items-center'>
					<IcTransmision />
					{lot.transmission || '—'}
				</div>
			</div>

			<div className='flex items-center px-3 pb-3 pt-2'>
				<div>
					<p className='font-semibold text-lg'>
						{priceFormatter.format(Number(lot.current_bid))}
					</p>
					<p className='text-sm text-gray-400'>Price</p>
				</div>
				<button
					className='ml-auto py-1.5 px-3 bg-t-blue-light rounded-full text-white'
					onClick={() => router.push(lotPath)}
				>
					{t('lot.card.button')}
				</button>
			</div>
		</div>
	)
}

export default SafeCarCard
