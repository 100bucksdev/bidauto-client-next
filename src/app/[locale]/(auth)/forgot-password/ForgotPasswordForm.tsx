import { IForgotPasswordFields } from '@/types/ForgotPasswordFields.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import { useSendResetCodeToEmail } from '@/shared/api/User/auth/forgotPassword/sendResetCodeToemail/useSendResetCodeToEmail'
import { useForgotPasswordSchema } from '@/shared/hooks/ZodSchemaHooks'
import Input from '@/shared/ui/Input'
import { useTranslations } from 'next-intl'
import { FaArrowRight } from 'react-icons/fa'

const ForgotPasswordForm = ({
	setStep,
	setEmail,
}: {
	setStep: Dispatch<SetStateAction<0 | 1>>
	setEmail: Dispatch<SetStateAction<string>>
}) => {
	const t = useTranslations()

	const ForgotPasswordSchema = useForgotPasswordSchema()

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IForgotPasswordFields>({
		resolver: zodResolver(ForgotPasswordSchema),
	})

	const sendResetCodeToEmail = useSendResetCodeToEmail({
		options: {
			onSuccess: () => {
				setStep(1)
			},
		},
	})

	const onSubmit = async (fields: IForgotPasswordFields) => {
		setEmail(fields.email)
		sendResetCodeToEmail.mutateAsync({ params: { email: fields.email } })
	}

	return (
		<form
			className='w-full flex justify-center'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex flex-col gap-y-2 w-[97%] h-full'>
				<div>
					<Input
						placeholder={t('auth.emailPlaceholder')}
						type='email'
						name='email'
						label={`${t('auth.email')}*`}
						register={register}
						error={errors.email}
						autoComplete='username'
					/>
				</div>

				{/* <div>
					<RegistrationReCaptcha
						onChange={value => {
							setValue('captcha', value || '')
						}}
					/>
					{errors.captcha && (
						<span className='text-red-500 flex'>{errors.captcha.message}</span>
					)}
				</div> */}
				<div>
					<button
						className='bg-t-blue-light h-12 text-t-text-primary text-lg rounded-full hover:bg-t-blue-light/90 w-full duration-100 px-4 flex justify-center items-center'
						type='submit'
					>
						<div className='flex items-center gap-2'>
							<span>{t('auth.changePassword')}</span>
							<span className='arrow_children'>
								<FaArrowRight />
							</span>
						</div>
					</button>
				</div>
			</div>
		</form>
	)
}

export default ForgotPasswordForm
