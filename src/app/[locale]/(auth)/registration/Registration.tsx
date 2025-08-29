'use client'

import { MRegPopUpFromRightToLeft } from '@/assets/animation/PopUp.animation'
import port from '@/assets/images/port3.jpg'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Steps from '../(widgets)/Steps'
import RegistrationEmailConfirm from './RegistrationEmailConfirm'
import RegistrationGeneralInformation from './RegistrationGeneralInformation'
import RegistrationPhoneConfirm from './RegistrationPhoneConfirm'

const Registration = () => {
	const { push: path } = useRouter()
	const t = useTranslations()
	const [step, setStep] = useState<0 | 1 | 2>(0)
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')

	return (
		<div className='flex h-screen overflow-hidden'>
			{/* Картинка слева */}
			<div className='hidden xl:flex xl:w-2/3 relative bg-white rounded-[3rem] my-7 ml-5 overflow-hidden'>
				<Image
					src={port}
					alt='port'
					fill
					className='object-cover rounded-[3rem]'
					priority
				/>
				<div className='absolute inset-0 bg-t-modal-bg bg-opacity-40 rounded-[3rem]'></div>
				<div className='absolute inset-0 flex flex-col justify-center items-center text-t-text-primary p-10'>
					<div className='text-center'>
						<div className='text-6xl font-bold max-2xl:text-4xl'>
							{t('auth.welcome')}
							<br />
							{t('auth.to')} t-autologistics
						</div>
						<div className='text-4xl mt-6 font-semibold max-2xl:text-3xl'>
							{t('footer.destinations')}
						</div>
					</div>
				</div>
			</div>

			{/* Форма справа */}
			<div className='flex flex-col justify-between h-full xl:w-1/2 w-full px-10 max-md:px-5 py-10'>
				<div>
					<div className='flex flex-col justify-center items-center text-4xl font-semibold max-lg:text-5xl max-md:text-4xl mb-8'>
						{t('auth.registration')}
					</div>

					{/* Шаги */}
					<Steps steps={['1', '2', '3']} currentStep={step} />

					{/* Форма */}
					<div className='auth_form w-full flex justify-center my-6 relative'>
						<AnimatePresence mode='wait'>
							{(step === 0 || step > 2) && (
								<motion.div
									initial='from'
									animate='to'
									exit='exit'
									variants={MRegPopUpFromRightToLeft}
									transition={{ duration: 0.1 }}
									className='absolute w-full'
								>
									<RegistrationGeneralInformation
										setStep={setStep}
										setEmail={setEmail}
										setPhone={setPhone}
									/>
								</motion.div>
							)}
							{step === 1 && (
								<motion.div
									initial='from'
									animate='to'
									exit='exit'
									variants={MRegPopUpFromRightToLeft}
									transition={{ delay: 0.1, duration: 0.1 }}
									className='absolute w-full'
								>
									<RegistrationEmailConfirm setStep={setStep} email={email} />
								</motion.div>
							)}
							{step === 2 && (
								<motion.div
									initial='from'
									animate='to'
									exit='exit'
									variants={MRegPopUpFromRightToLeft}
									transition={{ delay: 0.1, duration: 0.1 }}
									className='absolute w-full'
								>
									<RegistrationPhoneConfirm email={email} phone={phone} />
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* Ссылка на логин внизу */}
				<div className='flex justify-center text-center mt-12'>
					<span>
						{`${t('auth.alreadyHaveAccount')} `}
						<button onClick={() => path('/login')} className='text-blue-500'>
							{t('auth.login')}.
						</button>
					</span>
				</div>
			</div>
		</div>
	)
}

export default Registration
