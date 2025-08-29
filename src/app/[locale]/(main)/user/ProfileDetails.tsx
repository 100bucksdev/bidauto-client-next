'use client'

import { useGetUserData } from '@/shared/api/User/getUserData/useGetUserData'
import { patchVerifyUserPhone } from '@/shared/api/User/patchVerifyUserPhone/patchVerifyUserPhone'
import { IcMail, IcPhone } from '@/shared/icons'
import { IUser } from '@/types/User.interface'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { RxCrossCircled } from 'react-icons/rx'

const ProfileDetails = ({
	user,
	refetch,
}: {
	user: IUser | undefined
	refetch: () => void
}) => {
	// const { t } = useTranslation()
	const currentUser = useGetUserData()
	const VerifyPhone = () => {
		patchVerifyUserPhone({ params: { id: user?.id } }).finally(() => {
			refetch()
		})
	}

	return (
		<div className='flex flex-col'>
			{/* <div className='text-lg font-semibold mb-1'>
				{t('profile.details.header')}:
			</div> */}
			<div>
				<div className='flex items-center justify-between'>
					<div className='mr-2 flex items-center gap-1'>
						{/* {t('profile.details.email')}: */}
						<IcMail /> {user?.email}
					</div>
					{user?.is_email_confirmed ? (
						<div className='text-xl text-green-600'>
							<IoIosCheckmarkCircleOutline />
						</div>
					) : (
						<div title='Email is not verified' className='text-xl text-red-600'>
							<RxCrossCircled />
						</div>
					)}
				</div>
				<div className='flex items-center justify-between'>
					<div className='mr-2 flex items-center gap-1'>
						{/* {t('profile.details.phone')}: */}
						<IcPhone width='23' height='22' /> {user?.phone_number}
					</div>
					{user?.is_phone_confirmed ? (
						<div className='text-xl text-green-600'>
							<IoIosCheckmarkCircleOutline />
						</div>
					) : (
						<div className='flex items-center gap-2'>
							<div
								title='Phone is not verified'
								className='text-xl text-red-600'
							>
								<RxCrossCircled />
							</div>
							{(currentUser?.data?.id !== user?.id &&
								currentUser?.data?.is_staff) ||
							currentUser.data?.is_superuser ? (
								<div>
									<button
										className='btn px-2.5 py-1 text-white bg-t-blue-light'
										onClick={() => VerifyPhone()}
										title='Verify customer phone'
									>
										Verify
									</button>
								</div>
							) : null}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProfileDetails
