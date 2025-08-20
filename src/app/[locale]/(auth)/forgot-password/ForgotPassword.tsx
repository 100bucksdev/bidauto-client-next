import { AnimatePresence, motion } from 'framer-motion'

import { MRegPopUpFromRightToLeft } from '@/assets/animation/PopUp.animation'
import port from '@/assets/images/port.jpg'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Steps from '../(widgets)/Steps'
import ForgotPasswordConfirm from './ForgotPasswordConfirm'
import ForgotPasswordForm from './ForgotPasswordForm'

const ForgotPassword = () => {
	const t = useTranslations()
	const [step, setStep] = useState<0 | 1>(0)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { push: path } = useRouter()

	return (
		<div className='flex overflow-hidden max-lg:grid-cols-1 h-screen'>
			<div className='lg:hidden max-lg:hidden xl:block my-7 ml-5 bg-white rounded-[3rem] after:rounded-[3rem] relative after:content-[""] after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-t-modal-bg after:bg-opacity-40 min-h-[550px]] xl:w-4/6'>
				<div
					className='w-full h-full bg-cover rounded-[3rem]'
					style={{ backgroundImage: `url(${port})` }}
				>
					<div className='z-10 relative grid place-items-center h-full text-t-text-primary'>
						<div>
							<div className='text-center text-8xl font-bold max-2xl:text-6xl my-8 mx-10'>
								{t('auth.change')}
								<br />
								{t('auth.yourPassword')}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center m-36 justify-center overflow-hidden min-h-[500px] xl:w-3/6 3xl:w-2/6 lg:w-full max-lg:w-full xl:m-20 max-md:m-0 max-md:my-3 max-md:w-full'>
				<div className='flex justify-start w-full mb-6 text-lg max-md:text-base'>
					<button onClick={() => path('/login')}>
						<div className='flex items-center gap-3 text-blue-500 hover:underline'>
							<span>
								<FaArrowLeft />
							</span>
							<span>{t('auth.returnToLogin')}</span>
						</div>
					</button>
				</div>
				<div className='flex justify-center text-3xl mb-5 max-md:mt-10 mt-36 font-semibold max-lg:text-5xl max-md:text-3xl'>
					{t('auth.forgotPassword')}
				</div>
				<Steps steps={['1', '2']} currentStep={step} />
				<div className='auth_form'>
					<AnimatePresence mode='wait'>
						{step === 0 || step > 1 ? (
							<motion.div
								initial='from'
								animate='to'
								exit='exit'
								variants={MRegPopUpFromRightToLeft}
								transition={{ duration: 0.1 }}
								className='absolute w-full'
							>
								<ForgotPasswordForm
									setStep={setStep}
									setEmail={setEmail}
									setPassword={setPassword}
								/>
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
								transition={{ duration: 0.1 }}
								className='absolute w-full'
							>
								<ForgotPasswordConfirm email={email} password={password} />
							</motion.div>
						) : (
							''
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword
