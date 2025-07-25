'use client'

import {
	ButtonHTMLAttributes,
	Dispatch,
	SetStateAction,
	forwardRef,
} from 'react'

interface BurgerMenuButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

const BurgerMenuButton = forwardRef<HTMLButtonElement, BurgerMenuButtonProps>(
	({ isOpen, setIsOpen, ...props }, ref) => {
		return (
			<button
				ref={ref}
				onClick={() => setIsOpen(prev => !prev)}
				{...props}
				className='flex flex-col gap-y-[8px] pointer'
			>
				<div
					className={`${
						isOpen ? '-rotate-45 translate-y-[12px]' : 'rotate-0'
					} w-[40px] h-[4px] bg-t-blue-cyan duration-200 rounded-full`}
				/>
				<div
					className={`${
						isOpen ? 'opacity-0' : 'opacity-100'
					} w-[40px] h-[4px] bg-t-blue-cyan duration-200 rounded-full`}
				/>
				<div
					className={`${
						isOpen ? 'rotate-45 -translate-y-[12px]' : 'rotate-0'
					} w-[40px] h-[4px] bg-t-blue-cyan duration-200 rounded-full`}
				/>
			</button>
		)
	}
)

BurgerMenuButton.displayName = 'BurgerMenuButton'

export default BurgerMenuButton
