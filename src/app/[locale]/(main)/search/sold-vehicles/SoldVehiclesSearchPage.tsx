'use client'

import SearchCardMask from '@/components/SearchCard/SearchCardMask'
import { useGetSoldVehicles } from '@/shared/api/Search/getSoldVehicles/useGetSoldVehicles'
import { useInfiniteScrolling } from '@/shared/hooks/useInfiniteScrolling'
import CircleLoader from '@/shared/ui/CircleLoader'
import { getSoldVehiclesStringParams } from '@/store/SoldSearchOptions.store'
import { ISoldSearchParams } from '@/types/SoldVehicle.interface'
import { useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { useEffect, useRef, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import SoldVehicleCard from './(widgets)/card'
import SoldVehicleHeader from './(widgets)/header/SoldVehicleHeader'
import SoldVehicleSidebar from './(widgets)/sidebar/SoldVehicleSideBar'

// Custom debounce hook
const useDebouncedCallback = (
	callback: (...args: any[]) => void,
	delay: number
) => {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const debounced = (...args: any[]) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current)
		timeoutRef.current = setTimeout(() => callback(...args), delay)
	}

	return debounced
}

const SoldVehiclesPage = () => {
	const location = useSearchParams()
	const searchParams: ISoldSearchParams = queryString.parse(
		location.toString()
	) as unknown as ISoldSearchParams

	const [searchParamsString, setSearchParamsString] = useState<string>('')
	const [inputValue, setInputValue] = useState<string>('')

	const path = useRouter()
	const isFirstLoad = useRef(true)

	const {
		isLoading,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
		data,
		refetch,
	} = useGetSoldVehicles({ ...searchParams, q: searchParamsString })

	useInfiniteScrolling(
		document,
		() => {
			if (hasNextPage && !isFetchingNextPage) {
				fetchNextPage()
			}
		},
		3000
	)

	const pages = data?.pages || []
	const lots = pages.flatMap(page => {
		const d = page.data
		if ('lots' in d) return d.lots || []
		if (Array.isArray(d)) return d
		return [d]
	})

	const lotsCount =
		pages[0] && pages[0].data && 'pagination' in pages[0].data
			? pages[0].data.pagination.count
			: lots.length

	const noLots = !isLoading && lots.length === 0

	const queryParamsString = new URLSearchParams(
		getSoldVehiclesStringParams()
	).toString()

	useEffect(() => {
		path.push(
			`/search/sold-vehicles${queryParamsString ? `?${queryParamsString}` : ''}`
		)
	}, [])

	useEffect(() => {
		refetch()
	}, [searchParamsString])

	// Сброс input только при первом монтировании или переходе
	useEffect(() => {
		if (isFirstLoad.current) {
			isFirstLoad.current = false
			return
		}
		setInputValue('')
		setSearchParamsString('')
	}, [location]) // именно при смене URL

	const debouncedSearch = useDebouncedCallback((value: string) => {
		setSearchParamsString(value)
	}, 300)

	return (
		<>
			<SoldVehicleHeader />
			<div className='mx-auto max-w-[1660px] my-10'>
				<div className='mx-10 max-md:mx-4'>
					<div className={`flex max-lg:flex-col w-full gap-x-4 relative`}>
						{/* Sidebar */}
						<div className='w-[25%] relative max-lg:w-full max-lg:mb-3'>
							<SoldVehicleSidebar />
						</div>

						{/* Main content */}
						<div className='w-[75%] max-lg:w-full'>
							<div className='flex flex-col bg-white rounded-2xl p-5'>
								<div className='text-xl pb-3 w-full flex items-center justify-between gap-x-2'>
									<div>
										<span>Search Results </span>
										<span className='text-slate-400'>
											{isLoading ? (
												<CircleLoader circleClassName='stroke-gray-500' />
											) : (
												`(${lotsCount})`
											)}
										</span>
									</div>
									<div>
										<input
											type='text'
											placeholder='VIN or Lot id'
											value={inputValue}
											onChange={e => {
												setInputValue(e.target.value)
												debouncedSearch(e.target.value)
											}}
											className=' placeholder:text-sm border-2 text border-gray-400 px-2 py-1 rounded-lg focus:outline-none focus:border-blue-500'
										/>
									</div>
								</div>

								{/* Loading masks */}
								{isLoading && (
									<div className='flex flex-col'>
										{Array.from({ length: 5 }).map((_, i) => (
											<Fragment key={i}>
												<SearchCardMask />
												<hr />
											</Fragment>
										))}
									</div>
								)}

								{/* Lots rendering */}
								{!isLoading &&
									lots.length > 0 &&
									lots.map((lotItem, index) => (
										<Fragment key={index}>
											<SoldVehicleCard redirectWithAuction lot={lotItem} />
											<hr />
										</Fragment>
									))}

								{/* Empty state */}
								{noLots && (
									<div className='justify-center font-semibold flex text-4xl h-52 px-4 max-md:text-3xl items-center text-center'>
										{searchParams.vehicle_type
											? `We didn't find any ${searchParams.vehicle_type
													.replace(/_/g, ' ')
													.replace(/\b\w/g, c => c.toUpperCase())}`
											: `We didn't find any lots`}
									</div>
								)}

								{/* Infinite scroll loading */}
								{isFetchingNextPage && (
									<>
										<SearchCardMask />
										<hr />
										<SearchCardMask />
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SoldVehiclesPage
