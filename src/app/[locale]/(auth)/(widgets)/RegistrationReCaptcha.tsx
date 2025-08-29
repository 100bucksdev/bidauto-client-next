'use client'

import { useLocale } from 'next-intl'
import { FC, useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

interface IRegistrationReCaptcha {
	onChange: (value: string | null) => void
}

const RegistrationReCaptcha: FC<IRegistrationReCaptcha> = ({ onChange }) => {
	const i18n = useLocale()
	const [recaptchaKey, setRecaptchaKey] = useState(0)
	const [recaptchaLanguage, setRecaptchaLanguage] = useState('en')

	useEffect(() => {
		setRecaptchaKey(prev => prev + 1)
		setRecaptchaLanguage(i18n)
	}, [i18n])

	return (
		<div className='max-md:scale-[0.80] max-md:-translate-x-[30px] shadow-lg inline-flex mt-1'>
			<ReCAPTCHA
				sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY || ''}
				key={recaptchaKey}
				onChange={onChange}
				hl={recaptchaLanguage}
			/>
		</div>
	)
}

export default RegistrationReCaptcha
