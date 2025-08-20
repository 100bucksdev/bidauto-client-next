import { useReservationChekcout } from '@/shared/api/Shop/reservationChekcout/useReservationChekcout'
import AgreeWithTerms from '@/shared/ui/AgreeWithTerms'
import Checkbox from '@/shared/ui/Checkbox'
import CircleLoader from '@/shared/ui/CircleLoader'
import Modal, { IModalProps } from '@/shared/ui/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { IoBookmarkOutline } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import { z } from 'zod'

interface IFormFields {
	terms: boolean
	agree: boolean
}

const ConfirmReservationModal = ({
	isVisible,
	setIsVisible,
	id,
}: IModalProps & { id: number }) => {
	const shopVehicleReservationCheckout = useReservationChekcout({
		options: {
			onSuccess: () => {
				setIsVisible(false)
			},
		},
	})

	const t = useTranslations()

	const {
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormFields>({
		resolver: zodResolver(
			z.object({
				terms: z.boolean({
					error: 'You must agree with terms of use',
				}),
				agree: z.boolean({
					error: 'You must agree with non-refundable deposit',
				}),
			})
		),
		defaultValues: { agree: true },
	})

	const onSubmit = async () => {
		await shopVehicleReservationCheckout.mutateAsync({
			params: {
				id: id,
			},
		})
	}

	return (
		<Modal centerChildren isVisible={isVisible} setIsVisible={setIsVisible}>
			<div className='bg-white h-full text-black rounded-lg p-3 mx-auto w-full'>
				<div className='text-xl text-center'>
					{t('shop.reservation.makeReservation')}
				</div>
				<div className='text-center text-gray-400'>
					{t('shop.reservation.modal.text1')}
				</div>
				<div className='bg-gray-200 py-3 px-4 rounded-lg mt-2'>
					{t('shop.reservation.modal.text2')}
				</div>
				<div className='py-3 pb-2 px-6'>
					<AgreeWithTerms
						error={errors.terms}
						name='terms'
						setValue={setValue}
					/>
					<div className='mt-3'>
						<div className={`${!!errors.agree && 'mb-2'}`}>
							<Checkbox
								defaultChecked
								name='agree'
								onChange={e => {
									setValue('agree', e.target.checked)
								}}
							>
								<div className='inline ml-3'>
									{t('shop.reservation.modal.agreement')}
								</div>
							</Checkbox>
						</div>
						{errors.agree && (
							<span className='text-red-500 flex'>{errors.agree?.message}</span>
						)}
					</div>
				</div>
				<div className={`flex flex-row-reverse justify-between gap-y-2 mt-4`}>
					<div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<button
								type='submit'
								className={`text-lg flex justify-center min-h-[44px] w-fullduration-100 px-6 py-2 btn btn-success w-[240px]`}
							>
								{shopVehicleReservationCheckout.isPending ? (
									<CircleLoader />
								) : (
									<div className='flex gap-x-2 items-center'>
										<span>
											<IoBookmarkOutline />
										</span>
										{t('shop.reservation.makeReservation')}
									</div>
								)}
							</button>
						</form>
					</div>
					<div>
						<button
							type='button'
							onClick={() => setIsVisible(false)}
							className={`w-full btn btn-error text-lg justify-center pl-3 pr-4 py-2 flex items-center gap-x-1`}
						>
							<span>
								<RxCross2 />
							</span>
							<span>Cancel</span>
						</button>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default ConfirmReservationModal
