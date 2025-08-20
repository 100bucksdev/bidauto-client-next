import { useRegistration } from '@/shared/api/User/auth/registration/useRegistration'
import { useUserLocation } from '@/shared/hooks/useUserLocation'
import { useRegisterSchema } from '@/shared/hooks/ZodSchemaHooks'
import AgreeWithTerms from '@/shared/ui/AgreeWithTerms'
import CircleLoader from '@/shared/ui/CircleLoader'
import Input from '@/shared/ui/Input'
import PhoneInput from '@/shared/ui/PhoneInput'
import { IRegisterFields } from '@/types/RegisterFields.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowRight } from 'react-icons/fa'
import 'react-phone-input-2/lib/material.css'
import RegistrationReCaptcha from '../(widgets)/RegistrationReCaptcha'

const RegistrationGeneralInformation = ({
	setStep,
	setEmail,
	setPhone,
}: {
	setStep: Dispatch<SetStateAction<0 | 1 | 2>>
	setEmail: Dispatch<SetStateAction<string>>
	setPhone: Dispatch<SetStateAction<string>>
}) => {
	const t = useTranslations()
	const { push: path } = useRouter()
	const data = useUserLocation()

	useEffect(() => {
		if (!!localStorage.getItem('access')) {
			path('/')
		}
	}, [])

	const RegisterSchema = useRegisterSchema()

	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
		control,
		setValue,
	} = useForm<IRegisterFields & { captcha: string; terms: boolean }>({
		resolver: zodResolver(RegisterSchema),
	})

	useEffect(() => {
		if (data && data?.data?.data.country) {
			setValue(
				'country',
				data && data.data.data.country && data.data.data.country.length === 2
					? data.data.data.country.toUpperCase()
					: 'LT'
			)
		}
	}, [data, setValue])

	const registration = useRegistration({
		options: {
			onSuccess: data => {
				setEmail?.(data.data.email)
				setStep?.(1)
				setPhone?.(data.data.phone_number)
			},
			onError: error => {
				const err = error as { response?: { data?: Record<string, string[]> } }

				if (!err.response?.data) return

				const responseData = err.response.data

				Object.keys(responseData).forEach(field => {
					const errorMessage: string = responseData[field][0]

					if (setError) {
						setError(field as keyof IRegisterFields, {
							message: errorMessage,
						})
					}
				})
			},
		},
	})

	const onSubmit = async (fields: IRegisterFields) => {
		await registration.mutateAsync({
			params: {
				email: fields.email,
				password: fields.password,
				first_name: fields.first_name,
				last_name: fields.last_name,
				phone_number: `+${fields.phone_number}`,
				country: fields.country || 'LT',
			},
		})
		return
	}

	return (
		<>
			<form
				className='w-full flex justify-center'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='flex flex-col gap-y-2 px-4 w-[97%] h-full'>
					<div>
						<Input
							label={`${t('auth.firstName')}*`}
							maxLength={20}
							type='text'
							name='first_name'
							placeholder={t('auth.firstNamePlaceholder')}
							register={register}
							error={errors.first_name}
						/>
					</div>
					<div>
						<Input
							label={`${t('auth.lastName')}*`}
							type='text'
							name='last_name'
							placeholder={t('auth.lastNamePlaceholder')}
							maxLength={20}
							register={register}
							error={errors.last_name}
						/>
					</div>
					<div>
						<PhoneInput
							control={control}
							error={errors.phone_number}
							country={data?.data?.data.country}
						/>
					</div>
					<div>
						<Input
							label={`${t('auth.email')}*`}
							maxLength={255}
							autoComplete='username'
							type='email'
							name='email'
							placeholder={t('auth.emailPlaceholder')}
							register={register}
							error={errors.email}
						/>
					</div>
					<div>
						<Input
							label={`${t('auth.password')}*`}
							maxLength={30}
							autoComplete='current-password'
							type='password'
							name='password'
							placeholder={t('auth.passwordPlaceholder')}
							register={register}
							error={errors.password}
						/>
					</div>
					<div>
						<RegistrationReCaptcha
							onChange={value => {
								setValue('captcha', value || '')
							}}
						/>
						{errors.captcha && (
							<span className='text-red-500 flex'>
								{errors.captcha.message}
							</span>
						)}
					</div>
					<AgreeWithTerms
						error={errors.terms}
						name='terms'
						setValue={setValue}
					/>
					<div>
						<button
							className='bg-t-blue-light h-12 text-t-text-primary text-lg rounded-full hover:bg-t-blue-light/90 w-full duration-100 px-4 flex justify-center items-center'
							type='submit'
						>
							{registration.isPending ? (
								<CircleLoader />
							) : (
								<div className='flex items-center gap-2'>
									<span>{t('auth.register')}</span>
									<span className='arrow_children'>
										<FaArrowRight />
									</span>
								</div>
							)}
						</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default RegistrationGeneralInformation
