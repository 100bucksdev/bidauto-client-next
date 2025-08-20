import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
	title: 'Deposit',
}

export default async function Deposit() {
	const t = await getTranslations()

	return (
		<>
			<div className='w-full max-lg:w-full bg-white rounded-2xl'>
				<div className='py-3'>
					<div className='flex items-center justify-around w-full px-5 py-2'>
						<h2 className='font-semibold text-lg w-4/12'>
							{t('help.deposit.basicPlan.header')}
						</h2>
						<p className='w-8/12'>{t('help.deposit.basicPlan.description')}</p>
					</div>
					<hr className='mb-3 mt-5' />
					<div className='flex items-center justify-around w-full px-5 py-2'>
						<h2 className='font-semibold text-lg w-4/12'>
							{t('help.deposit.professionalPlan.header')}
						</h2>
						<p className='w-8/12'>
							{t('help.deposit.professionalPlan.description')}
						</p>
					</div>
					<hr className='mb-3 mt-5' />
					<div className='flex items-center justify-around w-full px-5 py-2'>
						<h2 className='font-semibold text-lg w-4/12'>
							{t('help.deposit.enterprisePlan.header')}
						</h2>
						<p className='w-8/12'>
							{t('help.deposit.enterprisePlan.description')}
						</p>
					</div>

					<p className='bg-blue-500 text-t-text-primary px-3 py-4'>
						<span className='font-semibold'>
							{t('help.deposit.note.header')}{' '}
						</span>
						{t('help.deposit.note.description')}
					</p>
					<hr className='mb-3' />
					<p className='px-4'>
						<div className='font-semibold text-lg mb-1'>
							{t('help.deposit.goodNews.header')}
						</div>
						{t('help.deposit.goodNews.description')}
					</p>
				</div>
			</div>
		</>
	)
}

export const dynamic = 'force-static'
