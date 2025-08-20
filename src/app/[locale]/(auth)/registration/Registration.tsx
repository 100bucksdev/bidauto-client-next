import { MRegPopUpFromRightToLeft } from '@/assets/animation/PopUp.animation'
import port from '@/assets/images/port3.jpg'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
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
		<>
			<div className='flex overflow-hidden max-lg:grid-cols-1 h-screen'>
				<div className='lg:hidden max-lg:hidden xl:block my-7 ml-5 bg-white rounded-[3rem] after:rounded-[3rem] relative after:content-[""] after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-t-modal-bg after:bg-opacity-40 min-h-[550px]] xl:w-4/6'>
					<div
						className='w-full h-full bg-cover rounded-[3rem]'
						style={{ backgroundImage: `url(${port})` }}
					>
						<div className='z-10 relative grid place-items-center h-full text-t-text-primary'>
							<div>
								<div className='text-center text-8xl font-bold max-2xl:text-6xl'>
									{t('auth.welcome')}
									<br />
									{t('auth.to')} t-autologistics
								</div>
								<div className='text-center text-5xl mt-6 font-semibold max-2xl:text-4xl'>
									{t('footer.destinations')}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col items-center mx-36 my-7 max-lg:w-full justify-center overflow-hidden min-h-[500px] xl:w-3/6 3xl:w-2/6 lg:w-full xl:mx-20 max-md:m-0 max-md:my-3 max-md:w-full max-lg:my-20'>
					<div className='flex justify-center text-6xl mb-10 font-semibold max-lg:text-5xl max-md:text-4xl'>
						{t('auth.registration')}
					</div>
					<Steps steps={['1', '2', '3']} currentStep={step} />
					<div className='auth_form'>
						<AnimatePresence mode='wait'>
							{step === 0 || step > 2 ? (
								<motion.div
									initial='from'
									animate='to'
									exit='exit'
									variants={MRegPopUpFromRightToLeft}
									transition={{ duration: 0.1 }}
									className='absolute w-full'
								>
									<>
										<RegistrationGeneralInformation
											setStep={setStep}
											setEmail={setEmail}
											setPhone={setPhone}
										/>
									</>
								</motion.div>
							) : (
								''
							)}
						</AnimatePresence>
						<AnimatePresence mode='wait'>
							{step === 1 ? (
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
							) : (
								''
							)}
						</AnimatePresence>
						<AnimatePresence mode='wait'>
							{step === 2 ? (
								<RegistrationPhoneConfirm email={email} phone={phone} />
							) : (
								''
							)}
						</AnimatePresence>
					</div>
					<div className='mb-2 flex justify-center'>
						<span className='text-center'>
							{`${t('auth.alreadyHaveAccount')} `}
							<button onClick={() => path('/login')} className='text-blue-500'>
								{`${t('auth.login')}.`}
							</button>
						</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default Registration
