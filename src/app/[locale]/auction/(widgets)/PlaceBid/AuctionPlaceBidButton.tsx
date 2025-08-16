import { useAuctionMakeBid } from '@/shared/api/auction/makeBid/useMakeBid'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface IPlaceBidButton {
	amount: number
	auction_id: number
}

const AuctionPlaceBidButton: FC<IPlaceBidButton> = ({ amount, auction_id }) => {
	const t = useTranslations()
	const { push: path } = useRouter()

	const makeBid = useAuctionMakeBid({
		// onSuccessFn: () => {
		// 	toast.success(t('shop.auction.successBed'))
		// },
	})

	const onSubmit = async () => {
		await makeBid.mutateAsync({ params: { id: auction_id, amount: amount } })
		return
	}

	return (
		<>
			{localStorage.getItem('access') ? (
				<button
					onClick={() => onSubmit()}
					className='bg-t-blue-light hover:bg-t-blue-light/85 duration-100 rounded-2xl w-full flex justify-center py-2 mt-2 text-t-text-primary text-xl'
				>
					{t('lot.bidBox.placeBid')}
				</button>
			) : (
				<button
					onClick={() => path('/login')}
					className='text-center w-full py-2 rounded-2xl bg-t-blue-light hover:bg-t-blue-light/85 duration-100 text-t-text-primary text-lg mt-2'
				>
					{t('lot.bidBox.loginToBid')}
				</button>
			)}
		</>
	)
}

export default AuctionPlaceBidButton
