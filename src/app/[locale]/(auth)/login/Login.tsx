'use client'

import { MRegPopUpFromRightToLeft } from '@/assets/animation/PopUp.animation'
import logo from '@/assets/images/main-logo.svg'
import port from '@/assets/images/port.jpg'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoginForm from './LoginForm'

const Login = () => {
	const { push: path } = useRouter()
	const t = useTranslations()

	useEffect(() => {
		if (localStorage.getItem('access_token')) {
			path('/')
		}
	}, [path])

	return (
		<div className='flex overflow-hidden lg:grid-cols-1 h-screen'>
			{/* Лого */}
			<div
				className='absolute left-7 max-md:left-32 max-md:w-full cursor-pointer'
				onClick={() => path('/')}
			>
				<Image
					draggable={false}
					className='3xl:w-[100px] lg:w-[70px] h-[100%] object-cover max-md:w-[150px] max-lg:w-[15vw] max-xl:w-[300px]'
					src={logo}
					alt='logo'
					priority
				/>
			</div>

			{/* Форма логина */}
			<div className='flex flex-col items-center m-36 justify-center overflow-hidden min-h-[500px] xl:w-3/6 3xl:w-2/6 lg:w-full max-lg:w-full max-md:w-full xl:m-20 max-md:m-0 max-md:my-32'>
				<div className='flex flex-col justify-center items-center text-4xl font-semibold max-lg:text-5xl max-md:text-4xl'>
					{t('auth.login')}
					<h2 className='text-2xl font-medium'>Welcome Again</h2>
				</div>
				<div className='auth_form w-full flex justify-center my-6'>
					<motion.div
						initial='from'
						animate='to'
						exit='exit'
						variants={MRegPopUpFromRightToLeft}
						transition={{ duration: 0.1 }}
						className='w-full max-w-md' // ограничиваем ширину
					>
						<LoginForm />
					</motion.div>
				</div>

				{/* Ссылки */}
				<div className='flex w-full justify-center text-center max-lg:hidden lg:hidden xl:block 2xl:hidden max-md:block'>
					<span className='flex flex-col gap-2 items-center'>
						<button
							onClick={() => path('/forgot-password')}
							className='hover:text-t-blue-light duration-150 transition-all'
						>
							{t('auth.forgotPassword')}
						</button>
						{`${t('auth.haventAccount')} `}
						<button
							onClick={() => path('/registration')}
							className='text-blue-500'
						>
							{`${t('auth.register')}.`}
						</button>
					</span>
				</div>

				<div className='flex justify-center text-center max-md:hidden xl:hidden 2xl:block'>
					<span className='flex gap-2 items-center'>
						{`${t('auth.haventAccount')} `}
						<button
							onClick={() => path('/registration')}
							className='text-blue-500'
						>
							{`${t('auth.register')}.`}
						</button>
						<div className='w-0.5 h-6 rounded-full bg-gray-500' />
						<button
							onClick={() => path('/forgot-password')}
							className='hover:text-t-blue-light duration-150 transition-all'
						>
							{t('auth.forgotPassword')}
						</button>
					</span>
				</div>
			</div>

			{/* Картинка справа */}
			<div className='lg:hidden max-lg:hidden xl:block my-7 mr-5 bg-white rounded-[3rem] relative after:content-[""] after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-t-modal-bg after:bg-opacity-40 min-h-[550px] xl:w-4/6 overflow-hidden'>
				<Image
					src={port}
					alt='port'
					fill
					className='object-cover rounded-[3rem]'
					priority
				/>
				<div className='z-10 relative grid place-items-center h-full text-t-text-primary'>
					<div>
						<div className='text-center 3xl:text-8xl 2xl:text-6xl font-bold max-2xl:text-6xl'>
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
	)
}

export default Login
