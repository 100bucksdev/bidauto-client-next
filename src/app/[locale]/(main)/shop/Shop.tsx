'use client'

import backgroundImage from '@/assets/images/ShopBackground.jpeg'
import { useGetFirstFoutVehiclesEveryCategory } from '@/shared/api/Shop/getFirstFoutVehiclesEveryCategory/useGetFirstFoutVehiclesEveryCategory'
import { useGetShop } from '@/shared/api/Shop/getShop/useGetShop'
import { useInfiniteScrolling } from '@/shared/hooks/useInfiniteScrolling'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoIosArrowBack, IoIosSearch } from 'react-icons/io'
import { MdExpandMore } from 'react-icons/md'
import ShopCard from './(widgets)/ShopCard'
import ShopCardMask from './(widgets)/ShopCardMask'

const Shop = () => {
	const router = useRouter()
	const [search, setSearch] = useState('')
	const params = useParams<{ slug?: string; id?: string }>()
	const slug = params?.slug ?? null
	const id = params?.id ?? null

	const {
		data: all,
		isLoading: allIsLoading,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useGetShop({ search, category: id || '0' })

	// бесконечный скролл
	useInfiniteScrolling(
		typeof document !== 'undefined' ? document : null,
		() => {
			if (hasNextPage && !isFetchingNextPage) {
				fetchNextPage()
			}
		},
		2000
	)

	const { data, isLoading } = useGetFirstFoutVehiclesEveryCategory()

	return (
		<div className='pb-20'>
			{/* фон через backgroundImage */}
			<div
				className='relative z-10 mb-12 py-44 max-md:py-24 flex items-center justify-center bg-cover bg-center'
				style={{ backgroundImage: `url(${backgroundImage.src})` }}
			>
				<div className='absolute inset-0 bg-white bg-opacity-65 z-10'></div>
				<h1 className='text-6xl relative z-20 max-md:text-3xl text-center font-semibold leading-[1] tracking-[-0.4px]'>
					Welcome to our{' '}
					<span className='border-b-8 border-t-header-top border-dashed'>
						T-Shop!
					</span>
				</h1>
			</div>

			{/* панель поиска */}
			{id && slug && (
				<div className='flex justify-center'>
					<div className='flex max-md:w-[270px] w-[400px] justify-center gap-x-2 max-md:gap-x-1'>
						<button
							onClick={() => router.push(`/shop`)}
							className='btn btn-primary px-4 w-1/3 max-md:w-auto max-md:px-2 max-md:py-1 max-md:text-sm py-2 gap-x-2 flex items-center'
						>
							<IoIosArrowBack />
							<span className='max-md:hidden'>Go Back</span>
						</button>
						<div className='flex items-center bg-white max-md:py-1 shadow-xl bg-opacity-65 rounded-lg max-md:px-2 py-2 px-3 gap-x-3 border-gray-300 border w-2/3'>
							<IoIosSearch className='text-lg text-gray-500' />
							<input
								type='text'
								value={search}
								onChange={e => setSearch(e.target.value)}
								placeholder='Search'
								className='bg-transparent border-none outline-none w-full'
							/>
						</div>
					</div>
				</div>
			)}

			{/* превью категорий */}
			{(!id || !slug) && (
				<>
					{isLoading ? (
						<div className='flex flex-wrap justify-center mt-12 px-48 max-md:px-6 max-xl:px-12 gap-8'>
							<ShopCardMask />
							<ShopCardMask />
							<ShopCardMask />
							<ShopCardMask />
						</div>
					) : data ? (
						<div className='flex flex-col gap-y-20'>
							{data.data.map(el => (
								<div key={el.category.id}>
									<h3 className='flex justify-center font-semibold text-4xl px-5 max-md:text-3xl'>
										{el.category.name}
									</h3>
									<div className='flex flex-wrap justify-center mt-12 px-48 max-md:px-6 max-xl:px-12 gap-8'>
										{el.vehicles.map(vehicle => (
											<ShopCard car={vehicle} key={vehicle.id} />
										))}
									</div>
									{el.vehicles.length === 4 && (
										<div className='flex justify-center mt-10'>
											<button
												onClick={() =>
													router.push(
														`/shop/${el.category.slug}/${el.category.id}`
													)
												}
												className='btn btn-primary px-4 py-2 gap-x-1 text-lg flex items-center'
											>
												<span>See All</span>
												<MdExpandMore />
											</button>
										</div>
									)}
								</div>
							))}
						</div>
					) : null}
				</>
			)}

			{/* список автомобилей */}
			{!!all?.pages[0].data.vehicles.length && (
				<h3 className='flex justify-center font-semibold text-4xl mt-20 px-5'>
					{id && slug ? all?.pages[0].data.category?.name : 'Other'}
				</h3>
			)}

			<div className='flex flex-wrap justify-center mt-12 px-48 max-md:px-6 max-xl:px-12 gap-8'>
				{allIsLoading ? (
					<>
						<ShopCardMask />
						<ShopCardMask />
						<ShopCardMask />
						<ShopCardMask />
					</>
				) : all && all.pages[0].data.pagination.count > 0 ? (
					all.pages.map((page, index) =>
						page.data.vehicles.map(vehicle => (
							<ShopCard car={vehicle} key={`${index}-${vehicle.id}`} />
						))
					)
				) : search ? (
					<div className='font-semibold text-3xl max-md:text-xl text-center'>
						No Vehicles Found
					</div>
				) : !data?.data.length ? (
					<div className='font-semibold text-3xl max-md:text-xl py-24 text-center'>
						No Vehicles Yet
					</div>
				) : null}
			</div>
		</div>
	)
}

export default Shop
