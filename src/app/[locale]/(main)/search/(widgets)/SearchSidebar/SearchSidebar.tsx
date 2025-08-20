import { getStringParams, searchOptions } from '@/store/searchOptions.store'
import { ISearchLotParams } from '@/types/SearchLotParams.interface'

import queryString from 'query-string'
import { Fragment, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import { listOfCarBrands } from '@/shared/utils/listOfCarBrands'
import { listOfMotoBrands } from '@/shared/utils/listOfMotoBrands'
import { useRouter, useSearchParams } from 'next/navigation'

import Brand from './Brand'
import SearchSidebarDeep from './SearchSidebarDeep'

const SearchSidebar = () => {
	const path = useRouter()
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
	const { params, setArchived } = searchOptions()

	const { archived } = params
	const location = useSearchParams()
	const searchParams: ISearchLotParams = queryString.parse(location.toString())

	const handleWindowResize = () => {
		setWindowWidth(window.innerWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)
		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [])

	const stirngParams = getStringParams()

	return (
		<div className={'w-full'}>
			<div className='w-full h-full flex justify-center items-center flex-col gap-y-3'>
				<div className='bg-white rounded-2xl py-4 px-6 w-full border-2 border-gray-400'>
					<div className='flex justify-center'>
						<button
							className={`${
								archived === 'true' ? 'bg-blue-500' : 'bg-black '
							} px-6 py-2 text-lg rounded-full flex items-center gap-x-2 active:scale-95 duration-100 justify-center text-t-text-primary`}
							onClick={() => {
								const newArchived = archived === 'false' ? 'true' : 'false'

								const newFilteredParams = {
									...stirngParams,
									archived: newArchived,
								}

								const newQueryParamsString = new URLSearchParams(
									newFilteredParams
								).toString()

								path.push(
									`/search${
										newQueryParamsString ? `?${newQueryParamsString}` : ''
									}`
								)

								setArchived(newArchived)
							}}
						>
							<span>
								<FaSearch />
							</span>
							<span>{archived === 'true' ? 'Current' : 'Archived'}</span>
						</button>
					</div>
				</div>
				<div className='bg-white rounded-2xl border-2 border-gray-400 py-3 px-3 max-2xl:px-2'>
					<div className='text-xl mb-2 font-semibold text-center'>
						{searchParams.type === 'motorcycle' ? 'Motorcycles' : 'Cars '}
					</div>
					<div>
						{searchParams.type === 'motorcycle' ? (
							<div className='flex flex-wrap justify-center gap-x-2 gap-y-2'>
								{listOfMotoBrands.map((el, index) => (
									<Fragment key={index}>
										{index <= (windowWidth < 1440 ? 8 : 14) ? (
											<Brand
												type='motorcycle'
												label={el.label}
												value={el.value}
											/>
										) : (
											''
										)}
									</Fragment>
								))}
							</div>
						) : (
							<div className='flex flex-wrap justify-center gap-x-2 gap-y-2'>
								{listOfCarBrands.map((el, index) => (
									<Fragment key={index}>
										{index <= (windowWidth < 1440 ? 12 : 20) ? (
											<Brand
												type='automobile'
												label={el.label}
												value={el.value}
											/>
										) : (
											''
										)}
									</Fragment>
								))}
							</div>
						)}
					</div>
				</div>
				<SearchSidebarDeep />
			</div>
		</div>
	)
}

export default SearchSidebar
