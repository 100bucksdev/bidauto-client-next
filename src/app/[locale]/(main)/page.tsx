import { $ApiServer } from '@/config/apiServer.config'
import { TLot } from '@/types/Lot.interface'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import HomeScreen from './(widgets)/HomeScrean/HomeScreen'
import Lots from './(widgets)/Lots/HomeLots'
import YouTubePosts from './(widgets)/YouTube/YouTubePosts'
import { HomePageCarBrendsData } from './data'

export const metadata: Metadata = {
	title: 'T-auto',
	description: 'Win lots at auctions and we will deliver them to you',
	openGraph: {
		title: 'T-auto',
		description: 'Win lots at auctions and we will deliver them to you',
		images: [
			{
				url: '/images/footerImage.jpg',
				width: 1200,
				height: 630,
				alt: 'T-auto Open Graph Image',
			},
		],
	},
}

export default async function Home() {
	const t = await getTranslations()

	const brands = ['BMW', 'Audi', 'Ford']

	type BrandLots = {
		make: string
		vehicles: TLot[]
	}

	let cars: BrandLots[] = []

	try {
		const promises = brands.map(brand =>
			$ApiServer.get<{ data: TLot[] }>('/auction-api/public/v1/lot/current', {
				params: {
					site: 'copart',
					make: brand,
					page: 1,
					limit: 20,
				},
				next: { revalidate: 60 * 60 },
			})
		)

		const responses = await Promise.all(promises)

		cars = responses.map((res, index) => ({
			make: brands[index],
			vehicles: res.data?.data ?? [],
		}))
	} catch (err) {
		console.error('Ошибка загрузки машин:', err)
	}

	return (
		<div className='break-words w-full overflow-y-auto overflow-x-hidden'>
			<HomeScreen />

			<section className='w-full 3xl:ml-72 2xl:ml-72 2xl:mr-0 xl:mx-36 lg:mx-20 flex flex-col my-24 max-sm:my-12 max-lg:ml-0 overflow-hidden'>
				<div className='w-full mb-10 pb-4 max-lg:mx-36 max-sm:mx-10'>
					<YouTubePosts />
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
							<Image src={data.icon} alt={data.title} />
							<p className='text-lg'>{data.title}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}
