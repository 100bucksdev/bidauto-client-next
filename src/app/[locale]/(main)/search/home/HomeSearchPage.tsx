'use client'

import logo from '@/assets/images/mobile-logo.svg'
import Input from '@/shared/ui/Input'
import { listOfCarBrands } from '@/shared/utils/listOfCarBrands'
import { listOfMotoBrands } from '@/shared/utils/listOfMotoBrands'
import { getStringParams, searchOptions } from '@/store/searchOptions.store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { Fragment } from 'react/jsx-runtime'
import SearchHeader from '../(widgets)/SearchHeader/SearchHeader'
import Brand from '../(widgets)/SearchSidebar/Brand'

const SearchHome = () => {
	const path = useRouter()

	const { setQ } = searchOptions()

	const queryParamsString = new URLSearchParams(getStringParams()).toString()

	const onSubmit = () => {
		path.push(`/search${queryParamsString ? `?${queryParamsString}` : ''}`)
	}

	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

	const handleWindowResize = () => {
		setWindowWidth(window.innerWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)
		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	})

	return (
		<div>
			<SearchHeader />
			<div className='my-10 w-full max-w-[1200px] mx-auto'>
				<div className='mx-10 max-md:mx-4'>
					<div className='bg-white rounded-lg shadow-xl flex flex-col px-12 text-lg py-10 max-md:py-5 max-md:px-6'>
						<div>
							<div className='flex justify-center h-20 overflow-hidden'>
								<Image className='w-36 h-28' src={logo} alt='' />
							</div>
							<div className='flex max-md:flex-col gap-y-2 items-end gap-x-3'>
								<div className='w-4/5 max-md:w-full'>
									<Input
										error={undefined}
										name='q'
										onChange={e => {
											setQ(e.target.value)
										}}
										autoComplete='off'
										className='!text-base'
										placeholder='Search by make and model'
									/>
								</div>
								<form className='w-1/5 max-md:w-full' onSubmit={onSubmit}>
									<button className='w-full flex items-center justify-center gap-x-2 bg-blue-500 py-3 max-md:py-2 rounded-full text-t-text-primary hover:bg-blue-600 duration-100 active:scale-95'>
										<span className='text-2xl'>
											<IoIosSearch />
										</span>
										<span>Search</span>
									</button>
								</form>
							</div>
						</div>
					</div>
					<div className='flex max-md:flex-col gap-y-5 gap-x-5 mt-5'>
						<div className='bg-white shadow-xl rounded-lg py-3 px-3 max-2xl:px-2'>
							<div className='text-xl mb-2 font-semibold text-center'>Cars</div>
							<div>
								<div className='flex flex-wrap justify-center gap-x-2 gap-y-2'>
									{listOfCarBrands.map((el, index) => (
										<Fragment key={index}>
											{index <= (windowWidth < 1440 ? 12 : 30) ? (
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
							</div>
						</div>
						<div className='bg-white shadow-xl rounded-lg py-3 px-3 max-2xl:px-2'>
							<div className='text-xl mb-2 font-semibold text-center'>
								Motorcycles
							</div>
							<div>
								<div className='flex flex-wrap justify-center gap-x-2 gap-y-2'>
									{listOfMotoBrands.map((el, index) => (
										<Fragment key={index}>
											{index <= (windowWidth < 1440 ? 8 : 24) ? (
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchHome
