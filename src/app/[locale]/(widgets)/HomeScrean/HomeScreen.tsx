'use client'

import arrow from '@/assets/images/MainPageArrow.svg'
import usa from '@/assets/images/Usa.svg'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import HomeSearchBarMain from '../SearchBar/HomeSearchBarMain'
import HomeScreenBg from './HomeScreenBg'

const HomeScreen = () => {
	const t = useTranslations()
	const path = useRouter()

	return (
		<section>
			<HomeScreenBg>
				<div className='flex'>
					<div className='text-white z-10 max-sm:flex max-sm:flex-col max-sm:mx-auto max-sm:w-[350px] max-lg:flex max-lg:flex-col max-lg:mx-auto max-lg:w-[65vw] text-start'>
						<div className='flex'>
							<h1 className='font-bold text-5xl text-white max-sm:text-[1.75rem] max-lg:text-4xl'>
								{t('home.firstScreen.header')}
							</h1>
						</div>
						<div className='flex w-[450] max-lg:w-[50vw] max-sm:w-[80vw]'>
							<h3 className='text-xl my-2 max-sm:my-4 text-white max-sm:text-base max-lg:text-lg '>
								{t('home.firstScreen.subHeader')}
							</h3>
						</div>
						<button
							className='bg-white flex justify-center items-center px-10 py-2.5 rounded-full text-t-blue-black font-medium mt-3 hover:bg-slate-100 transition-all duration-150 max-sm:w-full max-lg:w-56'
							onClick={() => path.push('/about')}
						>
							{t('home.firstScreen.button')}
						</button>
					</div>
					<div className=' absolute 2xl:left-[30vw] xl:left-[52vw] w-24 h-24 max-sm:w-12 max-sm:h-12 max-sm:left-80 max-sm:top-20 max-lg:left-[65vw] max-lg:top-36 lg:left-[60vw]'>
						<Image src={usa} alt={usa} />
					</div>
					<div className=' absolute 2xl:left-[24vw] top-30 max-hd:hidden max-lg:block max-lg:top-64 max-lg:left-[51svw] max-sm:hidden 2xl:block lg:block lg:left-[49vw] xl:left-[43vw]'>
						<Image src={arrow} alt='arrow' />
					</div>
				</div>
			</HomeScreenBg>
			<div className='bg-t-home-search w-full h-auto py-8 max-sm:p-4 max-lg:p-6 z-20 text-xl max-sm:w-full max-sm:h-auto max-sm:flex max-sm:flex-col max-sm:items-center max-lg:w-full max-lg:h-auto max-lg:flex max-lg:flex-col max-lg:items-center'>
				<div>
					<HomeSearchBarMain />
				</div>
			</div>
		</section>
	)
}

export default HomeScreen
