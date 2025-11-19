import { MRegPopUpFromRightToLeft } from '@/assets/animation/PopUp.animation'
import { $Pages } from '@/config/router.config'
import { useSendSms } from '@/shared/api/phone/send/useSendSms'
import { useVerifyPhone } from '@/shared/api/phone/verify/useVerifyPhone'
import { useCodeSchema } from '@/shared/hooks/ZodSchemaHooks'
import CircleLoader from '@/shared/ui/CircleLoader'
import Input from '@/shared/ui/Input'
import { userStore } from '@/store/user.sore'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const RegistrationPhoneConfirm = memo(
	({ phone, email }: { phone: string; email: string }) => {
		const t = useTranslations()
		const { push: path } = useRouter()
		const [timer, setTimer] = useState(59)
		const userInReg = userStore(state => state.user)

		useEffect(() => {
			const timer = setInterval(() => {
				setTimer(prev => (prev > 0 ? prev - 1 : 0))
			}, 1000)

			return () => clearInterval(timer)
		}, [])

		const CodeSchema = useCodeSchema()

		const {
			register,
			formState: { errors },
			handleSubmit,
			setError,
		} = useForm<{ code: string }>({ resolver: zodResolver(CodeSchema) })

		const sendSms = useSendSms()
		const verifyPhoneNumber = useVerifyPhone({
			options: {
				onSuccess: () => {
					path($Pages.CLIENT.AUTH.LOGIN)
				},
				onError: (data: any) => {
					setError
						? setError('code', { message: data.response.data.non_field_errors })
						: null
				},
			},
		})

		useEffect(() => {
			if (phone) {
				const button = document.createElement('button')
				button.style.display = 'none'
				button.onclick = () => {
					sendSms.mutate({ params: { userUUID: userInReg.phone_number } })
					button.remove()
				}
				document.body.appendChild(button)
				button.click()
			}
		}, [phone, email])

		const onSubmit = async (fields: { code: string }) => {
			await verifyPhoneNumber.mutateAsync({
				params: {
					userUUID: userInReg.uuid_key,
					code: fields.code,
				},
			})
			return
		}

		return (
			<motion.div
				initial='from'
				animate='to'
				exit='exit'
				variants={MRegPopUpFromRightToLeft}
				transition={{ duration: 0.1, delay: 0.1 }}
				className='absolute w-full'
			>
				<div>
					<div className='flex justify-center text-xl font-semibold mb-4'>
						{`${t('auth.verificationCode')} ${phone.slice(0, -4)}XXXX. ${t(
							'auth.confirmPhone'
						)}`}
					</div>
					<form
						className='flex flex-col relative w-full items-end gap-x-2'
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='w-full mb-5'>
							<Input
								register={register}
								error={errors.code}
								label={`${t('auth.code')}*`}
								name='code'
								placeholder={t('auth.codePlaceholder')}
								autoComplete='off'
								type='text'
								style={{ textTransform: 'uppercase' }}
							/>
						</div>
						<button
							className='bg-t-blue-light h-12 text-t-text-primary text-lg rounded-full hover:bg-t-blue-light/90 w-full duration-100 px-4 flex justify-center items-center'
							type='submit'
						>
							{verifyPhoneNumber.isPending ? (
								<CircleLoader />
							) : (
								<>
									<div className='max-md:hidden'>{t('auth.verifyPhone')}</div>
									<div className='md:hidden'>{t('auth.verify')}</div>
								</>
							)}
						</button>
					</form>
					<div className='md:flex mt-6'>
						<div className='flex text-lg justify-center md:absolute md:w-full'>
							<button
								onClick={() => {
									if (timer <= 0) {
										sendSms.mutate({
											params: { userUUID: userInReg.phone_number },
										})
										setTimer(59)
									}
								}}
								disabled={timer > 0}
							>
								<div
									className={`text-blue-500 ${
										timer <= 0 ? '' : 'text-opacity-60'
									}`}
								>
									<div>{t('auth.sendNew')}</div>
									<div>{`${timer > 0 ? `${timer}s` : ''}`}</div>
								</div>
							</button>
						</div>
						<div className='flex justify-center w-full md:hidden'>
							<hr className='border border-black w-[52px] my-4 border-opacity-40' />
						</div>
						<div className='text-opacity-60 z-10 justify-center text-black flex items-end'>
							<button onClick={() => path($Pages.CLIENT.AUTH.LOGIN)}>
								{t('auth.confirmLater')}
							</button>
						</div>
					</div>
				</div>
			</motion.div>
		)
	}
)

export default RegistrationPhoneConfirm
