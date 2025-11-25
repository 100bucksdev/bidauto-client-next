'use client'
import { MRegPopUpFromRightToLeft } from '@/assets/animation/PopUp.animation'
import port from '@/assets/images/port.jpg'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
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
	const { push: path } = useRouter()

	return (
		<div className='flex overflow-hidden h-screen'>
			{/* Left side - Image (hidden on mobile and tablet) */}
			<div className='hidden xl:flex xl:w-2/3 my-7 ml-5'>
				<div className='relative bg-white rounded-3xl overflow-hidden w-full min-h-[550px]'>
					<Image
						src={port}
						alt='Forgot Password'
						fill
						className='object-cover'
						priority
					/>
					{/* Overlay */}
					<div className='absolute inset-0 bg-black/40' />

					{/* Text content */}
					<div className='relative z-10 flex items-center justify-center h-full text-center'>
						<div>
							<h1 className='text-6xl lg:text-8xl font-bold text-white mb-8 px-10'>
								{t('auth.change')}
								<br />
								{t('auth.yourPassword')}
							</h1>
						</div>
					</div>
				</div>
			</div>

			{/* Right side - Form */}
			<div className='flex flex-col w-full xl:w-1/3 px-4 md:px-8 lg:px-12 py-8 justify-center'>
				{/* Back button */}
				<div className='mb-8'>
					<button
						onClick={() => path('/login')}
						className='flex items-center gap-2 text-blue-500 hover:underline text-base'
					>
						<FaArrowLeft />
						<span>{t('auth.returnToLogin')}</span>
					</button>
				</div>

				{/* Title */}
				<div className='text-center mb-8'>
					<h2 className='text-3xl md:text-4xl lg:text-5xl font-semibold'>
						{t('auth.forgotPassword')}
					</h2>
				</div>

				{/* Steps */}
				<div className='mb-12 flex justify-center'>
					<Steps steps={['1', '2']} currentStep={step} />
				</div>

				{/* Form container */}
				<div className='relative w-full min-h-[300px]'>
					<AnimatePresence mode='wait'>
						{step === 0 ? (
							<motion.div
								key='form'
								initial='from'
								animate='to'
								exit='exit'
								variants={MRegPopUpFromRightToLeft}
								transition={{ duration: 0.1 }}
							>
								<ForgotPasswordForm setStep={setStep} setEmail={setEmail} />
							</motion.div>
						) : null}
					</AnimatePresence>

					<AnimatePresence mode='wait'>
						{step === 1 ? (
							<motion.div
								key='confirm'
								initial='from'
								animate='to'
								exit='exit'
								variants={MRegPopUpFromRightToLeft}
								transition={{ duration: 0.1 }}
							>
								<ForgotPasswordConfirm email={email} />
							</motion.div>
						) : null}
					</AnimatePresence>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword
