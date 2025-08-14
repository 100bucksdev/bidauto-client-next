import { IShopVehicle } from '@/types/Shop.interface'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import ConfirmReservationModal from './ConfirmReservationModal'

const ShopVehicleSidebar = ({ vehicle }: { vehicle: IShopVehicle }) => {
	const t = useTranslations()
	const { push: path } = useRouter()
	const pathname = usePathname()
	const [isVisible, setIsVisible] = useState(false)

	return (
		<>
			<div className='h-full'>
				<div className='px-4 bg-white sticky top-32 rounded-2xl py-6 border-2 border-gray-400 '>
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
					<div className='mt-5 leading-5 text-sm text-center py-2 px-4 bg-gray-300 rounded-2xl'>
						{t('shop.reservation.warning')}
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

export default ShopVehicleSidebar
