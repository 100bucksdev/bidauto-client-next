'use client'

import { usePlaceBid } from '@/shared/api/Lots/bid/postBid/usePlaceBid'
import { useTermsSchema } from '@/shared/hooks/ZodSchemaHooks'

import AgreeWithTerms from '@/shared/ui/AgreeWithTerms'
import CircleLoader from '@/shared/ui/CircleLoader'
import Modal from '@/shared/ui/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'

interface IPlaceBetModal {
	isVisible: boolean
	setIsVisible: Dispatch<SetStateAction<boolean>>
	auction: 'COPART' | 'IAAI'
	bid_amount: number
	lot_id: string
	setIsAlreadyPlaced: Dispatch<SetStateAction<boolean>>
}

const PlaceBetModal: FC<IPlaceBetModal> = ({
	isVisible,
	setIsVisible,
	lot_id,
	bid_amount,
	auction,
	setIsAlreadyPlaced,
}) => {
	const t = useTranslations()
	const TermsSchema = useTermsSchema()
	const {
		formState: { errors },
		setValue,
		handleSubmit,
		setError,
	} = useForm<{ terms: boolean }>({
		resolver: zodResolver(TermsSchema),
	})
	const bidLot = usePlaceBid()

	console.log('errors', bidLot.error, bidLot.data)

	useEffect(() => {
		if (bidLot.isError) {
			const backendMessage =
				(bidLot.error as any)?.response?.data?.message ||
				(bidLot.error as any)?.response?.data?.[0]

			setError('terms', {
				type: 'custom',
				message: backendMessage || t('lot.bidBox.modal.error'),
			})
		}
	}, [bidLot.isError, bidLot.error, setError, t])

	useEffect(() => {
		if (bidLot.isSuccess) {
			setIsAlreadyPlaced(true)
			setIsVisible(false)
		}
	}, [bidLot.isSuccess, setIsAlreadyPlaced, setIsVisible])
	const onSubmit = async () => {
		await bidLot.mutateAsync({
			params: {
				lot_id,
				auction,
				bid_amount,
			},
		})
		return
	}

	return (
		<Modal centerChildren isVisible={isVisible} setIsVisible={setIsVisible}>
			<div className='bg-white w-full rounded-lg shadow-xl text-black py-4'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='px-4'>
						<div className='text-xl font-semibold text-center'>
							{t('lot.bidBox.placeBid')}
						</div>
						<div className='text-center mb-2 text-gray-500'>
							{t('lot.bidBox.modal.text1')} {bid_amount}$
						</div>
						<div className='my-2 bg-gray-200 rounded-md p-2 text-base'>
							{t('lot.bidBox.modal.text2')}
						</div>
						<div className='bg-red-500 rounded-md text-t-text-primary p-2 mb-1'>
							<div className='font-semibold'>{t('lot.bidBox.modal.text3')}</div>
							{t('lot.bidBox.modal.text4')}
							{' ('}
							<a
								href={`${
									auction?.toUpperCase() === 'COPART'
										? `${process.env.NEXT_REACT_APP_COPART_DOMEN}/lot/${lot_id}`
										: auction?.toUpperCase() === 'IAAI'
										? `${process.env.NEXT_REACT_APP_IAAI_DOMEN}/Search?Keyword=${lot_id}`
										: ''
								}`}
								target='_blank'
								className='text-blue-700 hover:underline'
							>
								{t('lot.bidBox.modal.text5')}
							</a>
							{') '}
							{t('lot.bidBox.modal.text6')}
						</div>
						<AgreeWithTerms
							setValue={setValue}
							name='terms'
							error={errors.terms}
						/>
					</div>
					<hr className='my-3' />
					<div className='flex justify-between px-4'>
						<div>
							<button
								type='button'
								onClick={() => setIsVisible(false)}
								className='bg-red-500 text-lg active:scale-95 max-md:text-base hover:bg-red-600 duration-100 text-t-text-primary rounded-md pl-3 pr-4 py-2 flex items-center gap-x-1'
							>
								<span>
									<RxCross2 />
								</span>
								<span>{t('lot.bidBox.modal.text7')}</span>
							</button>
						</div>
						<div>
							<button
								type='submit'
								className='bg-blue-500 max-md:text-base min-h-[44px] text-t-text-primary flex justify-center items-center px-8 py-2 rounded-md text-lg active:scale-95 duration-100 hover:bg-blue-600'
							>
								{bidLot.isPending ? (
									<CircleLoader />
								) : (
									<span>{t('lot.bidBox.modal.text8')}</span>
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		</Modal>
	)
}

export default PlaceBetModal
