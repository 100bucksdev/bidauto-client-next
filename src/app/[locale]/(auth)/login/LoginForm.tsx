'use client'

import { useLogin } from '@/shared/api/User/auth/login/useLogin'
import { useLoginSchema } from '@/shared/hooks/ZodSchemaHooks'
import CircleLoader from '@/shared/ui/CircleLoader'
import Input from '@/shared/ui/Input'
import { LoginFields } from '@/types/LoginFields.interface.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { useForm } from 'react-hook-form'
import RegistrationReCaptcha from '../(widgets)/RegistrationReCaptcha'

const LoginForm = () => {
	const t = useTranslations()
	const { push: path } = useRouter()
	const search = useSearchParams()
	const queryParams = queryString.parse(search.toString())

	const LoginSchema = useLoginSchema()

	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
		setValue,
	} = useForm<LoginFields & { captcha: string | undefined }>({
		resolver: zodResolver(LoginSchema),
	})

	const login = useLogin({
		options: {
			onSuccess: () => {
				queryParams.callbackUrl
					? path(queryParams.callbackUrl as string)
					: path('/')
			},
		},
	})

	const onSubmit = async (fields: LoginFields) => {
		const data = await login.mutateAsync({
			params: {
				email: fields.email,
				password: fields.password,
			},
		})
		return data
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
						type='password'
						name='password'
						placeholder={t('auth.passwordPlaceholder')}
						label={`${t('auth.password')}*`}
						register={register}
						error={errors.password}
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
						{login.isPending ? <CircleLoader /> : t('auth.login')}
					</button>
				</div>
			</div>
		</form>
	)
}

export default LoginForm
