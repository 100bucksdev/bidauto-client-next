'use client'

import { useRouter } from 'next/navigation'
import { Fragment, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

import SearchCardMask from '@/components/SearchCard/SearchCardMask'
import { useGetBuyNowOffers } from '@/shared/api/Search/getBuyNowOffers/useGetByNowOffers'
import { useInfiniteScrolling } from '@/shared/hooks/useInfiniteScrolling'
import CircleLoader from '@/shared/ui/CircleLoader'
import { IOffers } from '@/types/Offers.interface'
import OfferCard from './(widgets)/OfferCard'

const BuyNowOffers = () => {
	const router = useRouter()

	// Проверяем токен только на клиенте
	const isAuth =
		typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

	// Редирект если нет авторизации
	useEffect(() => {
		if (!isAuth) {
			router.push('/login')
		}
	}, [isAuth, router])

	// Запрос данных
	const buyNowQuery = useGetBuyNowOffers()

	// Подгрузка при скролле
	useInfiniteScrolling(
		typeof document !== 'undefined' ? document : null,
		() => {
			if (buyNowQuery.hasNextPage && !buyNowQuery.isFetchingNextPage) {
				buyNowQuery.fetchNextPage()
			}
		},
		3000
	)

	const offers =
		buyNowQuery.data?.pages?.flatMap(page => page.data?.data ?? []) ?? []

	const totalCount = buyNowQuery.data?.pages?.[0]?.data?.pagination?.count ?? 0

	const isEmpty =
		!buyNowQuery.isLoading &&
		buyNowQuery.data?.pages?.every(page => page.data?.data?.length === 0)

	return (
		<div className='mx-auto max-w-[1200px] my-10'>
			<div className='mx-10 max-md:mx-4'>
				<div
					className={`flex max-lg:flex-col w-full ${
						buyNowQuery.isLoading || offers.length ? '' : 'items-start'
					} gap-x-4 relative`}
				>
					<div className='w-full'>
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
												<>({totalCount})</>
											)}
										</span>
									</div>
									<button
										type='button'
										onClick={() => router.push('/search')}
										className='bg-t-blue-light p-3 rounded-full text-sm text-white cursor-pointer hover:bg-t-blue'
									>
										<FaArrowLeft />
									</button>
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
							{isEmpty && (
								<div className='justify-center font-semibold flex text-4xl h-52 px-4 max-md:text-3xl items-center text-center'>
									We didn’t find any lots
								</div>
							)}

							{/* Результаты */}
							{offers.map((lot: IOffers, i: number) => (
								<Fragment key={`${lot.id}-${i}`}>
									<OfferCard lot={lot} redirectWithAuction />
									<hr />
								</Fragment>
							))}

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

export default BuyNowOffers
