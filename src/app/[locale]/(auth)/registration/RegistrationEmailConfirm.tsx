import { useSendEmail } from '@/shared/api/mail/send/useSendMail'
import { useVerifyMail } from '@/shared/api/mail/verify/useVerifyMail'
import { useCodeSchema } from '@/shared/hooks/ZodSchemaHooks'
import CircleLoader from '@/shared/ui/CircleLoader'
import Input from '@/shared/ui/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const RegistrationEmailConfirm = ({
	setStep,
	email,
}: {
	setStep: Dispatch<SetStateAction<0 | 1 | 2>>
	email: string
}) => {
	const t = useTranslations()
	const [timer, setTimer] = useState(59)

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

	const sendMail = useSendEmail()
	const verifyMail = useVerifyMail({
		options: {
			onSuccess: data => {
				localStorage.setItem('access_token', data.data.access)
				setStep ? setStep(2) : null
			},
			onError: (data: any) => {
				setError
					? setError('code', { message: data.response.data.non_field_errors })
					: null
			},
		},
	})

	useEffect(() => {
		sendMail.mutateAsync({ params: { email } })
	}, [])

	const onSubmit = async (fields: { code: string }) => {
		await verifyMail.mutateAsync({ params: { email, code: fields.code } })
		return
	}

	return (
		<div>
			<div className='flex justify-center text-xl font-semibold mb-4'>
				{`${t('auth.verificationCode')} ${email}. ${t('auth.confirmEmail')}`}
			</div>
			<form
				className='flex flex-col relative w-full items-end gap-x-2'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='w-full mb-5'>
					<Input
						error={errors.code}
						register={register}
						name='code'
						type='text'
						label={`${t('auth.code')}*`}
						placeholder={t('auth.codePlaceholder')}
						autoComplete='off'
						style={{ textTransform: 'uppercase' }}
					/>
				</div>
				<button
					className='bg-t-blue-light h-12 text-t-text-primary text-lg rounded-full hover:bg-t-blue-light/90 w-full duration-100 px-4 flex justify-center items-center'
					type='submit'
				>
					{verifyMail.isPending ? (
						<CircleLoader />
					) : (
						<>
							<div className='max-md:hidden'>{t('auth.verifyEmail')}</div>
							<div className='md:hidden'>{t('auth.verify')}</div>
						</>
					)}
				</button>
			</form>
			<div className='flex justify-center mt-6 text-lg'>
				<button
					onClick={() => {
						if (timer <= 0) {
							sendMail.mutateAsync({ params: { email } })
							setTimer(59)
						}
					}}
					disabled={timer > 0}
				>
					<div
						className={`text-blue-500 ${timer <= 0 ? '' : 'text-opacity-60'}`}
					>
						<div>{t('auth.sendNew')}</div>
						<div>{`${timer > 0 ? `${timer}s` : ''}`}</div>
					</div>
				</button>
			</div>
		</div>
	)
}

export default RegistrationEmailConfirm
