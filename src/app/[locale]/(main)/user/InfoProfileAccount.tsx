'use client'

import { priceFormat } from '@/shared/utils/priceFormat'
import { IUser } from '@/types/User.interface'
import { useTranslations } from 'next-intl'

const InfoProfileAccount = ({ user }: { user: IUser | undefined }) => {
	const t = useTranslations()

	const priceFormatter = priceFormat({ char: 'USD' })

	const plans = {
		no_plan: 'No',
		minimal: 'Basic',
		medium: 'Professional',
		maximal: 'Enterprise',
	}

	return (
		<div className='flex flex-col'>
			{/* <div className='text-lg font-semibold mb-1'>
				{t('profile.account.header')}:
			</div> */}
			<div>
				<div>
					{t('profile.account.plan')}:{' '}
					{(user?.account && plans[user?.account?.plan]) || 'No'}
				</div>
				<div>
					{t('profile.account.bidPower')}:{' '}
					{priceFormatter.format(user?.account?.bid_power || 0)}
				</div>
				<div>
					{t('profile.account.frozenBalance')}:{' '}
					{priceFormatter.format(user?.account?.frozen_balance || 0)}
				</div>

				{user?.carfax_account ? (
					<>
						<div>
							{t('profile.account.carfaxPackage.name')}:{' '}
							{user?.carfax_account
								? user?.carfax_account.package.plan_name
								: 'None'}
						</div>
						<div>
							{t('profile.account.carfaxPackage.left')}:{' '}
							{user?.carfax_account
								? `${user?.carfax_account.package.reports_left}/${user?.carfax_account.package.reports}`
								: 'None'}
						</div>
					</>
				) : null}
			</div>
		</div>
	)
}

export default InfoProfileAccount
