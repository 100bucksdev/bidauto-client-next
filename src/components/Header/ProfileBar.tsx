'use client'

import { MMenuPopUpFromBottom } from '@/assets/animation/PopUp.animation'
import defaultUserAvatar from '@/assets/images/default-user-avatar.svg'
import { useGetUserData } from '@/shared/api/User/getUserData/useGetUserData'
import { useLogout } from '@/shared/api/User/logout/useLogout'
import { useClickAway } from '@/shared/hooks/useClickAway'
import { useLocationChanged } from '@/shared/hooks/useLocationChanged'
import { IcCircleUser, IcExit, IcSettings, IcShield } from '@/shared/icons'
import { GoOutside } from '@/shared/serverActions/goOutside'
import CircleLoader from '@/shared/ui/CircleLoader'
import { priceFormat } from '@/shared/utils/priceFormat'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import { MdExpandMore } from 'react-icons/md'
const ProfileBar = () => {
	const priceFormatter = priceFormat({ char: 'USD' })
	const t = useTranslations()
	const user = useGetUserData().data
	const path = useRouter()
	const [isOpen, setIsOpen] = useState(false)
	const profileBarRef = useRef<HTMLDivElement>(null)
	const menuBarRef = useRef<HTMLDivElement>(null)
	useClickAway({
		func: () => setIsOpen(false),
		refs: [
			profileBarRef as React.RefObject<HTMLElement>,
			menuBarRef as React.RefObject<HTMLElement>,
		],
	})
	const logout = useLogout({
		options: {
			onSuccess: () => {
				localStorage.removeItem('access_token')
				localStorage.removeItem('refresh_token')
				path.push('/')
			},
		},
	})

	const isAddressAdded =
		user &&
		user.delivery_info &&
		user.delivery_info.zip_code &&
		user.delivery_info.address &&
		user.delivery_info.country &&
		user.delivery_info.state &&
		user.delivery_info.city

	useLocationChanged(() => setIsOpen(false))

	return (
		<div className='relative h-full'>
			<div
				ref={profileBarRef}
				className='flex text-gray-500 text-xl items-center cursor-pointer select-none h-full duration-150 px-[20px]'
				onClick={() => setIsOpen(prev => !prev)}
			>
				<div className='mr-5 text-lg'>
					<div className='!text-[18px] text-black max-hd:!text-[17px]'>
						{user?.first_name}
					</div>
					<div className='flex'>
						<span className='whitespace-nowrap !text-[18px] max-hd:!text-[16px]'>
							{t('profile.bidPower')}:
						</span>
						&nbsp;
						{/* space character */}
						<span className='!text-[18px] max-hd:!text-[16px]'>
							{priceFormatter.format(Number(user?.account?.bid_power))}
						</span>
					</div>
				</div>
				<div className='relative'>
					{!isAddressAdded && (
						<div className='absolute w-3 h-3 bg-orange-300 rounded-full right-0 -translate-x-2'></div>
					)}
					<Image
						className='rounded-full w-[48px] h-[48px] mr-2'
						src={defaultUserAvatar}
						alt=''
					/>
				</div>
				<div
					className={`${
						isOpen ? 'rotate-180' : 'rotate-0'
					} duration-200 text-2xl`}
				>
					<MdExpandMore />
				</div>
			</div>
			<AnimatePresence mode='wait'>
				{isOpen ? (
					<motion.div
						initial='from'
						animate='to'
						exit='from'
						variants={MMenuPopUpFromBottom}
						transition={{ duration: 0.05, type: 'keyframes' }}
						ref={menuBarRef}
						className='absolute text-black select-none w-full top-[68px] bg-white !border-solid !border-[2px] !border-t-header-bottom-border rounded-b-md text-lg shadow-2xl'
					>
						<div className='px-2 py-2 flex'>
							<div className='relative'>
								<Image
									className='rounded-full w-[48px] h-[48px] mr-2'
									src={defaultUserAvatar}
									alt=''
								/>
							</div>
							<div>
								<div>
									{user?.first_name} {user?.last_name}
								</div>
								<div className='flex'>
									<span className='whitespace-nowrap text-sm'>
										{t('profile.bidPower')}:
									</span>
									&nbsp;
									{/* space character */}
									<span className='text-sm'>
										{priceFormatter.format(
											Number(user?.account?.bid_power ?? 0)
										)}
									</span>
								</div>
							</div>
						</div>
						<hr />
						<div>
							<button
								className='!text-black !px-[12px] !py-[8px] !text-base !w-full text-start flex items-center gap-x-2 duration-150 hover:bg-gray-300'
								onClick={() => GoOutside.toUser('/profile')}
							>
								<div>
									<IcCircleUser />
								</div>
								<div>{t('header.options.profile')}</div>
							</button>
						</div>
						<div>
							<button
								className='!text-black !px-[12px] !py-[8px] !text-base !w-full text-start flex items-center gap-x-2 duration-150 hover:bg-gray-300'
								onClick={() => GoOutside.toUser('/settings/personal-info')}
							>
								<div>
									<IcSettings />
								</div>
								<div>{t('header.options.settings')}</div>
							</button>
						</div>
						{user?.is_superuser || user?.is_staff ? (
							<div>
								<button
									className='!text-black !px-[12px] !py-[8px] !text-base !w-full text-start flex items-center gap-x-2 duration-150 hover:bg-gray-300'
									onClick={() => GoOutside.toAdmin('/bids')}
								>
									<div>
										<IcShield />
									</div>
									<div>{'Admin Panel'}</div>
								</button>
							</div>
						) : (
							''
						)}
						<hr />
						<div>
							<button
								className='!text-red-500 hover:text-red-500 !px-[12px] !py-[8px] !text-base !w-full text-start flex items-center gap-x-2 duration-150 hover:bg-gray-300'
								onClick={() => logout.mutateAsync({})}
								disabled={logout.isPending}
							>
								<div className='flex items-center gap-3'>
									<div className='text-xl'>
										<IcExit />
									</div>
									<div>{t('header.logout')}</div>
								</div>
								<div>
									{logout.isPending && (
										<CircleLoader circleClassName='stroke-t-text-error' />
									)}
								</div>
							</button>
						</div>
					</motion.div>
				) : (
					''
				)}
			</AnimatePresence>
		</div>
	)
}

export default ProfileBar
