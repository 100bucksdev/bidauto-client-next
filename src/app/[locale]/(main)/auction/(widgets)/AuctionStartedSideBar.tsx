import { ISocetLastBid } from '@/types/Auction.interface'
import { IShopVehicle } from '@/types/Shop.interface'

import { useDate } from '@/shared/hooks/useDate'
import { priceFormat } from '@/shared/utils/priceFormat'
import { useTranslations } from 'next-intl'
import AuctionPlaceBidBox from './PlaceBid/AuctionPlaceBidBox'

const AuctionStartedSideBar = ({
	vehicle,
	isConnect,
	makeConn,
	last_bid,
	new_bid,
}: {
	vehicle: IShopVehicle
	isConnect: boolean
	last_bid: ISocetLastBid | undefined
	new_bid: number | undefined
	makeConn: () => void
}) => {
	const t = useTranslations()
	const { getDateWithTime } = useDate()
	const priceFormatter = priceFormat({ char: 'USD' })
	const startTime = vehicle?.auction?.start_time
		? new Date(vehicle.auction.start_time)
		: null
	const endTime = vehicle?.auction?.end_time
		? new Date(vehicle.auction.end_time)
		: null
	if (!vehicle.auction) return null
	if (!startTime) return null
	if (!endTime) return null

	return (
		<>
			<div className='h-full flex flex-col gap-5'>
				<AuctionPlaceBidBox
					vehicle={vehicle}
					isConnect={isConnect}
					makeConn={makeConn}
					last_bid={last_bid}
					new_bid={new_bid}
				/>
				<div className='bg-white sticky top-32 rounded-2xl py-3 border-2 border-gray-300 '>
					<div className='border-b-2 border-gray-400 px-4 py-2'>
						<h1 className='font-semibold text-lg'>
							{t('shop.auction.info.title')}
						</h1>
					</div>
					<div className='py-3'>
						<ul>
							<li className='mx-5 flex justify-between border-b border-gray-400'>
								<p className='opacity-75'>{t('shop.auction.info.startDate')}</p>
								<p className='font-medium'>{getDateWithTime(startTime)}</p>{' '}
							</li>
							<li className='mx-5 mt-2 flex justify-between border-b border-gray-400'>
								<p className='opacity-75'>{t('shop.auction.info.endDate')}</p>
								<p className='font-medium'>{getDateWithTime(endTime)}</p>{' '}
							</li>
							<li className='mx-5 mt-2 flex justify-between border-b border-gray-400'>
								<p className='opacity-75'>
									{t('shop.auction.info.initialPrice')}
								</p>
								<p className='font-medium'>
									{priceFormatter.format(Number(vehicle.auction.initial_price))}
								</p>{' '}
							</li>
							<li className='mx-5 mt-2 flex justify-between border-b border-gray-400'>
								<p className='opacity-75'>{t('shop.auction.info.minBid')}</p>
								<p className='font-medium'>
									{priceFormatter.format(Number(vehicle.auction.min_bid))}
								</p>{' '}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default AuctionStartedSideBar
