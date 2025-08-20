import SearchCard from '@/components/SearchCard/SearchCard'
import SearchCardMask from '@/components/SearchCard/SearchCardMask'
import { useInfiniteScrolling } from '@/shared/hooks/useInfiniteScrolling'
import { getBidStatuses } from '@/shared/serverActions/getBidStatus'
import CircleLoader from '@/shared/ui/CircleLoader'
import { FetchNextPageOptions } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { Dispatch, Fragment, SetStateAction, memo } from 'react'
import Select, { CSSObjectWithLabel } from 'react-select'
import LotOrderCard from './(widgets)/card/LotOrderCard'
import ShopVehicleProfileCard from './(widgets)/card/ShopVehicleProfileCard'

type fetchNextPage = (
	options?: FetchNextPageOptions | undefined
) => Promise<any>

interface IProfileLists {
	pages: any
	isLoading: boolean
	fetchNextPage: fetchNextPage
	isFetchingNextPage: boolean
	hasNextPage: boolean | undefined
	type: 'favorites' | 'bids' | 'carfax' | 'orders' | 'vehicles'
	setSort: Dispatch<SetStateAction<string>>
	sort: string
	isError: boolean
	userStatus: string | undefined
	setUserStatus: Dispatch<SetStateAction<string | undefined>>
}

const ProfileLists = memo<IProfileLists>(
	({
		pages,
		isLoading,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		isError,
		type,
		setSort,
		sort,
		userStatus,
		setUserStatus,
	}) => {
		useInfiniteScrolling(
			document,
			() => {
				if (hasNextPage && !isFetchingNextPage) {
					fetchNextPage()
				}
			},
			2000
		)
		const t = useTranslations()

		// const typeIcons = {
		// 	favorites: CiStar,
		// 	bids: CiCreditCard1,
		// 	carfax: PiNewspaperClipping,
		// 	orders: CiFileOn,
		// 	vehicles: AiOutlineShoppingCart,
		// }

		const typeTitles = {
			favorites: t('profile.favorites'),
			bids: t('profile.bids'),
			carfax: t('profile.carfax'),
			orders: t('profile.orders'),
			vehicles: 'Vehicles',
		}

		const undefinedTitles = {
			favorites: t('profile.absence.favorites'),
			bids: t('profile.absence.bids'),
			carfax: t('profile.absence.carfax'),
			orders: t('profile.absence.orders'),
			vehicles: 'No Vehicles',
		}

		const selectOptions = {
			favorites: [
				{ value: 'created_at', label: t('profile.sorting.createNew') },
				{ value: '-created_at', label: t('profile.sorting.createOld') },
				{ value: 'auction_date', label: t('profile.sorting.auctionDateNew') },
				{ value: '-auction_date', label: t('profile.sorting.auctionDateOld') },
			],
			bids: [
				{ value: 'created_at', label: t('profile.sorting.createNew') },
				{ value: '-created_at', label: t('profile.sorting.createOld') },
				{ value: 'auction_date', label: t('profile.sorting.auctionDateNew') },
				{ value: '-auction_date', label: t('profile.sorting.auctionDateOld') },
				{ value: 'updated_at', label: t('profile.sorting.lastUpdate') },
				{ value: '-updated_at', label: t('profile.sorting.firstUpdate') },
				{ value: 'amount', label: t('profile.sorting.highestAmount') },
				{ value: '-amount', label: t('profile.sorting.lowestAmount') },
			],
			carfax: [
				{ value: 'auction_date', label: t('profile.sorting.auctionDateNew') },
				{ value: '-auction_date', label: t('profile.sorting.auctionDateOld') },
				{ value: 'created_at', label: t('profile.sorting.createNew') },
			],
			orders: [],
			vehicles: [],
		}

		const userStatusesLabels = getBidStatuses()

		const userStatusesOptions =
			type === 'bids' && pages && pages.length > 0
				? [
						{ value: undefined, label: t('profile.statuses.all') },
						...Array(pages[pages.length - 1]?.data.statuses.length)
							.fill(undefined)
							.map((_, i) => ({
								value: pages[pages.length - 1]?.data.statuses[i],
								label:
									userStatusesLabels[
										pages[pages.length - 1]?.data.statuses[i].toLowerCase() as
											| 'lost'
											| 'win'
											| 'placed'
									],
							})),
				  ]
				: undefined

		return (
			<>
				{!isError && (
					<>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-x-4 py-2 max-md:gap-y-3 px-6 justify-between max-md:flex-col max-md:justify-center rounded-t-2xl w-full bg-blue-100'>
								<div className='font-medium text-xl flex items-center gap-x-2'>
									<span className='text-gray-600'>{typeTitles[type]}</span>
									<span className='text-gray-600'>
										{isLoading ? (
											<CircleLoader circleClassName='stroke-gray-500' />
										) : (
											<>{`(${
												Array.isArray(pages)
													? pages[0].data.pagination.count || 0
													: 0
											})`}</>
										)}
									</span>
								</div>
							</div>
						</div>
						<div className='w-full flex items-center justify-end max-sm:justify-center px-6 my-2'>
							{type !== 'orders' && type !== 'vehicles' && (
								<div className='flex max-md:flex-col max-md:gap-y-4 items-center gap-x-4'>
									<div className='z-20 flex max-md:flex-col max-md:justify-center items-center gap-x-3'>
										{!!selectOptions[type].length && (
											<>
												{/* <div className='text-center'>
													{t('profile.sorting.header')}:
												</div> */}
												<Select
													onChange={e => {
														setSort(e?.value || 'created_at')
													}}
													value={selectOptions[type].find(
														el => el.value === sort
													)}
													options={selectOptions[type]}
													isSearchable={false}
												/>
											</>
										)}
									</div>
									{type === 'bids' && (
										<div className='z-10 flex items-center gap-x-3 max-md:flex-col max-md:justify-center'>
											{/* <div className='text-center'>
												{t('profile.statuses.header')}:
											</div> */}
											<Select
												onChange={e => {
													setUserStatus(e?.value)
												}}
												value={userStatusesOptions?.find(
													el => el.value == userStatus
												)}
												options={userStatusesOptions}
												isSearchable={false}
												styles={{
													control: (styles: CSSObjectWithLabel) => ({
														...styles,
														minWidth: '120px',
													}),
												}}
											/>
										</div>
									)}
								</div>
							)}
						</div>
						<div className='px-6 max-md:px-2'>
							{isLoading ? (
								<>
									<SearchCardMask />
									<hr />
									<SearchCardMask />
									<hr />
									<SearchCardMask />
									<hr />
									<SearchCardMask />
								</>
							) : pages.length &&
							  pages[0].data.user[type === 'carfax' ? 'carfax_reports' : type]
									.length ? (
								<>
									{pages.map((page: any, index: number) => (
										<Fragment key={index}>
											{page.data.user[
												type === 'carfax' ? 'carfax_reports' : type
											].map((lot: any, index: number) => {
												const components = {
													carfax: (
														<SearchCard
															redirectWithAuction
															lot={lot}
															withCarfax
														/>
													),
													bids: (
														<SearchCard
															redirectWithAuction
															lot={lot}
															user_bid={lot.bid_info}
														/>
													),
													favorites: (
														<SearchCard redirectWithAuction lot={lot} />
													),
													orders: <LotOrderCard order={lot} />,
													vehicles: <ShopVehicleProfileCard vehicle={lot} />,
												}

												return (
													<Fragment key={index}>
														{components[type]}
														<hr />
													</Fragment>
												)
											})}
										</Fragment>
									))}
								</>
							) : (
								<div className='flex justify-center items-center py-20 text-2xl font-semibold'>
									<div className='-mt-5'>{undefinedTitles[type]}</div>
								</div>
							)}
						</div>
						{isFetchingNextPage ? (
							<>
								<SearchCardMask />
								<hr />
								<SearchCardMask />
								<hr />
								<SearchCardMask />
								<hr />
								<SearchCardMask />
							</>
						) : (
							''
						)}
					</>
				)}
			</>
		)
	}
)

export default ProfileLists
