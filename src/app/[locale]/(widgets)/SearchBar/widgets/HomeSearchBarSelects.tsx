'use client'

import { useGetBrands } from '@/shared/api/Search/getBrands/useGetBrands'
import { useGetModelsByMake } from '@/shared/api/Search/getModelsByMake/useGetModelsByMake'
import { IcCar_1, IcCar_2, IcCar_3, IcClock } from '@/shared/icons'
import { homeSearchBarSelectStyles } from '@/shared/utils/reactSelectStyles'
import { yearsArray } from '@/shared/utils/searchYears'
import { listOfVehicles } from '@/shared/utils/vehicles'
import { searchOptions, TVehicles } from '@/store/searchOptions.store'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import Select from 'react-select'

const HomeSearchbarSelects = () => {
	const {
		params: { make, model, type, yearTo },
		setModel,
		setMake,
		setYearFrom,
		setYearTo,
		setType,
	} = searchOptions()

	const t = useTranslations()
	const listOfBrands = useGetBrands({
		params: { vehicleType: type },
	})
	const listOfModels = useGetModelsByMake({
		params: { make, vehicle_type: type },
	})

	useEffect(() => {
		if (
			make.toLowerCase() === 'all_makes' &&
			model.toLowerCase() !== 'all_models'
		) {
			setModel('All_Models')
		}
	}, [make, model, setModel])

	return (
		<div className='flex items-center z-40 max-sm:w-full max-sm:px-4 max-lg:w-full max-lg:px-4 lg:w-full lg:px-4'>
			<div className='grid 2xl:[grid-template-columns:1fr_1fr_1fr_0.6fr_0.6fr] 2xl:[grid-template-rows:1fr] text-black h-auto max-sm:grid-cols-1 max-sm:grid-rows-5 max-sm:w-full max-lg:grid-cols-1 max-lg:grid-rows-5 max-lg:w-full lg:grid-cols-1 lg:grid-rows-5 lg:w-full'>
				<div className='flex items-center 3xl:px-4 2xl:p-1 max-sm:p-0 max-sm:py-3 max-lg:w-full max-lg:p-0 max-lg:py-3 lg:w-full lg:p-0 lg:py-3 max-sm:w-full'>
					<IcCar_1 />
					<Select
						styles={homeSearchBarSelectStyles}
						value={listOfVehicles.find(el => el.value === type)}
						onChange={e => {
							setType((e?.value as TVehicles) || 'Automobile')
						}}
						className='2xl:w-40 outline-none rounded-2xl h-full max-sm:w-full max-lg:w-full lg:w-full'
						options={listOfVehicles}
						isSearchable={false}
					/>
				</div>
				<div className='flex items-center 2xl:p-1 3xl:px-4 max-sm:p-0 max-sm:py-3 max-sm:w-full max-lg:p-0 max-lg:py-3 max-lg:w-full lg:w-full lg:p-0 lg:py-3'>
					<IcCar_2 />
					<Select
						styles={homeSearchBarSelectStyles}
						value={listOfBrands.find(el => el.value === make)}
						onChange={e => setMake(e?.value || 'All_Makes')}
						options={listOfBrands}
						className='2xl:w-40 outline-none rounded-2xl h-full max-sm:w-full max-lg:w-full lg:w-full'
						isSearchable={false}
					/>
				</div>
				<div className='flex items-center 3xl:px-4 2xl:p-1 max-sm:p-0 max-sm:py-3 max-sm:w-full max-lg:p-0 max-lg:py-3 max-lg:w-full lg:w-full lg:p-0 lg:py-3'>
					<IcCar_3 />
					<Select
						styles={homeSearchBarSelectStyles}
						options={listOfModels}
						value={listOfModels.find(el => el.value === model)}
						onChange={e => setModel(e?.value || 'All_Models')}
						className='2xl:w-40 outline-none rounded-2xl h-full max-md:w-full max-lg:w-full lg:w-full'
						isSearchable={false}
					/>
				</div>
				<div className='flex items-center 3xl:px-4 pr-0 2xl:p-1 max-sm:p-0 max-sm:py-3 max-sm:w-full max-lg:p-0 max-lg:py-3 max-lg:w-full lg:w-full lg:p-0 lg:py-3'>
					<IcClock />
					<Select
						placeholder={t('home.searchbar.from')}
						styles={homeSearchBarSelectStyles}
						isSearchable={false}
						onChange={e =>
							setYearFrom(typeof e === 'string' ? '2000' : e?.value || '2000')
						}
						className='2xl:w-[80px] outline-none rounded-2xl h-full max-md:w-full max-lg:w-full lg:w-full'
						options={[...yearsArray].reverse()}
					/>
				</div>
				<div className='flex items-center 3xl:px-4 pr-0 2xl:p-1 max-sm:p-0 max-sm:py-3 max-sm:w-full max-lg:p-0 max-lg:py-3 max-lg:w-full lg:w-full lg:p-0 lg:py-3'>
					<IcClock />
					<Select
						placeholder={t('home.searchbar.to')}
						isSearchable={false}
						onChange={e =>
							setYearTo(typeof e === 'string' ? yearTo : e?.value || yearTo)
						}
						className='2xl:w-[74px] outline-none rounded-2xl h-full max-md:w-full max-lg:w-full lg:w-full'
						styles={homeSearchBarSelectStyles}
						options={[...yearsArray].reverse()}
					/>
				</div>
			</div>
		</div>
	)
}

export default HomeSearchbarSelects
