import { IForgotPasswordFields } from '@/types/ForgotPasswordFields.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import { useForgotPasswordSchema } from '@/shared/hooks/ZodSchemaHooks'
import Input from '@/shared/ui/Input'
import { useTranslations } from 'next-intl'
import { FaArrowRight } from 'react-icons/fa'
import RegistrationReCaptcha from '../(widgets)/RegistrationReCaptcha'

const ForgotPasswordForm = ({
	setStep,
	setEmail,
	setPassword,
}: {
	setStep: Dispatch<SetStateAction<0 | 1>>
	setEmail: Dispatch<SetStateAction<string>>
	setPassword: Dispatch<SetStateAction<string>>
}) => {
	const t = useTranslations()

	const ForgotPasswordSchema = useForgotPasswordSchema()

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<IForgotPasswordFields & { captcha: string }>({
		resolver: zodResolver(ForgotPasswordSchema),
	})

	const onSubmit = async (fields: IForgotPasswordFields) => {
		setPassword(fields.new_password)
		setEmail(fields.email)
		setStep(1)
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
					<RegistrationReCaptcha
						onChange={value => {
							setValue('captcha', value || '')
						}}
					/>
					{errors.captcha && (
						<span className='text-red-500 flex'>{errors.captcha.message}</span>
					)}
				</div>
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
