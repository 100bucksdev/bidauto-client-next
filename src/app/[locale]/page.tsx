import { $TestApi } from '@/config/api.config'
import { IInstagramPost } from '@/shared/types/InstagramPost.interface'
import { IMainPageCars } from '@/shared/types/MainPageCars.interface'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Lots from './(widgets)/Lots/HomeLots'
import InstagramPosts from './(widgets)/Realse/InstagramPosts'
import { HomePageCarBrendsData } from './data'

const metadata: Metadata = {
	title: 'T-auto',
	description: 'Win lots at auctions and we will deliver them to you',
	openGraph: {
		title: 'T-auto',
		description: 'Win lots at auctions and we will deliver them to you',
		images: [
			{
				url: '../../assets/images/footerImage.jpg',
				width: 1200,
				height: 630,
				alt: 'T-auto Open Graph Image',
			},
		],
	},
}

export default async function Home() {
	const t = await getTranslations()

	const carsResponse = await $TestApi.get<IMainPageCars[]>(
		'/auction-vehicles/main-page/',
		{
			next: {
				revalidate: 60 * 60,
			},
		}
	)

	const realseResponse = await $TestApi.get<IInstagramPost[]>(
		'/instagram/posts/',
		{
			next: {
				revalidate: 60 * 60,
			},
		}
	)

	const cars = carsResponse.data
	const realse = realseResponse.data

	return (
		<div className='break-words w-full overflow-y-auto overflow-x-hidden'>
			{/* {/* {isWarning && (
						<div className='bg-yellow-500/80 p-2 flex max-md:flex-col gap-4 items-center px-6'>
							<div>
								We would like to apologize that until the end of December we will
								have issues with informations from IAAI auction. Please use{" "}
								<a href='https://www.iaai.com/' className='text-blue-500'>
									iaai.com
								</a>{" "}
								page to search for the vehicles in that auction and send us a
								message. Thank You for Your patience
							</div>
							<button onClick={handleClose} className='text-3xl'>
								<IoIosClose />1. Удаляешь index.html и assets
							</button>
						</div>
					)} 
				<HomeScreen />
				*/}
			<section className='w-full 3xl:ml-72 2xl:ml-72 2xl:mr-0 xl:mx-36 lg:mx-20 flex flex-col my-24 max-sm:my-12 max-lg:ml-0 overflow-hidden'>
				<div className='w-full mb-10 pb-4 max-lg:mx-36 max-sm:mx-10'>
					<InstagramPosts data={realse} />
				</div>
				<div className='space-y-10 max-lg:ml-10 max-sm:mx-2 flex justify-center flex-col'>
					{cars.map((car, index) => (
						<Lots key={index} data={car.vehicles} title={car.make} />
					))}
				</div>
			</section>
			<section className='flex flex-col items-center w-full h-auto max-lg:h-[60vh] max-sm:h-[170vh] bg-t-blue-black text-white xl:px-36 overflow-hidden'>
				<h1 className='mt-24 font-bold text-5xl'>{t('home.carBrands')}</h1>
				<div className='3xl:flex gap-5 mt-16 max-lg:grid max-lg:grid-cols-3 max-lg:grid-rows-2 max-lg:p-20 max-lg:mt-1 max-sm:flex max-sm:flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:p-20 lg:mt-1'>
					{HomePageCarBrendsData.map((data, index) => (
						<div
							key={index}
							className='flex flex-col items-center px-8 bg-white rounded-xl text-black gap-2 py-5'
						>
							<img src={data.icon} alt={data.title} />
							<p className='text-lg'>{data.title}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}
