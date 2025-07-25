'use client'

import img from '@/assets/images/footerImage.jpg'
import { IcLocation } from '@/shared/icons'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const FooterTop = () => {
	const path = useRouter()
	const t = useTranslations()

	return (
		<div className='mx-auto flex max-lg:block gap-10 items-center h-[58vh] max-sm:h-[95vh] max-lg:h-[70vh] max-lg:mt-24 max-lg:justify-center'>
			<Image
				src={img}
				alt='footer image: driver'
				className='w-80 rounded-xl max-lg:mx-auto max-lg:mb-5'
			/>
			<div className='w-[35vw] max-lg:w-[60vw] max-sm:w-[80vw]'>
				<h1 className='font-bold text-4xl max-sm:text-2xl'>
					{t('footer.top.header')}
				</h1>
				<div className='flex gap-5 items-center mt-5'>
					<div className='w-60 flex flex-col gap-2 text-lg font-medium'>
						<div className='flex items-center gap-2'>
							<IcLocation />
							Klaipeda, LT
						</div>
						<div className='flex items-center gap-2'>
							<IcLocation />
							Rotterdam, NL
						</div>
						<div className='flex items-center gap-2'>
							<IcLocation />
							Poti, GE
						</div>
					</div>
					<div className='w-0.5 h-24 rounded-full bg-black' />
					<div>
						<p className='mb-2'>{t('footer.top.text.first')}</p>
						<p>{t('footer.top.text.second')}</p>
					</div>
				</div>
				<div className='max-lg:mx-auto w-full flex justify-center'>
					<button
						className='px-7 py-3 bg-t-blue-light rounded-full text-white mt-5'
						onClick={() => path.push('/shop')}
					>
						{t('footer.top.button')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default FooterTop
