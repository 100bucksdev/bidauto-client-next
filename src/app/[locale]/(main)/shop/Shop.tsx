import { useState } from 'react'
import { IoIosArrowBack, IoIosSearch } from 'react-icons/io'
import { MdExpandMore } from 'react-icons/md'
import { Fragment } from 'react/jsx-runtime'

import { useGetFirstFoutVehiclesEveryCategory } from '@/shared/api/Shop/getFirstFoutVehiclesEveryCategory/useGetFirstFoutVehiclesEveryCategory'
import { useGetShop } from '@/shared/api/Shop/getShop/useGetShop'
import { useInfiniteScrolling } from '@/shared/hooks/useInfiniteScrolling'
import backgroundImage from '@images/ShopBackground.jpeg'
import { useParams, useRouter } from 'next/navigation'
import ShopCard from './(widgets)/ShopCard'
import ShopCardMask from './(widgets)/ShopCardMask'

const Shop = () => {
	const { push: path } = useRouter()
	const [search, setSearch] = useState('')
	const { slug, id } = useParams()
	const {
		data: all,
		isLoading: allIsLoading,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useGetShop({ search: search, category: id || '0' })

	useInfiniteScrolling(
		document,
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
			<div
				style={{ backgroundImage: `url(${backgroundImage})` }}
				className='relative z-10 mb-12 py-44 max-md:py-24 flex items-center justify-center bg-cover max-lg:bg-center'
			>
				<div className='absolute z-10 inset-0 bg-white bg-opacity-65'></div>
				<h1 className='text-6xl relative z-20 max-md:text-3xl text-center font-semibold leading-[1] tracking-[-0.4px]'>
					Welcome to our{' '}
					<span className='border-b-8 border-t-header-top border-dashed'>
						T-Shop!
					</span>
				</h1>
			</div>
			{id && slug && (
				<div className='flex justify-center'>
					<div className='flex max-md:w-[270px] w-[400px] justify-center gap-x-2 max-md:gap-x-1'>
						<button
							onClick={() => path(`/shop`)}
							className='btn btn-primary px-4 w-1/3 max-md:w-auto max-md:px-2 max-md:py-1 max-md:text-sm py-2 gap-x-2 flex items-center'
						>
							<span>
								<IoIosArrowBack />
							</span>
							<span className='max-md:hidden'>Go Back</span>
						</button>
						<div className='flex items-center max-w-2/3 bg-white max-md:py-1 shadow-xl bg-opacity-65 rounded-lg max-md:px-2 py-2 px-3 gap-x-3 border-gray-300 border'>
							<div className='text-lg text-gray-500'>
								<IoIosSearch />
							</div>
							<input
								type='text'
								onChange={e => {
									setSearch(e.target.value)
								}}
								placeholder='Search'
								className='bg-transparent border-none outline-none'
							/>
						</div>
					</div>
				</div>
			)}
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
								<div>
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
													path(`/shop/${el.category.slug}/${el.category.id}`)
												}
												className='btn btn-primary px-4 py-2 gap-x-1 text-lg flex items-center'
											>
												<span>See All</span>
												<span>
													<MdExpandMore />
												</span>
											</button>
										</div>
									)}
								</div>
							))}
						</div>
					) : (
						<></>
					)}
				</>
			)}

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
				) : (
					<>
						{all && all.pages[0].data.pagination.count > 0 ? (
							all.pages.map((page, index) => (
								<Fragment key={index}>
									{page.data.vehicles.map(vehicle => (
										<ShopCard car={vehicle} key={vehicle.id} />
									))}
								</Fragment>
							))
						) : (
							<>
								{search ? (
									<div className='font-semibold text-3xl max-md:text-xl text-center'>
										No Vehicles Found
									</div>
								) : (
									!data?.data.length && (
										<div className='font-semibold text-3xl max-md:text-xl py-24 text-center'>
											No Vehicles Yet
										</div>
									)
								)}
							</>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default Shop
