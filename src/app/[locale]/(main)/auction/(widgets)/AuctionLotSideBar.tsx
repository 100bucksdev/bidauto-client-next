import { useDate } from '@/shared/hooks/useDate'
import { priceFormat } from '@/shared/utils/priceFormat'
import { IShopVehicle } from '@/types/Shop.interface'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import ConfirmReservationModal from '../../shop/[id]/(widgets)/ConfirmReservationModal'

const AuctionLotSidebar = ({ vehicle }: { vehicle: IShopVehicle }) => {
	const t = useTranslations()
	const { getDateWithTime } = useDate()
	const { push: path } = useRouter()
	const pathname = usePathname()
	const [isVisible, setIsVisible] = useState(false)
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
			<div className='h-full'>
				{vehicle.purchase_mode === 'combined' ? (
					<div className='px-4 bg-white sticky mb-5 top-32 rounded-2xl py-6 border-2 border-gray-400 '>
						<div className='flex justify-center'>
							{vehicle.buyer ? (
								<div className='border-2 border-red-600 text-red-600 rounded-md w-full py-2 text-xl text-center font-semibold'>
									Sold
								</div>
							) : localStorage.getItem('access') ? (
								<button
									onClick={() => setIsVisible(true)}
									className='btn btn-primary py-2 w-full text-lg'
								>
									{t('shop.reservation.makeReservation')}
								</button>
							) : (
								<button
									onClick={() => path(`/login?callbackUrl=${pathname}`)}
									className='btn btn-primary py-2 w-full text-lg'
								>
									{t('shop.reservation.loginToReservation')}
								</button>
							)}
						</div>
					</div>
				) : null}

				<div className='bg-white sticky top-32 rounded-2xl py-3 border-2 border-gray-400 '>
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
			{isVisible && (
				<ConfirmReservationModal
					isVisible={isVisible}
					setIsVisible={setIsVisible}
					id={vehicle.id}
				/>
			)}
		</>
	)
}

export default AuctionLotSidebar
