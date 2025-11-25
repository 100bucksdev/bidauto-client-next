import { searchOptions } from '@/store/searchOptions.store'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import HomeSearchBarArea from './widgets/HomeSearchBarArea'
import HomeSearchBarAuctionType from './widgets/HomeSearchBarAuctionType'

const HomeSearchBarMain = () => {
	const { setMake, setModel, params, toDefault } = searchOptions()

	const { type } = params

	useEffect(() => {
		toDefault()
	}, [toDefault])

	const t = useTranslations()

	useEffect(() => {
		setMake('All_Makes')
		setModel('All_Models')
	}, [type, t, setMake, setModel])

	return (
		<section className='2xl:grid gap-7 2xl:grid-rows-2 max-sm:block 3xl:mx-72 2xl:mx-72 xl:mx-36 lg:mx-20 mt-5 max-sm:mx-2 max-sm:w-[350px] max-lg:w-[65vw] max-lg:flex max-lg:flex-col max-lg:mx-2 lg:gap-5 lg:flex lg:flex-col'>
			<div className='2xl:grid 2xl:grid-rows-2 max-lg:block lg-block max-sm:block text-white'>
				<div>
					<h1 className='text-4xl font-semibold max-sm:text-2xl max-lg:text-3xl'>
						{t('home.searchbar.headers.main')}
					</h1>
					<h2 className='text-xl mt-2 max-lg:block lg:hidden'>
						{t('home.searchbar.headers.sub')}
					</h2>
				</div>
				<div className='flex max-sm:block items-center'>
					<h2 className='text-2xl mt-2 max-sm:hidden max-lg:hidden'>
						{t('home.searchbar.headers.sub')}
					</h2>
					<div className='2xl:flex max-sm:block max-lg:block max-lg:mt-2 lg:ml-auto'>
						<HomeSearchBarAuctionType />
					</div>
				</div>
			</div>
			<div>
				<HomeSearchBarArea />
			</div>
		</section>
	)
}

export default HomeSearchBarMain
