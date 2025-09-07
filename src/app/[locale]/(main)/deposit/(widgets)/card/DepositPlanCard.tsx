import { Dispatch, SetStateAction } from 'react'

import { useGetUserData } from '@/shared/api/User/getUserData/useGetUserData'
import { currencyStore } from '@/store/currency.store'
import { TDepositPlans } from '@/types/DepositPlans.type'
import { TUserDepositPlans } from '@/types/UserPlans.type'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

const DepositPlanCard = ({
	plan,
	isDefaultDisabled = false,
}: /* setLink, */
/* onSelect, */
{
	plan: 'minimal' | 'medium' | 'maximal'
	onSelect?: () => void
	setLink?: Dispatch<SetStateAction<string>>
	isDefaultDisabled?: boolean
}) => {
	const t = useTranslations()
	const path = useRouter()
	const toEuro = currencyStore(state => state.eurCurrency)

	const userData = useGetUserData()

	const userPlan = userData?.data?.account.plan || 'minimal'
	const userBidPower = userData?.data?.account.bid_power || 0

	/* const paymentCheckout = usePaymentCheckout({ setLink }) */

	const bidUp = {
		minimal: t('plans.basic.bidUp'),
		medium: t('plans.pro.bidUp'),
		maximal: t('plans.enterprise.bidUp'),
	}

	const plans: Record<'minimal' | 'medium' | 'maximal', string> = {
		minimal: t('plans.basic.header'),
		medium: t('plans.pro.header'),
		maximal: t('plans.enterprise.header'),
	}

	const descriptions = {
		minimal: t('plans.basic.description'),
		medium: t('plans.pro.description'),
		maximal: t('plans.enterprise.description'),
	}

	const price = {
		minimal: 1000,
		medium: userPlan === 'minimal' ? 1500 : 2500,
		maximal:
			userPlan === 'medium' ? 2500 : userPlan === 'minimal' ? 4000 : 5000,
	}

	const bidding_power = {
		minimal: '10,000$',
		medium: '50,000$',
		maximal: '200,000$',
	}

	const isDisabled = (
		userPlan: TUserDepositPlans,
		userBidPower: number,
		checkedPlan: TDepositPlans
	) => {
		if (userPlan === 'maximal') {
			if (userBidPower > 1000) {
				return true
			}
			return false
		}

		return (
			['minimal', 'medium', 'maximal'].indexOf(checkedPlan) <=
			['minimal', 'medium', 'maximal'].indexOf(userPlan)
		)
	}

	const isDisabledValue = isDisabled(userPlan, userBidPower, plan)

	return (
		<div
			className={`border border-zinc-300 w-52 text-center bg-white py-2 rounded-2xl min-w-72`}
		>
			<div className='flex flex-col'>
				<div className='text-center py-2 font-semibold text-lg'>
					<div>{plans[plan]}</div>
					<div className='text-zinc-500'>{descriptions[plan]}</div>
				</div>
				<hr className='border-t-[2px] border-b-zinc-300 my-2' />
				<div className='px-5 py-4'>
					<div className='flex justify-center flex-col items-center'>
						<div>{t('plans.biddingPower')}:</div>
						<div className='text-2xl text-purple-700 font-semibold'>
							{bidding_power[plan]}
						</div>
					</div>
					<div className='flex mt-5 justify-center flex-col items-center'>
						<div>{bidUp[plan]}</div>
					</div>
					<div className='flex justify-center mt-5 flex-col items-center'>
						<div>{t('plans.cost')}:</div>
						<div className='text-xl text-purple-700 font-semibold'>
							{`${price[plan]} USD`} /{' '}
							{`${Math.ceil(price[plan] * toEuro)} EUR`}
						</div>
					</div>
				</div>
				<hr className='border-t-[2px] border-b-zinc-300 my-2' />
				<div className='px-4 py-2'>
					<button
						onClick={() => path.push('/contact')}
						disabled={isDisabledValue || isDefaultDisabled}
						className={`${
							isDisabledValue || isDefaultDisabled
								? ''
								: `btn btn-primary w-full py-2 flex justify-center`
						}`}
					>
						{t('plans.select')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default DepositPlanCard
