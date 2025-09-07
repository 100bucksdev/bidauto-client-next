'use client'

import LotMask from '@/components/LotMask/LotMask'
import { useAuctionConnect } from '@/shared/api/auction/ws/connect/AuctionConnect'
import { useGetShopVehicleById } from '@/shared/api/Shop/getShopVehicleById/useGetShopVehiclesById'
import { useGetUserData } from '@/shared/api/User/getUserData/useGetUserData'
import { ISocetLastBid } from '@/types/Auction.interface'
import { useEffect, useState } from 'react'
import AuctionVehicleMain from '../(widgets)/AuctiomVehicleMain'
import AuctionLotHeader from '../(widgets)/AuctionLotHeader'
import AuctionLotSidebar from '../(widgets)/AuctionLotSideBar'
import AuctionStartedSideBar from '../(widgets)/AuctionStartedSideBar'
import AuctionEndedModal from '../(widgets)/EndedModal'
import AuctionWinerModal from '../(widgets)/WinerModal'

interface AuctionByIdPageProps {
	id: string
}

const AuctionByIdPage = ({ id }: AuctionByIdPageProps) => {
	const { data, isLoading } = useGetShopVehicleById({ id: Number(id) })
	const [isWinerModal, setIsWinerModal] = useState(false)
	const [isEndedModal, setEndedModal] = useState(false)
	const userId = useGetUserData()

	const vehicle = data?.data
	const auctionId = vehicle?.auction?.id ?? 0
	const nowDate = new Date()
	const startTime = vehicle?.auction?.start_time
		? new Date(vehicle.auction.start_time)
		: null
	const endTime = vehicle?.auction?.end_time
		? new Date(vehicle.auction.end_time)
		: null

	const isAvailable =
		startTime &&
		endTime &&
		nowDate >= startTime &&
		nowDate <= endTime &&
		vehicle?.auction?.is_auction_active === true

	const WS = useAuctionConnect(auctionId)

	const lastBid = WS.messages.find(message => message.type === 'last_bid') as
		| ISocetLastBid
		| undefined
	const newBid = WS.messages.filter(message => message.type === 'new_bid').pop()
	const isWiner = WS.messages.find(
		message => message.type === 'auction_ended'
	) as { final_bid: number; user_id: number } | undefined

	const user_id = userId.data?.id ?? 0

	useEffect(() => {
		if (isWiner) {
			if (isWiner.user_id === user_id) {
				setIsWinerModal(true)
				setEndedModal(false)
			} else {
				setEndedModal(true)
				setIsWinerModal(false)
			}
		} else {
			setIsWinerModal(false)
			setEndedModal(false)
		}
	}, [isWiner, user_id])

	if (isAvailable === null) return null

	return (
		<>
			<div
				className={`flex w-full h-auto bg-white py-10 ${
					isLoading ? 'justify-center' : ''
				}`}
			>
				{isLoading ? (
					<LotMask />
				) : data && vehicle ? (
					<div className='mx-auto max-w-[1400px] w-full'>
						<div className='mx-10 max-md:mx-4'>
							<div className='mb-6 max-lg:mb-4'>
								<AuctionLotHeader vehicle={vehicle} />
							</div>
							<div className='flex max-lg:flex-col-reverse max-lg:gap-y-4 gap-x-6'>
								<div className='w-[65%] max-lg:w-full'>
									<AuctionVehicleMain
										vehicle={vehicle}
										isAvailable={isAvailable}
										isConnect={WS.isConnected}
										last_bid={lastBid?.last_bid}
										new_bid={newBid}
									/>
								</div>
								<div className='w-[35%] max-lg:w-full'>
									{isAvailable ? (
										<AuctionStartedSideBar
											vehicle={vehicle}
											isConnect={WS.isConnected}
											last_bid={lastBid?.last_bid}
											new_bid={newBid?.bid}
											makeConn={() => WS.connectSocket()}
										/>
									) : (
										<AuctionLotSidebar vehicle={vehicle} />
									)}
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className='justify-center font-semibold flex text-5xl rounded-lg mx-auto max-w-[1100px] w-full bg-white py-10'>
						{'Vehicle Not Found'}
					</div>
				)}
			</div>
			{isWinerModal && (
				<AuctionWinerModal
					isVisible={isWinerModal}
					setIsVisible={setIsWinerModal}
				/>
			)}
			{isEndedModal && (
				<AuctionEndedModal
					isVisible={isEndedModal}
					setIsVisible={setEndedModal}
				/>
			)}
		</>
	)
}

export default AuctionByIdPage
