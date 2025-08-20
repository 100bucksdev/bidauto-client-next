'use client'

import mastercardImg from '@/assets/images/mastercard.png'
import stripeImg from '@/assets/images/stripe.webp'
import visaImg from '@/assets/images/visa.png'
import { useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { IoMdWarning } from 'react-icons/io'

import { useGetUserData } from '@/shared/api/User/getUserData/useGetUserData'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import DepositPlanCard from './(widgets)/card/DepositPlanCard'
import DepositPlanModal from './(widgets)/DepositPlanModal'

const DepositClientPage = () => {
	const t = useTranslations()

	const userData = useGetUserData()

	const is_email_confirmed = userData?.data?.is_email_confirmed
	const is_phone_confirmed = userData?.data?.is_phone_confirmed

	const [chosenPlan, setChosenPlan] = useState<
		'minimal' | 'medium' | 'maximal'
	>('minimal')
	const [isVisible, setIsVisible] = useState(false)
	const [checkoutLink, setCheckoutLink] = useState('')

	const path = useRouter()

	return (
		<>
			<div className='mx-auto my-10 w-full max-w-[1200px]'>
				<div className='mx-10 max-md:mx-4'>
					<div className='bg-yellow-400 rounded-t-2xl p-3 flex w-full items-center gap-x-2'>
						<span className='text-xl'>
							<IoMdWarning />
						</span>
						<span>
							Payment provider Stripe experiencing issues. We apologize if this
							caused any inconvenience. Please contact us on Telegram if you
							want to purchase a plan and start bidding.
						</span>
					</div>
					<div className='w-full mb-4 rounded-b-2xl bg-t-profile-banner-bg'>
						<div className='flex flex-col'>
							<div className='font-semibold text-3xl px-6 py-6'>
								{t('plans.header')}
							</div>
							<hr />
							<div className='my-10'>
								<div className='flex items-start justify-center flex-wrap gap-x-8 gap-y-4'>
									<DepositPlanCard
										plan='minimal'
										isDefaultDisabled={
											!is_email_confirmed || !is_phone_confirmed || false
										}
										setLink={setCheckoutLink}
										onSelect={() => {
											setIsVisible(true)
											setChosenPlan('minimal')
										}}
									/>
									<DepositPlanCard
										plan='medium'
										isDefaultDisabled={
											!is_email_confirmed || !is_phone_confirmed || false
										}
										setLink={setCheckoutLink}
										onSelect={() => {
											setIsVisible(true)
											setChosenPlan('medium')
										}}
									/>
									<DepositPlanCard
										plan='maximal'
										isDefaultDisabled={
											!is_email_confirmed || !is_phone_confirmed || false
										}
										setLink={setCheckoutLink}
										onSelect={() => {
											setIsVisible(true)
											setChosenPlan('maximal')
										}}
									/>
								</div>
								<div className='flex justify-center'>
									<div
										onClick={() => path.push('/help/deposit')}
										className='flex items-center gap-x-2 cursor-pointer mt-6 text-blue-500 hover:underline'
									>
										<span>{t('plans.more')}</span>
										<span>
											<FiExternalLink />
										</span>
									</div>
								</div>
								{!is_email_confirmed && (
									<div className='text-t-text-error mt-6 text-lg text-center'>
										{t('plans.verifyEmail')}
									</div>
								)}
								{!is_phone_confirmed && (
									<div className='text-t-text-error mt-6 text-lg text-center'>
										{t('plans.verifyPhone')}
									</div>
								)}
								<hr className='my-6' />
								<div className='flex gap-4 items-center flex-wrap justify-center px-3'>
									<Image
										draggable={false}
										className='w-32 max-md:w-20'
										src={stripeImg}
										alt='stripe'
									/>
									<Image
										draggable={false}
										className='w-32 max-md:w-20'
										src={mastercardImg}
										alt='mastercard'
									/>
									<Image
										draggable={false}
										className='w-32 max-md:w-20'
										src={visaImg}
										alt='visa'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<DepositPlanModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				checkoutLink={checkoutLink}
				chosenPlan={chosenPlan}
			/>
		</>
	)
}

export default DepositClientPage
