'use client'

import { $Pages } from '@/config/router.config'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

const SignUpButton = () => {
	const t = useTranslations('header')
	const path = useRouter()

	return (
		<button
			className='max-md:rounded-none text-t-blue-light py-2 px-4 rounded-full max-lg:px-14 max-lg:py-2 max-lg:text-white max-lg:bg-t-blue-light'
			onClick={() => path.push($Pages.CLIENT.AUTH.REGISTRATION)}
		>
			{t('signUp')}
		</button>
	)
}

export default SignUpButton
