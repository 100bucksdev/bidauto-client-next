import { useGetUserCarfax } from '@/shared/api/User/getCarfax/useGetUserCarfax'
import { useGetUserFavourites } from '@/shared/api/User/getFavorites/useGetUserFavourites'
import { useGetUserOrders } from '@/shared/api/User/getOrder/useGetUserOrders'
import { useGetUserProfileVehicles } from '@/shared/api/User/getProfileVehicles/useGetUserProfileVehicles'
import { useGetUserBids } from '@/shared/api/User/getUserBids/useGetUserBids'
import { useGetUserData } from '@/shared/api/User/getUserData/useGetUserData'
import { IcSettings } from '@/shared/icons'
import defaultUserAvatar from '@images/default-user-avatar.svg'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import InfoProfileAccount from './InfoProfileAccount'
import ProfileBannerMask from './ProfileBannerMask'
import ProfileDetails from './ProfileDetails'
import ProfileLists from './ProfileLists'

const Profile = () => {
	const t = useTranslations()

	const search = useSearchParams()
	const params: {
		user_id?: number
		category?: 'favorites' | 'bids' | 'carfax' | 'orders' | 'vehicles'
	} = queryString.parse(search.toString())

	const [type, setType] = useState<
		'favorites' | 'bids' | 'carfax' | 'orders' | 'vehicles'
	>('favorites')

	useEffect(() => {
		if (params.category) setType(params.category)
	}, [params.category])

	const [isVisible, setIsVisible] = useState(false)

	const [userStatus, setUserStatus] = useState<undefined | string>(undefined)
	const [sort, setSort] = useState('auction_date')

	const { data: currentUser } = useGetUserData()
	const {
		data: user,
		isLoading,
		isFetchingNextPage,
		hasNextPage,
		refetch,
		isError,
		fetchNextPage,
	} = type === 'favorites'
		? useGetUserFavourites({ sort: Number(sort), user_id: params.user_id })
		: type === 'bids'
		? useGetUserBids({
				sort,
				user_id: params.user_id,
				user_status: userStatus,
		  })
		: type === 'orders'
		? useGetUserOrders({ user_id: params.user_id })
		: type === 'carfax'
		? useGetUserCarfax({ sort, user_id: params.user_id })
		: useGetUserProfileVehicles({ user_id: params.user_id })

	const isLogin = localStorage.getItem('access_token')
	const { push: path } = useRouter()

	useEffect(() => {
		if (!isLogin) {
			path('/login')
		}
	}, [isLogin, path])

	if (type === 'carfax' && user) {
		const pages = user.pages
		const lastPage = pages[pages.length - 1]?.data
		const isAddressAdded =
			lastPage?.user.delivery_info?.zip_code &&
			lastPage?.user.delivery_info?.address &&
			lastPage?.user.delivery_info?.country &&
			lastPage?.user.delivery_info?.state &&
			lastPage?.user.delivery_info?.city
	}

	return (
		<>
			<Helmet>
				<title>
					T-auto
					{user?.pages[user.pages.length - 1]?.data.user.first_name
						? ` | ${user.pages[user.pages.length - 1].data.user.first_name}`
						: ''}
				</title>
				<meta name='robots' content='noindex, nofollow' />
			</Helmet>
			<div className='mx-auto my-10 w-full max-w-[1400px] bg-white p-5 rounded-3xl'>
				<div className='mx-10 flex flex-col gap-y-4 max-md:mx-4'>
					{isLoading ? (
						<div className='w-full rounded-lg bg-t-profile-banner-bg shadow-xl min-h-52 py-10 px-16 max-md:px-4'>
							<div className='flex justify-between h-full items-center'>
								<div className='flex justify-between w-full items-center max-lg:flex-col gap-y-2 relative overflow-hidden'>
									<ProfileBannerMask />
								</div>
							</div>
						</div>
					) : (
						<div>
							{!isAddressAdded && <AddAddressBar />}
							<div
								className={`w-full min-h-auto rounded-3xl border-2 border-gray-400`}
							>
								<div className='flex w-full h-auto py-2 px-5 bg-blue-100 rounded-t-3xl font-medium text-lg text-gray-600'>
									{t('profile.profile')}
									<div
										className='ml-auto hover:animate-spin flex items-center justify-center cursor-pointer'
										onClick={() => path('/settings/personal-info')}
									>
										<IcSettings />
									</div>
								</div>
								<div className='flex justify-between h-full items-center py-5 px-6 max-sm:px-2'>
									<div className='flex justify-between w-full items-center max-lg:flex-col gap-y-2 relative overflow-hidden'>
										<div className='flex max-sm:flex-col gap-5 w-1/3 max-xl:max-w-xs items-center max-lg:w-full overflow-hidden max-lg:flex-col lg:w-auto xl:max-w-full'>
											<div>
												<img
													draggable={false}
													className='w-28 h-28 rounded-full select-none z-20 relative mb-2'
													src={defaultUserAvatar}
													alt=''
												/>
											</div>
											<div className='w-full'>
												<div className='text-2xl ml-2 py-1 text-black gap-4 max-md:text-3xl w-full max-md:gap-2 overflow-hidden text-ellipsis whitespace-nowrap'>
													{
														user?.pages[user.pages.length - 1].data.user
															.first_name
													}{' '}
													{
														user?.pages[user.pages.length - 1].data.user
															.last_name
													}
												</div>
												<div className='flex justify-center max-lg:my-2 lg:mt-2 w-full'>
													<button
														onClick={() => path('/deposit')}
														className={`btn btn-primary px-6 py-2 w-full`}
													>
														{t('profile.increaseBiddingPower')}
													</button>
												</div>
												{currentUser?.id !==
													user?.pages[user.pages.length - 1].data.user.id &&
													user?.pages[user.pages.length - 1].data.user
														.is_email_confirmed &&
													(currentUser?.is_superuser ||
														currentUser?.is_staff) && (
														<div className='flex justify-center items-center mt-2'>
															<button
																onClick={() => setIsVisible(true)}
																className='bg-blue-500 text-t-text-primary text-lg w-full btn px-4 py-2 hover:bg-blue-600 duration-100'
															>
																Send message
															</button>
														</div>
													)}
											</div>
										</div>
										<div className='max-md:flex-col max-md:gap-4 max-lg:items-center max-lg:flex gap-10 lg:hidden'>
											<div className='max-lg:flex max-lg:w-full max-lg:justify-start'>
												<ProfileDetails
													user={user?.pages[user.pages.length - 1].data.user}
													refetch={refetch}
												/>
											</div>
											<div className='max-lg:flex max-lg:w-full max-lg:justify-start'>
												<InfoProfileAccount
													user={user?.pages[user.pages.length - 1].data.user}
												/>
											</div>
										</div>
										<div className='max-lg:hidden'>
											<ProfileDetails
												user={user?.pages[user.pages.length - 1].data.user}
												refetch={refetch}
											/>
										</div>
										<div className='max-lg:hidden'>
											<InfoProfileAccount
												user={user?.pages[user.pages.length - 1].data.user}
											/>
										</div>

										<AdminPanelUserMessageModal
											isPhoneConfirmed={
												user?.pages[user.pages.length - 1].data.user
													.is_phone_confirmed
											}
											isVisible={isVisible}
											setIsVisible={setIsVisible}
											email={user?.pages[user.pages.length - 1].data.user.email}
											phone={
												user?.pages[user.pages.length - 1].data.user
													.phone_number
											}
											user_id={user?.pages[user.pages.length - 1].data.user.id}
										/>
									</div>
								</div>
							</div>
						</div>
					)}
					<div className='w-full grid grid-cols-5 gap-5 text-lg max-md:hidden'>
						<button
							onClick={() => {
								setSort('auction_date')
								setType('favorites')
							}}
							className={`flex items-center justify-center gap-x-2 rounded-full py-2 hover:bg-t-blue-light border-2 border-gray-400 hover:text-white hover:border-t-blue-light transition-color duration-300 ${
								type === 'favorites'
									? 'bg-t-blue-light text-white border-t-blue-light'
									: ''
							}`}
						>
							<span>{t('profile.favorites')}</span>
						</button>
						<button
							onClick={() => {
								setSort('auction_date')
								setType('bids')
							}}
							className={`flex items-center justify-center gap-x-2 rounded-full py-2 hover:bg-t-blue-light border-2 border-gray-400 hover:text-white hover:border-t-blue-light transition-color duration-300 ${
								type === 'bids'
									? 'bg-t-blue-light text-white border-t-blue-light'
									: ''
							}`}
						>
							<span>{t('profile.bids')}</span>
						</button>
						<button
							onClick={() => {
								setSort('auction_date')
								setType('carfax')
							}}
							className={`flex items-center justify-center gap-x-2 rounded-full py-2 hover:bg-t-blue-light border-2 border-gray-400 hover:text-white hover:border-t-blue-light transition-color duration-300 ${
								type === 'carfax'
									? 'bg-t-blue-light text-white border-t-blue-light'
									: ''
							}`}
						>
							<span>{t('profile.carfax')}</span>
						</button>
						<button
							onClick={() => {
								setSort('auction_date')
								setType('orders')
							}}
							className={`flex items-center justify-center gap-x-2 rounded-full py-2 hover:bg-t-blue-light border-2 border-gray-400 hover:text-white hover:border-t-blue-light transition-color duration-300 ${
								type === 'orders'
									? 'bg-t-blue-light text-white border-t-blue-light'
									: ''
							}`}
						>
							<span>{t('profile.orders')}</span>
						</button>
						<button
							onClick={() => {
								setSort('auction_date')
								setType('vehicles')
							}}
							className={`flex items-center justify-center gap-x-2 rounded-full py-2 hover:bg-t-blue-light border-2 border-gray-400 hover:text-white hover:border-t-blue-light transition-color duration-300 ${
								type === 'vehicles'
									? 'bg-t-blue-light text-white border-t-blue-light'
									: ''
							}`}
						>
							<span>{'Vehicles'}</span>
						</button>
					</div>
					<MobileProfileToggle type={type} setType={setType} />
					<div className='w-full gap-x-6 flex'>
						<div className='w-full rounded-2xl border-2 border-gray-400 flex flex-col'>
							<ProfileLists
								type={type}
								pages={user?.pages}
								isLoading={isLoading}
								fetchNextPage={fetchNextPage}
								isFetchingNextPage={isFetchingNextPage}
								hasNextPage={hasNextPage}
								isError={isError}
								setSort={setSort}
								sort={sort}
								userStatus={userStatus}
								setUserStatus={setUserStatus}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
