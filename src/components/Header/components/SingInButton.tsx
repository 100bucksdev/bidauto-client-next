'use client'

import { $Pages } from '@/config/router.config'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ButtonHTMLAttributes, FC } from 'react'

interface SignInButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignInButton: FC<SignInButtonProps> = ({ ...options }) => {
	const t = useTranslations('header')
	const path = useRouter()

	return (
		<button
			className='text-t-text-primary max-md:rounded-none bg-t-blue-light px-6 rounded-full max-lg:px-16 max-lg:py-2'
			{...options}
			onClick={() => path.push($Pages.AUTH.LOGIN)}
		>
			{t('logIn')}
		</button>
	)
}

export default SignInButton
