import Modal from '@/shared/ui/Modal'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Dispatch, FC, SetStateAction } from 'react'

interface IPlaceBitModal {
	isVisible: boolean
	setIsVisible: Dispatch<SetStateAction<boolean>>
}

const AuctionWinerModal: FC<IPlaceBitModal> = ({ isVisible, setIsVisible }) => {
	const { push: path } = useRouter()
	const t = useTranslations()
	return (
		<Modal centerChildren isVisible={isVisible} setIsVisible={setIsVisible}>
			<div className='bg-white w-full rounded-lg shadow-xl text-black py-4 flex flex-col justify-center text-center p-5'>
				<h1 className='font-semibold text-2xl'>
					{t('shop.auction.modal.winner.text1')}
				</h1>
				<h3 className='font-medium'>{t('shop.auction.modal.winner.text2')}</h3>
				<p>{t('shop.auction.modal.warning')}</p>
				<button
					className='btn bg-t-blue-light mt-5 py-3 text-white'
					onClick={() => path('/user')}
				>
					Go to profile
				</button>
			</div>
		</Modal>
	)
}

export default AuctionWinerModal
