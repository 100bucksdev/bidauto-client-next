'use client'

import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdExpandMore } from 'react-icons/md'

const BurgerMenuLanguages = () => {
	const t = useTranslations()
	const [isOpen, setIsOpen] = useState(false)

	const router = useRouter()
	const pathname = usePathname()

	const switchLanguage = (newLocale: string) => {
		const segments = pathname.split('/')
		segments[1] = newLocale
		const newPath = segments.join('/')
		router.push(newPath)
	}

	return (
		<div className={`relative text-[20px] bg-t-header-top w-full`}>
			<button
				onClick={() => setIsOpen(prev => !prev)}
				className='flex items-center justify-center w-full pb-[3px]'
			>
				<div className='text-t-text-primary'>
					{t('header.options.language')}
				</div>
				<div
					className={`text-t-text-primary ${
						isOpen ? 'rotate-180' : 'rotate-0'
					} duration-150`}
				>
					<MdExpandMore />
				</div>
			</button>
			<div
				className={`overflow-hidden transition-all grid ${
					isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
				}`}
			>
				<div className='min-h-0 flex flex-col items-center'>
					<button
						onClick={() => {
							switchLanguage('en')
						}}
						className='flex justify-center py-[8px] text-[16px] items-center'
					>
						<span className='text-t-text-primary'>English</span>
					</button>
					<button
						onClick={() => {
							switchLanguage('lt')
						}}
						className='flex justify-center py-[8px] text-[16px] items-center'
					>
						<span className='text-t-text-primary'>Lietuvių</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default BurgerMenuLanguages
