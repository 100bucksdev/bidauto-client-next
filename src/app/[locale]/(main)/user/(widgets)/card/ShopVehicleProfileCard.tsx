'use client'

import CardPhotos from '@/components/CarCard/CardPhoto'
import { shopVehicleDeliverStatuses } from '@/shared/constants/constants'
import { kmInMile, odometer } from '@/shared/utils/odometer'
import { priceFormat } from '@/shared/utils/priceFormat'
import { AuctionImage, IShopVehicle } from '@/types/Shop.interface'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const ShopVehicleProfileCard = ({ vehicle }: { vehicle: IShopVehicle }) => {
	const t = useTranslations()
	const { push: path } = useRouter()

	const [photos, setPhotos] = useState<string[] | AuctionImage[]>(
		vehicle.images.map(el => el.image_url)
	)

	const priceFormatter = priceFormat({ char: 'USD' })

	return (
		<>
			<div
				className={
					'flex max-xl:block items-center py-3 px-2 border-2 border-gray-400 rounded-2xl'
				}
			>
				<div className='max-2xl:flex max-2xl:justify-center'>
					<div className={'max-2xl:mb-3 w-full'}>
						<CardPhotos photos={photos} setPhotos={setPhotos} />
					</div>
				</div>
				<div className='flex max-md:flex-col w-full'>
					<div className='px-3 max-md:px-0 max-md:w-full 2xl:w-[60%] lg:w-[60%] max-lg:w-[50%] mt-3 max-md:mb-3 max-md:pb-3'>
						<div className='flex gap-x-5 justify-between items-start'>
							<button
								onClick={() => path(`/shop/${vehicle.id}`)}
								className='flex gap-1 hover:underline text-2xl text-start font-semibold flex-wrap'
							>
								<div>{vehicle.name}</div>
							</button>
						</div>
						<div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>VIN: </span>
									<span className='font-medium'>{vehicle.vin}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.odometer')}: </span>
									<span className='font-medium'>
										{odometer.format(Number(vehicle.odometer))} miles
									</span>
									<span className='font-medium'>{` (${odometer.format(
										Math.round(Number(vehicle.odometer) * kmInMile)
									)} km)`}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('profile.vehicle.damage.primary')}: </span>
									<span className='font-medium'>{vehicle.primary_damage}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('profile.vehicle.damage.secondary')}: </span>
									<span className='font-medium'>
										{vehicle.secondary_damage}
									</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.engine')}: </span>
									<span className='font-medium'>{vehicle.engine}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.fuel')}: </span>
									<span className='font-medium'>{vehicle.fuel_type}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.transmission')}: </span>
									<span className='font-medium'>{vehicle.transmission}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
						</div>
					</div>
					<div className='2xl:w-[40%] max-lg:w-[50%] max-md:w-full lg:w-[40%] xl:w-[50%] px-3 justify-items-end flex flex-col mt-5'>
						<div className='bg-gray-200 rounded-full w-full p-2 flex justify-center'>
							{vehicle.delivery_state === 'won_in_auction'
								? priceFormatter.format(Number(vehicle.auction?.won_bid))
								: priceFormatter.format(Number(vehicle.price.last))}
						</div>
						<div className='bg-blue-500 flex justify-center rounded-full w-full p-2 text-t-text-primary mt-2'>
							{shopVehicleDeliverStatuses[vehicle.delivery_state]}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ShopVehicleProfileCard
