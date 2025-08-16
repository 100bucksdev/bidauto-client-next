import LotPhotos from '@/components/LotPhotos/LotPhotos'
import { ISocetLastBid, ISocetNewBid } from '@/types/Auction.interface'
import { IShopVehicle } from '@/types/Shop.interface'
import { useEffect, useState } from 'react'
import ShopVehicleDetails from '../../shop/[id]/(widgets)/ShopVehicleDetails'
import AuctionPhotos from './AuctionPhotos'
import AuctionTimer from './AuctionTimer'

const AuctionVehicleMain = ({
	vehicle,
	isAvailable,
	isConnect,
	last_bid,
	new_bid,
}: {
	vehicle: IShopVehicle
	isAvailable: boolean | null
	isConnect: boolean
	last_bid: ISocetLastBid | undefined
	new_bid: ISocetNewBid | undefined
}) => {
	const [timer, setTimer] = useState<number>(0)
	const [key, setKey] = useState<number>(0)
	const [percentage, setPercentage] = useState<number>(100)

	// // Конвертация минут в миллисекунды
	const minutesToMilliseconds = (minutes: number): number => minutes * 60 * 1000

	const gap = vehicle.auction?.gap_minutes_for_win || 1

	// Обновление таймера при изменении последней ставки
	useEffect(() => {
		if (last_bid) {
			setPercentage(last_bid.percentage)
			setTimer(minutesToMilliseconds(gap))
		} else {
			setTimer(0)
			setPercentage(0)
		}
	}, [last_bid, gap])

	// Сброс таймера при новой ставке
	useEffect(() => {
		if (new_bid) {
			setPercentage(new_bid.percentage)
			setTimer(new_bid.duration)
			setKey(prev => prev + 1)
		}
	}, [new_bid])

	return (
		<div className='flex flex-col'>
			<div className='bg-white rounded-2xl pb-8'>
				{isAvailable && isConnect ? (
					<AuctionPhotos
						imageUrls={vehicle.images.map(el => el.image_url) || []}
					/>
				) : (
					<LotPhotos
						disableFavoriteButton
						photos={vehicle.images.map(el => el.image_url) || []}
						miniaturePhotos={vehicle.images.map(el => el.small_image_url) || []}
					/>
				)}
				{isAvailable && isConnect && (
					<AuctionTimer key={key} percentage={percentage} duration={timer} />
				)}
				<div>
					<ShopVehicleDetails vehicle={vehicle} />
				</div>
			</div>
		</div>
	)
}

export default AuctionVehicleMain
