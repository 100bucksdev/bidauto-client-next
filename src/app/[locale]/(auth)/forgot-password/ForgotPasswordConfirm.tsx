import { useSendResetCodeToEmail } from '@/shared/api/User/auth/forgotPassword/sendResetCodeToemail/useSendResetCodeToEmail'
import { useForgotPassword } from '@/shared/api/User/auth/forgotPassword/update/useForgotPassword'
import { useResetPassShema } from '@/shared/hooks/ZodSchemaHooks'
import CircleLoader from '@/shared/ui/CircleLoader'
import Input from '@/shared/ui/Input'
import { IForgotPasswordNewPassFields } from '@/types/ForgotPasswordFields.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface ForgotPasswordConfirmProps {
	email: string
	password: string
}

interface ErrorResponse {
	response?: {
		data?: {
			non_field_errors?: string[]
			new_password?: string[]
			[key: string]: any
		}
	}
}

const ForgotPasswordConfirm = ({
	email,
	password,
}: ForgotPasswordConfirmProps) => {
	const t = useTranslations()
	const [timer, setTimer] = useState(59)
	const { push: path } = useRouter()

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer(prev => (prev > 0 ? prev - 1 : 0))
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	const sendResetCodeToEmail = useSendResetCodeToEmail()

	const CodeSchema = useResetPassShema()
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
	} = useForm<IForgotPasswordNewPassFields>({
		resolver: zodResolver(CodeSchema),
	})

	const forgotPassword = useForgotPassword({
		options: {
			onError: (error: unknown) => {
				if (setError) {
					const err = error as ErrorResponse
					const msg =
						err.response?.data?.non_field_errors?.[0] ??
						err.response?.data?.new_password?.[0] ??
						err.response?.data?.[0] ??
						'Unknown error'
					setError('code', { message: msg })
				}
			},
			onSuccess: () => {
				path('/login')
			},
		},
	})

	const onSubmit = async (fields: IForgotPasswordNewPassFields) => {
		const data = await forgotPassword.mutateAsync({
			params: {
				code: fields.code,
				email,
				new_password1: fields.new_password,
				new_password2: fields.confirm_password,
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
						<div>
							<Input
								placeholder={t('auth.newPasswordPlaceholder')}
								type='password'
								name='new_password'
								label={`${t('auth.newPassword')}*`}
								register={register}
								error={errors.new_password}
								maxLength={30}
								autoComplete='current-password'
							/>
						</div>
						<div>
							<Input
								placeholder={t('auth.newPasswordPlaceholder')}
								type='password'
								name='confirm_password'
								label={`${t('auth.newPassword')}*`}
								register={register}
								error={errors.new_password}
								maxLength={30}
								autoComplete='current-password'
							/>
						</div>
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
							sendResetCodeToEmail.mutateAsync({ params: { email } })
							setTimer(59)
						}
					}}
					disabled={timer > 0}
				>
					<div
						className={`text-blue-500 ${timer <= 0 ? '' : 'text-opacity-60'}`}
					>
						<div>{t('auth.sendNew')}</div>
						<div>{timer > 0 ? `${timer}s` : ''}</div>
					</div>
				</button>
			</div>
		</>
	)
}

export default ForgotPasswordConfirm
