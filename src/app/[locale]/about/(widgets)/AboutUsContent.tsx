import img from '@/assets/images/img124.jpg'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const AboutUsContent = () => {
	const t = useTranslations()

	return (
		<div className='w-full mt-10'>
			<div className='mx-auto max-w-[1000px]'>
				<div className='bg-white rounded-2xl flex flex-col gap-y-6 px-12 text-lg py-10 max-md:py-5 max-md:px-6'>
					<div>
						<div className='font-medium text-2xl mb-4'>
							{t('aboutUs.header')}
						</div>
						<div className='text-5xl mb-5 font-semibold'>
							{t('aboutUs.welcome.header')}
						</div>
						<div>{t('aboutUs.welcome.description')}</div>
						<Image src={img} alt='image' className='my-5 rounded-2xl' />
					</div>
					<div>
						<div className='text-2xl mb-5 font-semibold'>
							{t('aboutUs.ourJourney.header')}
						</div>
						<div>{t('aboutUs.ourJourney.description')}</div>
					</div>
					<div>
						<div className='text-2xl mb-5 mt-6 font-semibold'>
							{t('aboutUs.dedication.header')}
						</div>
						<div>{t('aboutUs.dedication.description')}</div>
					</div>
					<div>
						<div className='text-2xl mb-5 mt-6 font-semibold'>
							{t('aboutUs.latestInovation.header')}
						</div>
						<div>{t('aboutUs.latestInovation.description')}</div>
					</div>
					<div>
						<div className='text-2xl mb-5 mt-6 font-semibold'>
							{t('aboutUs.hassleFree.header')}
						</div>
						<div>{t('aboutUs.hassleFree.description')}</div>
					</div>
					<div>
						<div className='text-2xl mb-5 mt-6 font-semibold'>
							{t('aboutUs.joinUs.header')}
						</div>
						<div>{t('aboutUs.joinUs.description')}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutUsContent
