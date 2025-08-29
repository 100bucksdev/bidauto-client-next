'use client'

import SearchCardMask from '@/components/SearchCard/SearchCardMask'
import { useGetBuyNowOffers } from '@/shared/api/Search/getBuyNowOffers/useGetByNowOffers'
import { useInfiniteScrolling } from '@/shared/hooks/useInfiniteScrolling'
import CircleLoader from '@/shared/ui/CircleLoader'
import { IOffers } from '@/types/Offers.interface'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import OfferCard from './(widgets)/OfferCard'

const ByNowOffers = () => {
	const isAuth =
		typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
	const router = useRouter()

	useEffect(() => {
		if (!isAuth) {
			router.push('/login')
		}
	}, [isAuth, router])

	const buyNowQuery = useGetBuyNowOffers()

	useInfiniteScrolling(
		document,
		() => {
			if (buyNowQuery.hasNextPage && !buyNowQuery.isFetchingNextPage) {
				buyNowQuery.fetchNextPage()
			}
		},
		3000
	)

	return (
		<div className='mx-auto max-w-[1200px] my-10'>
			<div className='mx-10 max-md:mx-4'>
				<div
					className={`flex max-lg:flex-col w-full ${
						buyNowQuery.data?.pages?.[0]?.data?.data?.length
							? ''
							: buyNowQuery.isLoading
							? ''
							: 'items-start'
					} gap-x-4 relative`}
				>
					<div className='w-[100%] max-lg:w-[100%]'>
						<div className='flex flex-col bg-white rounded-2xl p-5'>
							{/* Заголовок */}
							<div className='text-xl pb-3 w-full flex items-center justify-between gap-x-2'>
								<div className='flex items-center justify-between w-full'>
									<div>
										<span>Buy now offers </span>
										<span className='text-slate-400'>
											{buyNowQuery.isLoading ? (
												<CircleLoader circleClassName='stroke-gray-500' />
											) : (
												<>
													(
													{buyNowQuery.data?.pages?.[0]?.data?.pagination
														?.count ?? 0}
													)
												</>
											)}
										</span>
									</div>
									<div
										onClick={() => router.push('/search')}
										className='bg-t-blue-light p-3 rounded-full text-sm text-white cursor-pointer'
									>
										<FaArrowLeft />
									</div>
								</div>
							</div>

							{/* Состояние загрузки */}
							{buyNowQuery.isLoading && (
								<div className='flex flex-col'>
									{Array.from({ length: 5 }).map((_, idx) => (
										<Fragment key={idx}>
											<SearchCardMask />
											<hr />
										</Fragment>
									))}
								</div>
							)}

							{/* Если нет результатов */}
							{!buyNowQuery.isLoading &&
								buyNowQuery.data?.pages.every(
									page => page.data.data.length === 0
								) && (
									<div className='justify-center font-semibold flex text-4xl h-52 px-4 max-md:text-3xl items-center text-center'>
										We didn’t find any lots
									</div>
								)}

							{/* Результаты */}
							{buyNowQuery.data?.pages.map((page, index) =>
								page.data.data.length > 0 ? (
									<Fragment key={index}>
										{page.data.data.map((lot: IOffers, i: number) => (
											<Fragment key={i}>
												<OfferCard lot={lot} redirectWithAuction />
												<hr />
											</Fragment>
										))}
									</Fragment>
								) : null
							)}

							{/* Загрузка следующей страницы */}
							{buyNowQuery.isFetchingNextPage && (
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
	)
}

export default ByNowOffers
