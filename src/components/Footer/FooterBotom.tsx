'use client'

import logo from '@/assets/images/main-logo.svg'
import navi from '@/assets/images/navi.svg'
import { IcLocation, IcMail, IcPhone } from '@/shared/icons'
import Icon from '@/shared/icons/icon'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FooterSocialMediaData } from './data'

const FooterBottomNew = () => {
	const path = useRouter()
	const t = useTranslations()

	const pathToShop = (type: string) => {
		path.push(
			`/search?isBuyNow=false&auction=COPART&make=${type}&model=All_Models&yearFrom=2000&yearTo=2025&archived=false&type=automobile&fuel=ALL_FUELS&seller=ALL_SELLERS&vehicle_condition=ALL_CONDITIONS&insurance=ALL&odometerFrom=0&odometerTo=250000`
		)
	}

	return (
		<section className='bg-t-blue-black text-white 3xl:px-96 2xl:px-72 lg:px-20 max-lg:px-20 h-auto max-sm:px-10'>
			<div className=' flex items-center mt-14 max-sm:block'>
				<div className='flex flex-col -mt-5'>
					<div className='flex items-center'>
						<Image src={logo} alt='logo' className='w-36' />
						<Image src={navi} alt='logo' className='w-24 ml-4' />
					</div>
					<h1 className='mb-5 -mt-5 font-semibold text-xl'>T-Auto Logistics</h1>
					<h3 className='text-base w-52'>{t('footer.bottom.text')}</h3>
					<div className='mt-4 text-sm'>
						<h5>{t('footer.bottom.folowUs')}</h5>
						<div className='flex gap-4 mt-2'>
							{FooterSocialMediaData.map((data, index) => (
								<a
									key={index}
									target='_blank'
									href={data.link}
									className='flex items-center gap-x-2 cursor-pointer !text-t-text-primary hover:!text-t-text-secondary duration-100'
								>
									<Icon name={data.iconKey} width='19' height='19' />
								</a>
							))}
						</div>
					</div>
				</div>
				<div className='ml-auto flex gap-10 max-lg:gap-2 max-sm:block max-sm:mt-5'>
					<div>
						<h3 className='font-semibold text-lg'>
							{t('footer.bottom.products')}
						</h3>
						<ul className='flex flex-col gap-2 mt-2'>
							<li
								onClick={() => pathToShop('BMW')}
								className='cursor-pointer text-white/75 hover:text-white transition-all duration-150'
							>
								BMW
							</li>
							<li
								onClick={() => pathToShop('Ford')}
								className='cursor-pointer text-white/75 hover:text-white transition-all duration-150'
							>
								Ford
							</li>
							<li
								onClick={() => pathToShop('Audi')}
								className='cursor-pointer text-white/75 hover:text-white transition-all duration-150'
							>
								Audi
							</li>
						</ul>
					</div>
					<div>
						<h3 className='font-semibold text-lg max-sm:mt-5'>
							Navi Grupe LLC FZ
						</h3>
						<ul className='flex flex-col gap-2 mt-2'>
							<li className='flex items-center gap-2'>
								{/* <IcLocation /> */}
								<div className='w-56'>
									<p>
										{
											'Bidauto.Online is an intellectual property in development, owned by Navi Grupe LLC-FZ, a company registered at Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba, Dubai, UAE.'
										}
									</p>
								</div>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='font-semibold text-lg max-sm:mt-5'>
							{t('footer.bottom.contact')}
						</h3>
						<ul className='flex flex-col gap-2 mt-2'>
							<li className='flex items-center gap-2'>
								<IcLocation />
								<div className='w-56'>
									<p>{'1648 Victoria pointe cir, Weston , FL 33327 , USA'}</p>
								</div>
							</li>
							<li className='flex items-center gap-2'>
								<IcMail />
								<p>logisticstauto@gmail.com</p>
							</li>
							<li className='flex items-center gap-2'>
								<IcPhone width='20' />
								<p>+1 (954) 703-4009</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className='w-full h-0.5 bg-gray-900 mt-20' />
			<div className='flex justify-center my-5'>
				<span>
					© Navi Grupe LLC-FZ in partnership with T-Auto Logistics. All rights
					reserved.
				</span>
			</div>
		</section>
	)
}

export default FooterBottomNew
