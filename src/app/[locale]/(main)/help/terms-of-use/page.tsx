import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
	title: 'Terms of Use',
	description: 'Terms of Use for BidAuto Online',
}

export default async function TermsOfUse() {
	const t = await getTranslations()

	return (
		<>
			<div className='w-full py-10 max-lg:w-full bg-white rounded-2xl'>
				<div className='mx-10 max-md:mx-4'>
					<div className='flex flex-col'>
						<h1 className='text-3xl font-bold mb-4'>
							{t('termsOfUse.header')}
						</h1>
						<p className='mb-4'>{t('termsOfUse.description')}</p>
						<h2 className='text-lg font-semibold mb-2'>
							1. {t('termsOfUse.definitions.header')}
						</h2>
						<p className='mb-4'>
							<span className='font-semibold'>
								{t('termsOfUse.definitions.company.header')}:
							</span>{' '}
							{t('termsOfUse.definitions.company.description')}
							<br />
							<span className='font-semibold'>
								{t('termsOfUse.definitions.user.header')}:
							</span>{' '}
							{t('termsOfUse.definitions.user.description')}
							<br />
							<span className='font-semibold'>
								{t('termsOfUse.definitions.vehicle.header')}:
							</span>{' '}
							{t('termsOfUse.definitions.vehicle.description')}
							<br />
							<span className='font-semibold'>
								{t('termsOfUse.definitions.order.header')}:
							</span>{' '}
							{t('termsOfUse.definitions.order.description')}
							<br />
							<span className='font-semibold'>
								{t('termsOfUse.definitions.website.header')}:
							</span>{' '}
							{t('termsOfUse.definitions.website.description')}
							<br />
							<span className='font-semibold'>
								{t('termsOfUse.definitions.account.header')}:
							</span>{' '}
							{t('termsOfUse.definitions.account.description')}
						</p>
						<h2 className='text-lg font-semibold mb-2'>
							2. {t('termsOfUse.generalProvisions.header')}
						</h2>
						<p className='mb-4'>
							{t('termsOfUse.generalProvisions.description')}
						</p>
						<h2 className='text-lg font-semibold mb-2'>
							3. {t('termsOfUse.membership.header')}
						</h2>
						<p className='mb-4'>{t('termsOfUse.membership.description')}</p>
						<h2 className='text-lg font-semibold mb-2'>
							4. {t('termsOfUse.servicesOffered.header')}
						</h2>
						<p className='mb-4'>
							{t('termsOfUse.servicesOffered.description')}
						</p>
						<h2 className='text-lg font-semibold mb-2'>
							5. {t('termsOfUse.vehicleConditionsAndDelivery.header')}
						</h2>
						<p className='mb-4'>
							<span className='font-semibold'>
								{t(
									'termsOfUse.vehicleConditionsAndDelivery.vehicleConditions.header'
								)}
								:
							</span>{' '}
							{t(
								'termsOfUse.vehicleConditionsAndDelivery.vehicleConditions.description'
							)}
							<br />
							<span className='font-semibold'>
								{t('termsOfUse.vehicleConditionsAndDelivery.delivery.header')}:
							</span>{' '}
							{t(
								'termsOfUse.vehicleConditionsAndDelivery.delivery.description'
							)}
							<br />
							<span className='font-semibold'>
								{t('termsOfUse.vehicleConditionsAndDelivery.support.header')}:
							</span>{' '}
							{t('termsOfUse.vehicleConditionsAndDelivery.support.description')}
						</p>
						<h2 className='text-lg font-semibold mb-2'>
							6. {t('termsOfUse.buyersResponsibilities.header')}
						</h2>
						<p className='mb-4'>
							{t('termsOfUse.buyersResponsibilities.description')}
						</p>
						<h2 className='text-lg font-semibold mb-2'>
							7. {t('termsOfUse.calculatorsAndDeposits.header')}
						</h2>
						<p className='mb-4'>
							{t('termsOfUse.calculatorsAndDeposits.description')}
						</p>
						<h2 className='text-lg font-semibold mb-2'>
							8. {t('termsOfUse.biddingAndOrders.header')}
						</h2>
						<p className='mb-4'>
							{t('termsOfUse.biddingAndOrders.description')}
						</p>
						<h2 className='text-lg font-semibold mb-2'>
							9. {t('termsOfUse.services.header')}
						</h2>
						<p className='mb-4'>{t('termsOfUse.services.description')}</p>
						<h2 className='text-lg font-semibold mb-2'>
							10. {t('termsOfUse.agreementTerms.header')}
						</h2>
						<p className='mb-4'>{t('termsOfUse.agreementTerms.description')}</p>
						<h2 className='text-lg font-semibold mb-2'>
							11. {t('termsOfUse.userContent.header')}
						</h2>
						<p className='mb-4'>{t('termsOfUse.userContent.description')}</p>
						<h2 className='text-lg font-semibold mb-2'>
							12. {t('termsOfUse.complaints.header')}
						</h2>
						<p className='mb-4'>{t('termsOfUse.complaints.description')}</p>
						<h2 className='text-lg font-semibold mb-2'>
							13. {t('termsOfUse.liability.header')}
						</h2>
						<p className='mb-4'>{t('termsOfUse.liability.description')}</p>
						<h2 className='text-lg font-semibold mb-2'>
							14. {t('termsOfUse.copyrights.header')}
						</h2>
						<p className='mb-4'>{t('termsOfUse.copyrights.description')}</p>
						<h2 className='text-lg font-semibold mb-2'>
							15. {t('termsOfUse.finalProvisions.header')}
						</h2>
						<p className='mb-4'>
							{t('termsOfUse.finalProvisions.description')}
						</p>
						<h2 className='text-lg font-semibold mb-2'>16. Deposits</h2>
						<p>
							All deposits paid through Stripe or bank transfer are
							non-refundable and collected to cover the expenses if client fails
							to pay on time for the bids and purchases made on our portal
							https://bidauto.online , unless agreed otherwise on both sides
						</p>
						<div className='mt-6'>
							<p className='font-semibold'>
								{t('termsOfUse.contactInfo.header')}:
							</p>
							<p>
								{t('termsOfUse.contactInfo.email')}: logisticstauto@gmail.com
							</p>
							<p>{t('termsOfUse.contactInfo.phone')}: +1 561 698 3669</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
