'use client'

import defaultAvatar from '@/assets/images/default-user-avatar.svg'
import { IcCircleUser, IcSettings, IcShield } from '@/shared/icons'
import { priceFormat } from '@/shared/utils/priceFormat'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdExpandMore } from 'react-icons/md'

const BurgerProfileBar = () => {
	const t = useTranslations()
	const [isProfileOpen, setIsProfileOpen] = useState(false)
	const path = useRouter()
	const priceFormatter = priceFormat({ char: 'USD' })
	const user = {
		first_name: 'John',
		last_name: 'Doe',
		account: {
			bid_power: 1000,
		},
		delivery_info: {
			zip_code: '12345',
			address: '123 Main St',
			country: 'USA',
			state: 'CA',
			city: 'Los Angeles',
		},
		is_superuser: false,
		is_staff: false,
	} // This should be replaced with actual user data fetching logic

	return (
		<div className='header-burger-option relative space-x-0 flex flex-col p-0'>
			<button
				className='w-full'
				onClick={() => setIsProfileOpen(prev => !prev)}
			>
				<div
					className={`flex justify-between duration-100 px-[12px] py-[16px] ${
						isProfileOpen ? 'pb-0' : ''
					}`}
				>
					<div>
						<div className='text-start !text-[18px] !text-black'>
							{user.first_name}
						</div>
						<div className='!text-black flex flex-col items-start text-[18px]'>
							<div>{t('profile.bidPower')}:</div>
							<div>{priceFormatter.format(user.account.bid_power)}</div>
						</div>
					</div>
					<div className='flex items-center gap-[8px]'>
						<Image
							className='!w-[44px] !h-[44px] rounded-full'
							src={defaultAvatar}
							alt='avatar'
						/>
						<div
							className={`text-xl duration-150 !text-black !text-[22px] ${
								isProfileOpen ? 'rotate-180' : ''
							}`}
						>
							<MdExpandMore />
						</div>
					</div>
				</div>
			</button>

			<div
				className={`${
					isProfileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
				} relative transition-all duration-150 overflow-hidden text-lg w-full grid`}
			>
				<div className='min-h-0'>
					<div className='py-2'>
						<button
							onClick={() => path.push('/user')}
							className='text-[16px] !text-black flex items-center gap-[8px] px-[16px] pr-0 w-full py-[4px]'
						>
							<div>
								<IcCircleUser />
							</div>
							<div>{t('header.options.profile')}</div>
						</button>
						<button
							onClick={() => path.push('/settings/personal-info')}
							className='text-[16px] !text-black flex items-center gap-[8px] px-[16px] pr-0 py-[4px] w-full'
						>
							<div>
								<IcSettings />
							</div>
							<div>{t('header.options.settings')}</div>
						</button>
						{(user.is_superuser || user.is_staff) && (
							<button
								onClick={() => path.push('/admin/bids')}
								className='text-[16px] !text-black flex items-center gap-[8px] px-[16px] pr-0 py-[4px] w-full'
							>
								<div>
									<IcShield />
								</div>
								<div>{'Admin'}</div>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default BurgerProfileBar
