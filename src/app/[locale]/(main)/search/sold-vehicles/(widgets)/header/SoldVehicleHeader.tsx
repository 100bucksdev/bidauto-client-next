import { useGetBrands } from '@/shared/api/Search/getBrands/useGetBrands'
import { useGetModelsByMake } from '@/shared/api/Search/getModelsByMake/useGetModelsByMake'
import SwipeCheckbox from '@/shared/ui/SwipeCheckbox'
import { yearsArray } from '@/shared/utils/searchYears'
import { listOfVehicles } from '@/shared/utils/vehicles'
import { TVehicles } from '@/store/searchOptions.store'
import {
	getSoldVehiclesStringParams,
	SoldVehicleSearchOptionsStore,
} from '@/store/SoldSearchOptions.store'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Select from 'react-select'
import st from './SoldVehicleAdminHeader.module.css'

const SoldVehicleHeader = () => {
	const [prevScrollPos, setPrevScrollPos] = useState<number>(0)
	const [headerVisible, setHeaderVisible] = useState<boolean>(true)

	const {
		params,
		setModel,
		setMake,
		setVehicleType,
		setYearFrom,
		setYearTo,
		setSite,
	} = SoldVehicleSearchOptionsStore()

	const { vehicle_type, make, year_from, year_to, model, site } = params

	const handleScroll = () => {
		const currentScrollPos = window.scrollY
		setHeaderVisible(prevScrollPos ? currentScrollPos < prevScrollPos : true)
		setPrevScrollPos(currentScrollPos)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [prevScrollPos])

	useEffect(() => {
		setHeaderVisible(true)
	}, [])

	const path = useRouter()
	const currentYear = String(new Date(Date.now()).getFullYear() + 1)
	const t = useTranslations()

	const listOfBrands = useGetBrands({ params: { vehicleType: vehicle_type } })

	const listOfModels = useGetModelsByMake({
		params: {
			make,
			vehicle_type: vehicle_type,
		},
	})

	useEffect(() => {
		setMake('All_Makes')
		setModel('All_Models')
	}, [vehicle_type, t])

	const queryParamsString = new URLSearchParams(
		getSoldVehiclesStringParams()
	).toString()

	return (
		<div
			className={`2xl:sticky duration-[250ms] z-30 ${
				(st.header, headerVisible ? '' : st.header__scrolled)
			}`}
		>
			<div className='w-full bg-white max-2xl:block py-4 z-30 relative flex justify-center items-center gap-x-3'>
				<div className='flex gap-y-2 items-center justify-center gap-x-3 max-lg:flex-col relative z-50'>
					<Select
						value={listOfVehicles.find(
							el => el.value.toLowerCase() === vehicle_type.toLowerCase()
						)}
						onChange={e => {
							setVehicleType((e?.value as TVehicles) || 'automobile')
						}}
						className='w-[200px] max-lg:w-[80%] z-40'
						options={listOfVehicles}
					/>
					<div className='flex items-center gap-x-3 max-lg:w-[80%] relative z-30'>
						<Select
							isSearchable={false}
							value={yearsArray.find(el => el.value === year_from)}
							placeholder={t('home.searchbar.from')}
							onChange={e => setYearFrom(e?.value || '1900')}
							className='w-[100px] max-lg:w-[80%]'
							options={[...yearsArray].reverse()}
						/>
						<div className='w-8 h-[3px] bg-gray-500 mx-1'></div>
						<Select
							isSearchable={false}
							value={yearsArray.find(el => el.value === year_to)}
							placeholder={t('home.searchbar.to')}
							onChange={e => setYearTo(e?.value || currentYear)}
							className='w-[100px] max-lg:w-[80%]'
							options={[...yearsArray].reverse()}
						/>
					</div>
					<Select
						value={listOfBrands.find(
							el => el.value.toLowerCase() === make.toLowerCase()
						)}
						onChange={e => {
							setMake(e?.value || 'All_Maks')
							setModel('All_Models')
						}}
						className='w-[150px] max-lg:w-[80%]'
						options={listOfBrands}
					/>
					<Select
						options={listOfModels}
						value={listOfModels.find(
							el => el.value.toLowerCase() === model.toLowerCase()
						)}
						onChange={e => {
							setModel(e?.value || 'All_Models')
						}}
						className='w-[150px] max-lg:w-[80%]'
					/>
				</div>
				<div className='flex items-center justify-center max-lg:flex-col max-2xl:mt-3 gap-x-3'>
					<div className='flex items-center max-md:block text-lg max-sm:mt-4 max-sm:mb-4'>
						<div className='flex items-center'>
							<div className='mr-4 flex items-center'>
								<SwipeCheckbox
									onChange={e => {
										if (e.currentTarget.checked) {
											setSite('COPART')
										}
									}}
									isChecked={site === 0}
									title='Copart'
								/>
							</div>
							<div>
								<SwipeCheckbox
									onChange={e => {
										if (e.currentTarget.checked) {
											setSite('IAAI')
										}
									}}
									isChecked={site === 1}
									title='IAAI'
								/>
							</div>
						</div>
					</div>
					<button
						className='max-lg:w-[80%] justify-center max-lg:mt-2 bg-t-blue-light relative flex items-center gap-x-2 text-t-text-primary py-2 px-3 rounded-full after:absolute after:rounded-full  after:content-[""] after:top-0 after:left-0 after:w-full after:duration-300 after:h-full after:opacity-0 after:bg-t-home-search-searchbar-bg-hover after:z-10 hover:after:opacity-100'
						onClick={() =>
							path.push(
								`/search/sold-vehicles${
									queryParamsString ? `?${queryParamsString}` : ''
								}`
							)
						}
					>
						<span className='z-20'>
							<FaSearch />
						</span>
						<span className='z-20'>Search</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default SoldVehicleHeader
