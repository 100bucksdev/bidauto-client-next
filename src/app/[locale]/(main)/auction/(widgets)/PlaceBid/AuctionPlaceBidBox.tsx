import { IcDollarCircle } from '@/shared/icons'
import { priceFormat } from '@/shared/utils/priceFormat'
import { ISocetLastBid } from '@/types/Auction.interface'
import { IShopVehicle } from '@/types/Shop.interface'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { FaWifi } from 'react-icons/fa'
import { FiMinus } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import AuctionPlaceBidButton from './AuctionPlaceBidButton'

const AuctionPlaceBidBox = ({
	vehicle,
	isConnect,
	last_bid,
	new_bid,
	makeConn,
}: {
	vehicle: IShopVehicle
	isConnect: boolean
	last_bid: ISocetLastBid | undefined
	new_bid: number | undefined
	makeConn: () => void
}) => {
	const t = useTranslations()
	const roundBid = (value: number | undefined) => {
		if (!value) return 0

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

	const auctionId = vehicle.auction?.id ? vehicle.auction.id : 0
	const priceFormatter = priceFormat({ char: 'USD' })

	const minBid = roundBid(vehicle?.auction?.min_bid) ?? 0
	const [lotBid, setLotBid] = useState<number>(minBid)

	useEffect(() => {
		if (last_bid && last_bid.amount) {
			setLotBid(roundBid(last_bid.amount))
		}
	}, [last_bid])

	useEffect(() => {
		if (new_bid) {
			setLotBid(roundBid(new_bid))
		}
	}, [new_bid])

	const decreaseBid = () => {
		if (lotBid <= minBid) return

		switch (true) {
			case lotBid < 1000:
				setLotBid(prev => roundBid(prev - 25))
				break
			case lotBid >= 1000 && lotBid < 5000:
				setLotBid(prev => roundBid(prev - 50))
				break
			case lotBid >= 5000 && lotBid < 25_000:
				setLotBid(prev => roundBid(prev - 100))
				break
			case lotBid >= 25_000:
				setLotBid(prev => roundBid(prev - 250))
				break
		}
	}

	const increaseBid = () => {
		switch (true) {
			case lotBid < 1000:
				setLotBid(prev => roundBid(prev + 25))
				break
			case lotBid >= 1000 && lotBid < 5000:
				setLotBid(prev => roundBid(prev + 50))
				break
			case lotBid >= 5000 && lotBid < 25_000:
				setLotBid(prev => roundBid(prev + 100))
				break
			case lotBid >= 25_000:
				setLotBid(prev => roundBid(prev + 250))
				break
		}
	}

	const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '')
		if (value) {
			setLotBid(Number(value))
		} else {
			setLotBid(0)
		}
	}

	return (
		<>
			<div className='p-4 bg-white rounded-2xl border-2 border-gray-300'>
				<div className='flex items-center gap-x-3 max-md:gap-x-1 pb-3 font-semibold'>
					<div className='text-3xl max-md:text-2xl'>
						<IcDollarCircle />
					</div>
					<div className='text-xl max-md:text-xl'>
						{t('lot.bidBox.bidding')}
					</div>
					<div
						className={`ml-auto flex gap-1 ${
							isConnect ? 'text-green-500' : 'text-gray-500'
						}`}
					>
						<FaWifi />
						<span>
							{isConnect
								? t('shop.auction.status.connected')
								: t('shop.auction.status.notConnected')}
						</span>
					</div>
				</div>

				{isConnect ? (
					<>
						{new_bid ? (
							<div className='w-full flex justify-center font-medium text-lg'>
								{t('shop.auction.highestBid')}:{' '}
								{priceFormatter.format(Number(new_bid))}
							</div>
						) : last_bid && last_bid.amount ? (
							<div className='w-full flex justify-center font-medium text-lg'>
								{t('shop.auction.highestBid')}:{' '}
								{priceFormatter.format(Number(last_bid.amount))}
							</div>
						) : null}

						<div className='flex w-full justify-center'>
							<button
								onClick={decreaseBid}
								className='text-xl border rounded-l-xl w-10 h-10 p-2 flex items-center justify-center border-slate-400'
								disabled={lotBid <= minBid}
							>
								<FiMinus />
							</button>
							<input
								value={`$${lotBid}`}
								onChange={handleBidChange}
								onBlur={() => setLotBid(roundBid(lotBid))}
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
						<AuctionPlaceBidButton amount={lotBid} auction_id={auctionId} />
					</>
				) : (
					<>
						<button
							onClick={() => makeConn()}
							className='bg-t-blue-light hover:bg-t-blue-light/85 duration-100 rounded-2xl w-full flex justify-center py-2 mt-2 text-t-text-primary text-xl'
						>
							{t('shop.auction.makeConnection')}
						</button>
					</>
				)}
			</div>
		</>
	)
}

export default AuctionPlaceBidBox
