'use client'

import { useGetUserData } from '@/shared/api/User/getUserData/useGetUserData'
import { IcDollarCircle } from '@/shared/icons'
import Modal from '@/shared/ui/Modal'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'

const GetCarfaxReports = ({
	auction,
	lot_id,
}: {
	auction: 'COPART' | 'IAAI'
	lot_id: string
}) => {
	const path = useRouter()
	const t = useTranslations()

	const userData = useGetUserData()

	const { carfax_reports, is_superuser, is_staff } = userData.data || {}

	const isCarfaxAvailable = true
	const [isCarfaxNotAvailableModal, setIsCarfaxNotAvailableModal] =
		useState(false)

	const isAlreadyViewedCarfax =
		Array.isArray(carfax_reports) &&
		carfax_reports.includes(auction === 'IAAI' ? `1_${lot_id}` : `0_${lot_id}`)

	return (
		<>
			<div className='bg-white rounded-2xl border-2 border-gray-300 mb-4 p-4 '>
				<div className='flex justify-between items-center'>
					<div className='flex items-center gap-3 text-lg font-medium'>
						<IcDollarCircle /> {t('lot.sideBar.vehicleReports')}
					</div>
					{isCarfaxAvailable ||
					is_superuser ||
					is_staff ||
					isAlreadyViewedCarfax ? (
						<a
							className={`px-4 flex items-center gap-x-2 py-2 rounded-full hover:bg-blue-200 cursor-pointer bg-blue-100 text-t-blue-light font-medium`}
							target='_blank'
							href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/carfax/${auction}/${lot_id}/`}
						>
							<span>{t('lot.sideBar.getReports')}</span>
							{isAlreadyViewedCarfax ? (
								<div className='text-lg'>
									<IoIosCheckmarkCircleOutline />
								</div>
							) : (
								''
							)}
						</a>
					) : (
						<button
							className={`px-4 flex items-center gap-x-2 py-2 rounded-full hover:bg-blue-200 cursor-pointer bg-blue-100 text-t-blue-light font-medium`}
							onClick={() => setIsCarfaxNotAvailableModal(true)}
						>
							{' '}
							<span>{t('lot.sideBar.getReports')}</span>
							{isAlreadyViewedCarfax ? (
								<div className='text-lg'>
									<IoIosCheckmarkCircleOutline />
								</div>
							) : (
								''
							)}
						</button>
					)}
				</div>
			</div>
			{!isCarfaxAvailable && isCarfaxNotAvailableModal && (
				<Modal
					isVisible={isCarfaxNotAvailableModal}
					setIsVisible={setIsCarfaxNotAvailableModal}
					centerChildren
				>
					<div className='bg-white w-full text-black rounded-lg p-3'>
						<div className='text-xl text-center'>
							Carfax is currently unavailable, you can only view Carfaxes you
							have already viewed in your profile.
						</div>
						<div className='flex justify-between mt-4'>
							<div>
								<button
									type='button'
									onClick={() => setIsCarfaxNotAvailableModal(false)}
									className='bg-red-500 text-lg active:scale-95 hover:bg-red-600 min-w-[125px] justify-center duration-100 text-t-text-primary rounded-full pl-3 pr-4 py-2 flex items-center gap-x-1'
								>
									<span>
										<RxCross2 />
									</span>
									<span>Cancel</span>
								</button>
							</div>
							<div className='max-w-[125px] w-full'>
								<button
									type='submit'
									onClick={() => path.push('/user?category=carfax')}
									className='text-lg btn btn-success flex justify-center min-h-[44px] w-full px-6 py-2'
								>
									<div className='flex gap-x-2 items-center'>
										<span>
											<CgProfile />
										</span>
										<span>Profile</span>
									</div>
								</button>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</>
	)
}

export default GetCarfaxReports
