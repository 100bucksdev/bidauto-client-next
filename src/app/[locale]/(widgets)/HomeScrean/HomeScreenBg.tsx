'use client'

import Image from 'next/image'
import { ReactNode, useEffect, useRef, useState } from 'react'

const images = [
	'/images/bg/bg_1.png',
	'/images/bg/bg_2.png',
	'/images/bg/bg_3.png',
	'/images/bg/bg_4.png',
	'/images/bg/bg_5.png',
]

interface HomeScreenBgProps {
	children: ReactNode
}

const HomeScreenBg = ({ children }: HomeScreenBgProps) => {
	const currentIndex = useRef(0)
	const [index, setIndex] = useState(0)
	const [fade, setFade] = useState(true)

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(false)

			setTimeout(() => {
				const nextIndex = (currentIndex.current + 1) % images.length
				currentIndex.current = nextIndex
				setIndex(nextIndex)
				setFade(true)
			}, 500)
		}, 5000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className='relative h-[35rem] flex items-center justify-center overflow-hidden mb-0'>
			{/* Desktop Background */}
			<div className="absolute top-0 left-0 w-full h-full z-[1] max-sm:hidden after:bg-t-modal-bg after:block after:content-[''] after:w-full after:h-full after:absolute">
				<Image
					key={images[index]}
					src={images[index]}
					alt={`Background ${index + 1}`}
					width={1920}
					height={1080}
					priority
					style={{ objectFit: 'cover' }}
					className={`w-full h-full absolute top-0 left-0 ${
						fade ? 'animate-fade-in' : 'animate-fade-out'
					}`}
				/>
			</div>

			{/* Mobile Background */}
			<div className="absolute top-0 left-0 w-full h-full z-[1] sm:hidden after:bg-t-modal-bg after:block after:content-[''] after:w-full after:h-full after:absolute">
				<Image
					src={images[0]}
					alt='Background mobile'
					width={1920}
					height={1080}
					priority
					style={{ objectFit: 'cover' }}
					className='w-full h-full absolute top-0 left-0'
				/>
			</div>

			{/* Overlay */}
			<div className='absolute top-0 left-0 w-full h-full z-[2] bg-black/40' />

			{/* Content */}
			<div className='relative z-10 text-center w-full max-w-[1200px]'>
				{children}
			</div>

			{/* Indicators */}
			<div className='bg-black/65 rounded-full px-5 py-2 flex gap-1 absolute bottom-24 2xl:right-80 max-sm:hidden max-lg:left-auto max-lg:right-auto max-lg:bottom-16 lg:right-36 z-20'>
				{images.map((_, idx) => (
					<div
						key={idx}
						className={`w-2 h-2 rounded-full ${
							index === idx ? 'bg-white' : 'bg-white/50'
						}`}
					/>
				))}
			</div>

			{/* Animations */}
			<style jsx>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}

				@keyframes fadeOut {
					from {
						opacity: 1;
					}
					to {
						opacity: 0;
					}
				}

				.animate-fade-in {
					animation: fadeIn 0.5s ease-in forwards;
				}

				.animate-fade-out {
					animation: fadeOut 0.5s ease-out forwards;
				}
			`}</style>
		</div>
	)
}

export default HomeScreenBg
