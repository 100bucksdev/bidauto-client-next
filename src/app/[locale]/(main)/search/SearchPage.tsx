'use client'

import SearchCard from '@/components/SearchCard/SearchCard'
import SearchCardMask from '@/components/SearchCard/SearchCardMask'
import { useGetLot } from '@/shared/api/Lots/getLot/useGetLot'
import { useGetArchivedLotsLots } from '@/shared/api/Search/getArchivedLots/useGetArchivedLots'
import { useSearchLots } from '@/shared/api/Search/lotSearch/useLotSearch'
import { useUserSearch } from '@/shared/api/Search/userSearch/useUserSearch'
import { useInfiniteScrolling } from '@/shared/hooks/useInfiniteScrolling'
import CircleLoader from '@/shared/ui/CircleLoader'
import { searchOptions } from '@/store/searchOptions.store'
import { ISearchLotParams } from '@/types/SearchLotParams.interface'
import { useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { Fragment } from 'react/jsx-runtime'
import SearchHeader from './(widgets)/SearchHeader/SearchHeader'
import SearchSidebar from './(widgets)/SearchSidebar/SearchSidebar'

// Универсальный тип, чтобы TS понимал структуру lot.data
type PaginatedData<T> = {
	pages: Array<{ data: T }>
}

const Search = () => {
	const params = useSearchParams()
	const searchParams: ISearchLotParams = queryString.parse(params.toString())
	const isArchivedSearch = searchParams.archived === 'true'
	const isAccurateSearch = searchParams.vin
	const { setMake, setModel } = searchOptions()

	const { isLoading, ...lot } = isAccurateSearch
		? useGetLot({
				params: {
					vinOrId: searchParams.vin,
				},
		  })
		: 'q' in searchParams && searchParams.q
		? useUserSearch(
				{ ...searchParams },
				{
					options: {
						options: {
							onSuccess: data => {
								if (
									'make_model' in data.pages[0].data &&
									data.pages[0].data.make_model
								) {
									if (data.pages[0].data.make_model.make) {
										setMake(data.pages[0].data.make_model.make.slug)
									}
									if (data.pages[0].data.make_model.model) {
										setModel(data.pages[0].data.make_model.model.slug)
									}
								}
							},
						},
					},
				}
		  )
		: isArchivedSearch
		? useGetArchivedLotsLots(['archived', searchParams], {
				...searchParams,
		  })
		: useSearchLots(['search', searchParams], {
				...searchParams,
		  })

	// Приводим тип данных к известному формату
	const lotData = lot.data as PaginatedData<any> | { data: any[] } | undefined

	useInfiniteScrolling(
		document,
		() => {
			if ('hasNextPage' in lot && lot.hasNextPage && !lot.isFetchingNextPage) {
				lot.fetchNextPage()
			}
		},
		3000
	)

	return (
		<>
			<SearchHeader />
			<div className='mx-auto max-w-[1660px] my-10'>
				<div className='mx-10 max-md:mx-4'>
					<div
						className={`flex max-lg:flex-col w-full ${
							lotData && 'pages' in lotData
								? 'lots' in lotData.pages[0].data &&
								  lotData.pages[0].data.lots?.length
								: Array.isArray((lotData as any)?.data)
								? (lotData as any).data.length
								: true || isLoading
								? ''
								: 'items-start'
						} gap-x-4 relative`}
					>
						<div className='w-[25%] relative max-lg:w-[100%] max-lg:mb-3'>
							<SearchSidebar />
						</div>
						<div className='w-[75%] max-lg:w-[100%]'>
							<div className=' flex flex-col bg-white rounded-2xl p-5'>
								<div className='text-xl pb-3 w-full flex items-center justify-between gap-x-2'>
									<div>
										<span>Search Results </span>
										<span className='text-slate-400'>
											{isLoading ? (
												<CircleLoader circleClassName='stroke-gray-500' />
											) : (
												<>
													{lotData && 'pages' in lotData ? (
														<>{`(${
															'pagination' in lotData.pages[0].data
																? lotData.pages[0].data.pagination?.count
																: Array.isArray(lotData.pages[0].data)
																? lotData.pages[0].data.length || 0
																: 1
														})`}</>
													) : (
														<>{`(${
															Array.isArray((lotData as any)?.data)
																? (lotData as any).data.length
																: 0
														})`}</>
													)}
												</>
											)}
										</span>
									</div>
								</div>

								{isLoading && (
									<div className='flex flex-col'>
										<SearchCardMask />
										<hr />
										<SearchCardMask />
										<hr />
										<SearchCardMask />
									</div>
								)}

								{lotData && 'pages' in lotData ? (
									<>
										{'lots' in lotData.pages[0].data &&
										lotData.pages[0].data.lots?.length ? (
											lotData.pages.map((page, index) => (
												<Fragment key={index}>
													{'lots' in page.data &&
														page.data.lots.map((lot: any, idx: number) => (
															<Fragment key={idx}>
																<SearchCard redirectWithAuction lot={lot} />
															</Fragment>
														))}
												</Fragment>
											))
										) : (
											<div className='justify-center font-semibold flex text-4xl h-52 px-4 max-md:text-3xl items-center text-center'>
												{`We didn't find any lots`}
											</div>
										)}
									</>
								) : (
									<>
										{lotData &&
										Array.isArray((lotData as any).data) &&
										(lotData as any).data.length
											? (lotData as any).data.map((lot: any, index: number) => (
													<Fragment key={index}>
														<SearchCard lot={lot} redirectWithAuction />
														<hr />
													</Fragment>
											  ))
											: !isLoading && (
													<div className='justify-center font-semibold flex text-4xl max-lg:text-2xl px-4 h-52 items-center'>
														We didn't find any lots
													</div>
											  )}
									</>
								)}

								{'isFetchingNextPage' in lot && lot.isFetchingNextPage && (
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

export default Search
