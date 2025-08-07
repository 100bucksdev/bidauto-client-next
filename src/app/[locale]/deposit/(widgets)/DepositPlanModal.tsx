'use client'

import { useGetUserData } from '@/shared/api/User/getUserData/useGetUserData'
import { useTermsSchema } from '@/shared/hooks/ZodSchemaHooks'
import AgreeWithTerms from '@/shared/ui/AgreeWithTerms'
import Modal from '@/shared/ui/Modal'
import { zodResolver } from '@hookform/resolvers/zod'

import { useTranslations } from 'next-intl'
import { Dispatch, FC, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'

interface IDepositPlanModal {
	isVisible: boolean
	setIsVisible: Dispatch<SetStateAction<boolean>>
	checkoutLink: string
	chosenPlan: 'minimal' | 'medium' | 'maximal'
}

const DepositPlanModal: FC<IDepositPlanModal> = ({
	isVisible,
	setIsVisible,
	checkoutLink,
	chosenPlan,
}) => {
	const t = useTranslations()

	const TermsSchema = useTermsSchema()
	const {
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm<{ terms: boolean }>({
		resolver: zodResolver(TermsSchema),
	})

	const userData = useGetUserData()

	const userPlan = userData?.data?.account.plan || 'minimal'

	const plans = {
		minimal: t('plans.basic.header'),
		medium: t('plans.pro.header'),
		maximal: t('plans.enterprise.header'),
	}

	const price = {
		minimal: 1000,
		medium: userPlan === 'minimal' ? 1500 : 2500,
		maximal:
			userPlan === 'medium' ? 2500 : userPlan === 'minimal' ? 4000 : 5000,
	}

	const onSubmit = () => {
		if (checkoutLink) {
			return (window.location.href = checkoutLink)
		}

		return setIsVisible(false)
	}

	return (
		<Modal centerChildren isVisible={isVisible} setIsVisible={setIsVisible}>
			<div className='bg-white w-full text-black px-6 py-5 rounded-lg flex flex-col'>
				<div className='mb-4'>
					<div className='flex justify-center text-xl font-semibold'>
						{plans[chosenPlan]}
					</div>
					<div className='text-gray-400 flex justify-center'>
						{t('plans.modal.confirm')} {price[chosenPlan]}$
					</div>
				</div>
				<div className='mb-6 bg-gray-200 p-2 rounded-md'>
					{t('plans.modal.description')}
				</div>
				<AgreeWithTerms setValue={setValue} error={errors.terms} name='terms' />
				<div className='flex justify-between mt-4'>
					<div>
						<button
							type='button'
							onClick={() => setIsVisible(false)}
							className='bg-red-500 text-lg active:scale-95 max-md:text-base hover:bg-red-600 duration-100 text-t-text-primary rounded-md pl-3 pr-4 py-2 flex items-center gap-x-1'
						>
							<span>
								<RxCross2 />
							</span>
							<span>Cancel</span>
						</button>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className='flex justify-end'>
						<button className='bg-blue-500 text-t-text-primary px-4 py-2 hover:bg-blue-600 rounded-md text-lg active:scale-95 duration-100'>
							{t('plans.modal.continue')}
						</button>
					</form>
				</div>
			</div>
		</Modal>
	)
}

export default DepositPlanModal
