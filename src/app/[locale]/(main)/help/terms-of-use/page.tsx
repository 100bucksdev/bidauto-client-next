import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
	title: 'Terms and Conditions / Legal Disclaimer',
	description: 'Terms and Conditions for BidAuto.online',
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
						<p className='mb-6'>{t('termsOfUse.description')}</p>

						{/* 1. Broker Role */}
						<h2 className='text-lg font-semibold mb-2'>
							1. {t('termsOfUse.brokerRole.header')}
						</h2>
						<p className='mb-4'>{t('termsOfUse.brokerRole.description')}</p>
						<p className='mb-4'>
							{t('termsOfUse.brokerRole.details.nonOwnership')}
						</p>
						<p className='mb-4 font-semibold'>
							{t('termsOfUse.brokerRole.details.services.header')}:
						</p>
						<ul className='list-disc ml-6 mb-4'>
							<li>{t('termsOfUse.brokerRole.details.services.list.0')}</li>
							<li>{t('termsOfUse.brokerRole.details.services.list.1')}</li>
							<li>{t('termsOfUse.brokerRole.details.services.list.2')}</li>
							<li>{t('termsOfUse.brokerRole.details.services.list.3')}</li>
						</ul>
						<p className='mb-4'>
							{t('termsOfUse.brokerRole.details.legalBasis')}
						</p>
						<p className='mb-6'>
							{t('termsOfUse.brokerRole.details.responsibility')}
						</p>

						{/* 2. Limitations of Liability */}
						<h2 className='text-lg font-semibold mb-2'>
							2. {t('termsOfUse.limitationsOfLiability.header')}
						</h2>

						{/* 2.1 */}
						<h3 className='font-semibold mb-2'>
							{t('termsOfUse.limitationsOfLiability.asIsCondition.header')}
						</h3>
						<p className='mb-4'>
							{t('termsOfUse.limitationsOfLiability.asIsCondition.description')}
						</p>
						<p className='mb-4'>
							{t('termsOfUse.limitationsOfLiability.asIsCondition.disclaimer')}
						</p>
						<p className='font-semibold mb-2'>
							{t(
								'termsOfUse.limitationsOfLiability.asIsCondition.buyerAcknowledgment.header'
							)}
						</p>
						<ul className='list-disc ml-6 mb-6'>
							<li>
								{t(
									'termsOfUse.limitationsOfLiability.asIsCondition.buyerAcknowledgment.list.0'
								)}
							</li>
							<li>
								{t(
									'termsOfUse.limitationsOfLiability.asIsCondition.buyerAcknowledgment.list.1'
								)}
							</li>
							<li>
								{t(
									'termsOfUse.limitationsOfLiability.asIsCondition.buyerAcknowledgment.list.2'
								)}
							</li>
						</ul>

						{/* 2.2 */}
						<h3 className='font-semibold mb-2'>
							{t(
								'termsOfUse.limitationsOfLiability.titleAndDocumentation.header'
							)}
						</h3>
						<p className='mb-4'>
							{t(
								'termsOfUse.limitationsOfLiability.titleAndDocumentation.description'
							)}
						</p>
						<p className='mb-4'>
							{t(
								'termsOfUse.limitationsOfLiability.titleAndDocumentation.responsibility'
							)}
						</p>
						<p className='font-semibold mb-2'>
							{t(
								'termsOfUse.limitationsOfLiability.titleAndDocumentation.notLiableFor.header'
							)}
						</p>
						<ul className='list-disc ml-6 mb-6'>
							<li>
								{t(
									'termsOfUse.limitationsOfLiability.titleAndDocumentation.notLiableFor.list.0'
								)}
							</li>
							<li>
								{t(
									'termsOfUse.limitationsOfLiability.titleAndDocumentation.notLiableFor.list.1'
								)}
							</li>
							<li>
								{t(
									'termsOfUse.limitationsOfLiability.titleAndDocumentation.notLiableFor.list.2'
								)}
							</li>
						</ul>

						{/* 2.3 */}
						<h3 className='font-semibold mb-2'>
							{t(
								'termsOfUse.limitationsOfLiability.transportationAndShipping.header'
							)}
						</h3>
						<p className='mb-4'>
							{t(
								'termsOfUse.limitationsOfLiability.transportationAndShipping.description'
							)}
						</p>
						<p className='mb-2'>
							{t(
								'termsOfUse.limitationsOfLiability.transportationAndShipping.liability'
							)}
						</p>
						<ul className='list-disc ml-6 mb-4'>
							<li>
								{t(
									'termsOfUse.limitationsOfLiability.transportationAndShipping.notLiableFor.0'
								)}
							</li>
							<li>
								{t(
									'termsOfUse.limitationsOfLiability.transportationAndShipping.notLiableFor.1'
								)}
							</li>
						</ul>
						<p className='mb-4'>
							{t(
								'termsOfUse.limitationsOfLiability.transportationAndShipping.regulations'
							)}
						</p>
						<p className='mb-6'>
							{t(
								'termsOfUse.limitationsOfLiability.transportationAndShipping.insurance'
							)}
						</p>

						{/* 3. Dispute Resolution */}
						<h2 className='text-lg font-semibold mb-2'>
							3. {t('termsOfUse.disputeResolution.header')}
						</h2>
						<p className='mb-4'>
							{t('termsOfUse.disputeResolution.description')}
						</p>
						<p className='font-semibold mb-2'>
							{t('termsOfUse.disputeResolution.userAgreement.header')}
						</p>
						<ul className='list-disc ml-6 mb-6'>
							<li>{t('termsOfUse.disputeResolution.userAgreement.list.0')}</li>
							<li>{t('termsOfUse.disputeResolution.userAgreement.list.1')}</li>
							<li>{t('termsOfUse.disputeResolution.userAgreement.list.2')}</li>
						</ul>

						{/* 4. Legal Compliance */}
						<h2 className='text-lg font-semibold mb-2'>
							4. {t('termsOfUse.legalCompliance.header')}
						</h2>
						<p className='mb-4'>
							{t('termsOfUse.legalCompliance.description')}
						</p>
						<p className='font-semibold mb-2'>
							{t('termsOfUse.legalCompliance.buyerAcknowledges.header')}
						</p>
						<ul className='list-disc ml-6 mb-4'>
							<li>
								{t('termsOfUse.legalCompliance.buyerAcknowledges.list.0')}
							</li>
							<li>
								{t('termsOfUse.legalCompliance.buyerAcknowledges.list.1')}
							</li>
							<li>
								{t('termsOfUse.legalCompliance.buyerAcknowledges.list.2')}
							</li>
						</ul>
						<p className='mb-6'>{t('termsOfUse.legalCompliance.agreement')}</p>

						{/* Contact Info */}
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
