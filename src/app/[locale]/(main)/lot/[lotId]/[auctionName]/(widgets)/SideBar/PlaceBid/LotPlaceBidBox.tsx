'use client'

import { useGetUserData } from '@/shared/api/User/getUserData/useGetUserData'
import { useBiddingTimeLeft } from '@/shared/hooks/useBiddingTimeLeft'
import { IcDollarCircle } from '@/shared/icons'
import { TLot } from '@/types/Lot.interface'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { FiMinus } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import LotAdmInfoModal from './LotAdmInfoModal'
import PlaceBetModal from './PlaceBetModal'
import PlaceBidButton from './PlaceBidButton'

const LotPlaceBidBox = ({
	lot,
	setLotBid,
	lotBid,
	price,
	error,
	setType,
	type,
}: {
	lot: TLot
	setLotBid: Dispatch<SetStateAction<number>>
	lotBid: number
	price: number
	error: string
	setType: (data: 'yourBid' | 'fastBuy') => void | undefined
	type: 'yourBid' | 'fastBuy'
}) => {
	const [isPlaceBet, setIsPlaceBet] = useState(false)
	const path = useRouter()
	const t = useTranslations()

	const userData = useGetUserData()

	const { is_superuser, is_staff, bids } = userData.data || {}

	const [isAdmInfoOpen, setIsAdmInfoOpen] = useState<boolean>(false)

	const [isAlreadyPlaced, setIsAlreadyPlaced] = useState(
		bids
			? bids
					.map(el => el.lot_id)
					.includes(lot.Auction === 'IAAI' ? `1_${lot.Stock}` : `0_${lot.U_ID}`)
			: false
	)

	const saleDate = new Date(lot.AuctionDate)
	const timeLeft = useBiddingTimeLeft(saleDate.getTime())

	const isArchived = lot.Archived

	const decreaseBid = () => {
		if (type !== 'yourBid') {
			setType && setType('yourBid')
		}

		switch (true) {
			case lotBid < 1000:
				setLotBid(prev => prev - 25)
				break
			case lotBid >= 1000 && lotBid < 5000:
				setLotBid(prev => prev - 50)
				break
			case lotBid >= 5000 && lotBid < 25_000:
				setLotBid(prev => prev - 100)
				break
			case lotBid >= 25_000:
				setLotBid(prev => prev - 250)
				break
		}
	}

	const increaseBid = () => {
		if (type !== 'yourBid') {
			setType && setType('yourBid')
		}

		switch (true) {
			case lotBid < 1000:
				setLotBid(prev => prev + 25)
				break
			case lotBid >= 1000 && lotBid < 5000:
				setLotBid(prev => prev + 50)
				break
			case lotBid >= 5000 && lotBid < 25_000:
				setLotBid(prev => prev + 100)
				break
			case lotBid >= 25_000:
				setLotBid(prev => prev + 250)
				break
		}
	}

	const roundBid = (value: number | undefined) => {
		if (!value) return 0

		if (type !== 'yourBid') {
			setType && setType('yourBid')
		}

		const isRound = (num: number, step: number) => num % step === 0

		switch (true) {
			case value < 100:
				return value
			case value >= 100 && value < 1000:
				return isRound(value, 25) ? value : Math.ceil(value / 25) * 25
			case value >= 1000 && value < 5000:
				return isRound(value, 50) ? value : Math.ceil(value / 50) * 50
			case value >= 5000 && value < 25000:
				return isRound(value, 100) ? value : Math.ceil(value / 100) * 100
			case value >= 25000:
				return isRound(value, 250) ? value : Math.ceil(value / 250) * 250
			default:
				return value
		}
	}

	return (
		<>
			<div className='p-4 bg-white rounded-2xl border-2 border-gray-300'>
				<div>
					<div className='flex items-center gap-x-3 max-md:gap-x-1 pb-3 font-semibold'>
						<div className='text-3xl max-md:text-2xl'>
							<IcDollarCircle />
						</div>
						<div className='text-xl max-md:text-xl'>
							{t('lot.bidBox.bidding')}
						</div>
					</div>
				</div>
				<div className='flex w-full justify-center'>
					<button
						onClick={decreaseBid}
						className='text-xl border rounded-l-xl w-10 h-10 p-2 flex items-center justify-center border-slate-400'
					>
						<FiMinus />
					</button>
					<input
						value={`$${lotBid}`}
						onChange={e => {
							const value = e.target.value.replace(/\D/g, '')
							if (value) {
								setLotBid(Number(value))
							} else {
								setLotBid(0)
							}
						}}
						onBlur={() => {
							setLotBid(prev => roundBid(prev))
						}}
						maxLength={7}
						onKeyDown={e => {
							if (
								!/\d/.test(e.key) &&
								e.key !== 'Backspace' &&
								e.key !== 'Delete'
							) {
								e.preventDefault()
							}
						}}
						className='border-y outline-none w-full text-center border-slate-400'
						type='text'
					/>
					<button
						onClick={increaseBid}
						className='text-xl border rounded-r-xl w-10 h-10 p-2 flex items-center justify-center border-slate-400'
					>
						<GoPlus />
					</button>
				</div>
				<PlaceBidButton
					isAlreadyPlaced={isAlreadyPlaced}
					error={error}
					bids={bids ? bids : []}
					lot={lot}
					isArchived={isArchived}
					lotBid={lotBid}
					price={price}
					setIsPlaceBet={setIsPlaceBet}
					timeLeft={timeLeft}
				/>
				<div
					className={`text-center text-green-500 mt-2 ${!timeLeft && 'hidden'}`}
				>
					{timeLeft}
				</div>
				{(is_superuser || is_staff) && (
					<div className='mt-5'>
						<button
							onClick={() => {
								path.push(
									`/admin/orders/create?id=${
										lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID
									}&auction_name=${lot.Auction}`
								)
							}}
							className='w-full bg-blue-500 py-3 hover:bg-blue-600 active:scale-95 duration-100 rounded-2xl text-lg text-t-text-primary'
						>
							{t('lot.bidBox.createOrder')}
						</button>
						<button
							onClick={() => {
								setIsAdmInfoOpen(true)
							}}
							className='w-full mt-3 bg-blue-500 py-3 hover:bg-blue-600 active:scale-95 duration-100 rounded-2xl text-lg text-t-text-primary'
						>
							Get info
						</button>
					</div>
				)}
			</div>
			{isAdmInfoOpen ? (
				<LotAdmInfoModal
					isVisible={isAdmInfoOpen}
					setIsVisible={setIsAdmInfoOpen}
					lot_id={lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID}
					auction={lot.Auction}
				/>
			) : null}
			<PlaceBetModal
				setIsAlreadyPlaced={setIsAlreadyPlaced}
				bid_amount={lotBid}
				isVisible={isPlaceBet}
				setIsVisible={setIsPlaceBet}
				lot_id={lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID}
				auction={lot.Auction}
			/>
		</>
	)
}

export default LotPlaceBidBox
