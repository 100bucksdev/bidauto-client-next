import { IcArrowRight } from '@/shared/icons'
import { kmInMile, odometer } from '@/shared/utils/odometer'
import { priceFormat } from '@/shared/utils/priceFormat'
import { IShopVehicle } from '@/types/Shop.interface'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
const ShopVehicleHeader = ({ vehicle }: { vehicle: IShopVehicle }) => {
	const t = useTranslations()
	const { push: path } = useRouter()
	const priceFormatter = priceFormat({ char: 'USD' })

	return (
		<header className='border-2 border-gray-300 rounded-2xl p-4'>
			<div className='flex max-lg:block max-sm:block'>
				<div>
					<div className='flex gap-3 max-sm:block'>
						<div
							className='p-2 max-sm:mb-5 bg-gray-200 flex justify-center items-center rounded-full cursor-pointer hover:bg-gray-100 saturate-150 transition-all'
							onClick={() => path('/shop')}
						>
							<IcArrowRight width='20' height='20' />
						</div>
					</div>
					<h1 className='flex gap-7 font-bold text-3xl mt-5 ml-1 items-center'>
						<div>{vehicle.name}</div>
					</h1>
				</div>
				<div className='flex flex-col gap-3 ml-auto'>
					<div className='ml-auto flex flex-col gap-3'>
						{vehicle.price.last ? (
							<div className='h-10 w-full text-center justify-center items-center font-medium text-xl px-6 py-2 bg-blue-200 rounded-full text-t-blue-light'>
								{priceFormatter.format(Number(vehicle.price.last))}
							</div>
						) : null}
					</div>
					<div className='ml-auto flex flex-col gap-3'>
						{!!vehicle.price.prev && (
							<>
								<div className='text-gray-500 text-lg relative'>
									<span>
										{priceFormatter.format(Number(vehicle.price.prev))}
									</span>
									<span className='h-[2px] bg-gray-500 -translate-y-[14px] block absolute w-full'></span>
								</div>
								<div className='absolute text-[12px] flex justify-center items-center bg-red-500 text-t-text-primary rounded-xl px-2 p-[2px] -left-10 -top-2'>
									-{vehicle.price.discount}%
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<div className='w-full py-3 px-5 bg-gray-200 rounded-2xl mt-3 flex items-center gap-3 relative max-lg:grid max-lg:grid-cols-3 max-lg:grid-rows-4 max-lg:py-1 max-sm:flex max-sm:flex-col max-sm:items-start max-sm:py-5'>
				<div>
					<p className='font-medium truncate'>{vehicle.vin}</p>
					<p className='text-gray-500 text-sm'>VIN</p>
				</div>
				<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] max-lg:hidden max-lg:my-0 max-lg:h-0' />
				<div className='max-w-52'>
					<p className='font-medium truncate'>{vehicle.primary_damage}</p>
					<p className='text-gray-500 text-sm'>
						{t('lot.details.primaryDamage')}
					</p>
				</div>
				<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] max-lg:hidden max-lg:my-0 max-lg:h-0' />
				<div className='max-w-48'>
					<p className='font-medium truncate'>{vehicle.secondary_damage}</p>
					<p className='text-gray-500 text-sm'>
						{t('lot.details.secondaryDamage')}
					</p>
				</div>
				<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] max-lg:hidden max-lg:my-0 max-lg:h-0' />
				<div>
					<p className='font-medium truncate'>
						{!Number.isNaN(Number(vehicle.odometer)) && (
							<div>
								<span className='mr-1'>
									{odometer.format(Number(vehicle.odometer))}
								</span>
								<span>{`(${odometer.format(
									Math.round(Number(vehicle.odometer) * kmInMile)
								)} km)`}</span>
							</div>
						)}
					</p>
					<p className='text-gray-500 text-sm'>{t('lot.details.odometer')}</p>
				</div>
				<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] max-lg:hidden max-lg:my-0 max-lg:h-0' />
				<div>
					<p className='font-medium truncate'>{vehicle.keys ? 'Yes' : 'No'}</p>
					<p className='text-gray-500 text-sm'>{t('lot.details.keys')}</p>
				</div>
				<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] max-lg:hidden max-lg:my-0 max-lg:h-0' />
				<div>
					<p className='font-medium truncate'>{vehicle.engine}</p>
					<p className='text-gray-500 text-sm'>{t('lot.details.engine')}</p>
				</div>
				<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] max-lg:hidden max-lg:my-0 max-lg:h-0' />
				<div>
					<p className='font-medium truncate'>{vehicle.fuel_type}</p>
					<p className='text-gray-500 text-sm'>{t('lot.details.fuel')}</p>
				</div>
				<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] max-lg:hidden max-lg:my-0 max-lg:h-0' />
				<div>
					<p className='font-medium truncate'>{vehicle.transmission}</p>
					<p className='text-gray-500 text-sm'>
						{t('lot.details.transmission')}
					</p>
				</div>
			</div>
		</header>
	)
}

export default ShopVehicleHeader
