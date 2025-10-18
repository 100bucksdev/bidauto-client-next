import { priceFormat } from '@/shared/utils/priceFormat'
import { TLot } from '@/types/Lot.interface'
import { IUserBid } from '@/types/User.interface'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Dispatch, FC, SetStateAction } from 'react'

interface IPlaceBidButton {
	lot: TLot
	isArchived: boolean
	timeLeft: string | false
	error: string
	lotBid: number
	price: number
	setIsPlaceBet: Dispatch<SetStateAction<boolean>>
	isAlreadyPlaced: boolean
	bids: IUserBid[]
}

const PlaceBidButton: FC<IPlaceBidButton> = ({
	lot,
	isArchived,
	timeLeft,
	error,
	lotBid,
	price,
	setIsPlaceBet,
	isAlreadyPlaced,
	bids,
}) => {
	const path = useRouter()
	const t = useTranslations()
	const priceFormatter = priceFormat({ char: 'USD' })

	const bid = bids.find(
		el =>
			el.lot_id ===
			String(lot.Auction === 'IAAI' ? `1_${lot.Stock}` : `0_${lot.U_ID}`)
	)

	const is = true

	return (
		<>
			{is ? (
				<>
					{bids && isAlreadyPlaced ? (
						<div className='mt-2'>
							{!!bid?.higher_bid && (
								<div className='w-full border-2 mt-5 border-red-500 text-red-600 px-4 rounded-2xl py-1 text-center text-xl mb-2'>
									{t('lot.bidBox.outbid')}:{' '}
									{priceFormatter.format(bid.higher_bid)}
								</div>
							)}
							<div className='w-full bg-blue-100 rounded-2xl py-2 text-center text-xl text-t-blue-light mt-3'>
								{t('lot.bidBox.yourBid')}:{' '}
								{priceFormatter.format(bid?.amount || 0)}
							</div>
						</div>
					) : (
						''
					)}
					<>
						{(lot.Auction === 'COPART' &&
							!lot.auctions_statuses.copart_available) ||
						(lot.Auction === 'IAAI' &&
							!lot.auctions_statuses.iaai_available) ? (
							<div className='bg-red-600 rounded-2xl w-full flex justify-center py-2 mt-2 text-t-text-primary text-xl'>
								{lot.Auction} {t('lot.bidBox.notAvailable')}
							</div>
						) : (
							<>
								{!isArchived &&
									timeLeft &&
									!error &&
									lotBid > price &&
									(lot.Auction?.toUpperCase() === 'COPART' ||
										lot.Auction?.toUpperCase() === 'IAAI') && (
										<button
											onClick={() => setIsPlaceBet(true)}
											className='bg-t-blue-light hover:bg-t-blue-light/85 duration-100 rounded-2xl w-full flex justify-center py-2 mt-2 text-t-text-primary text-xl'
										>
											{isAlreadyPlaced
												? t('lot.bidBox.changeBid')
												: t('lot.bidBox.placeBid')}
										</button>
									)}
							</>
						)}
					</>
				</>
			) : (
				<button
					onClick={() => path.push('/login')}
					className='text-center w-full py-2 rounded-2xl bg-t-blue-light hover:bg-t-blue-light/85 duration-100 text-t-text-primary text-lg mt-2'
				>
					{t('lot.bidBox.loginToBid')}
				</button>
			)}
		</>
	)
}

export default PlaceBidButton
