'use client'

import { MLanguagePopUpFromTop } from '@/assets/animation/PopUp.animation'
import ENLogo from '@/assets/icons/english-language.svg'
import LTLogo from '@/assets/icons/litvian-language.svg'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

const ChangeLanguage = ({
	setIsVisible,
}: {
	setIsVisible?: Dispatch<SetStateAction<boolean>>
}) => {
	const router = useRouter()
	const pathname = usePathname()
	const currentLocale = useLocale()

	const switchLanguage = (newLocale: string) => {
		const segments = pathname.split('/')
		segments[1] = newLocale
		localStorage.setItem('selectedLanguage', newLocale)
		const newPath = segments.join('/')
		router.push(newPath)
	}

	return (
		<motion.div
			initial='from'
			animate='to'
			exit='from'
			variants={MLanguagePopUpFromTop}
			className='bg-t-white-bg w-[600px] text-slate-900 mt-24 py-6 rounded-lg flex justify-center'
		>
			<div className='w-[40%] flex flex-col relative'>
				<div>
					<button
						className='cursor-pointer text-4xl flex items-center w-full justify-center hover:bg-gray-400 bg-opacity-55 hover:bg-opacity-50 py-4 px-2 duration-100'
						onClick={() => switchLanguage('lt')}
					>
						<div className='w-20 flex justify-center'>
							<Image className='object-cover' src={LTLogo} alt='' />
						</div>
						<div className='w-40'>Lietuvių</div>
					</button>
				</div>
				<div className='flex justify-center'>
					<hr className='border-gray-500 w-full m-0' />
				</div>
				<div>
					<button
						className='cursor-pointer text-4xl flex items-center w-full justify-center hover:bg-gray-400 bg-opacity-55 hover:bg-opacity-50 py-4 px-2 duration-100'
						onClick={() => switchLanguage('en')}
					>
						<div className='w-20 flex justify-center'>
							<Image className='object-cover' src={ENLogo} alt='' />
						</div>
						<div className='w-40'>English</div>
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default ChangeLanguage
