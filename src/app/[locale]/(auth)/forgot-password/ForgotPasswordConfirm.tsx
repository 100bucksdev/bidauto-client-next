import { useSendEmail } from '@/shared/api/mail/send/useSendMail'
import { useForgotPassword } from '@/shared/api/User/auth/forgotPassword/useForgotPassword'
import { useCodeSchema } from '@/shared/hooks/ZodSchemaHooks'
import CircleLoader from '@/shared/ui/CircleLoader'
import Input from '@/shared/ui/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const ForgotPasswordConfirm = ({
	email,
	password,
}: {
	email: string
	password: string
}) => {
	const t = useTranslations()
	const [timer, setTimer] = useState(59)
	const { push: path } = useRouter()

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
		setError,
		handleSubmit,
	} = useForm<{ code: string }>({ resolver: zodResolver(CodeSchema) })

	const sendMail = useSendEmail()
	const forgotPassword = useForgotPassword({
		options: {
			onError: (data: any) => {
				setError
					? setError('code', {
							message:
								(data.response.data.non_field_errors &&
									data.response.data.non_field_errors[0]) ||
								(data.response.data.new_password &&
									data.response.data.new_password[0]) ||
								(data.response.data && data.response.data[0]),
					  })
					: null
			},
			onSuccess: () => {
				path('/login')
			},
		},
	})

	useEffect(() => {
		sendMail.mutateAsync({
			params: {
				email,
			},
		})
	}, [])

	const onSubmit = async (fields: { code: string }) => {
		const data = await forgotPassword.mutateAsync({
			params: {
				code: fields.code,
				email,
				new_password: password,
			},
		})
		return data
	}

	return (
		<>
			<form
				className='w-full flex justify-center'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='flex flex-col gap-y-4 w-[97%] h-full'>
					<div className='flex justify-center text-xl font-semibold mb-4'>
						{`${t('auth.verificationCode')} ${email}. ${t(
							'auth.confirmEmail'
						)}`}
					</div>
					<div>
						<Input
							placeholder={t('auth.codePlaceholder')}
							type='text'
							name='code'
							label={`${t('auth.code')}*`}
							register={register}
							autoComplete='off'
							error={errors.code}
						/>
					</div>
					<div>
						<button
							className='bg-t-blue-light h-12 text-t-text-primary text-lg rounded-full hover:bg-t-blue-light/90 w-full duration-100 px-4 flex justify-center items-center'
							type='submit'
						>
							{forgotPassword.isPending ? <CircleLoader /> : t('auth.confirm')}
						</button>
					</div>
				</div>
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
		</>
	)
}

export default ForgotPasswordConfirm
