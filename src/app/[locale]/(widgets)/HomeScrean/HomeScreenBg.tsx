'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import st from './home-screen.module.scss'

import bg_1 from '@/assets/images/bg/bg_1.png'
import bg_2 from '@/assets/images/bg/bg_2.png'
import bg_3 from '@/assets/images/bg/bg_3.png'
import bg_4 from '@/assets/images/bg/bg_4.png'
import bg_5 from '@/assets/images/bg/bg_5.png'

const images = [bg_1, bg_2, bg_3, bg_4, bg_5]

interface HomeScreenBgProps {
	children: ReactNode
}

const HomeScreenBg = ({ children }: HomeScreenBgProps) => {
	const bgRef = useRef<HTMLDivElement | null>(null)
	const currentIndex = useRef(0)
	const [_, setRender] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			const nextIndex = (currentIndex.current + 1) % images.length
			const nextImage = images[nextIndex]

			if (bgRef.current) {
				bgRef.current.classList.remove('fade-in')
				void bgRef.current.offsetWidth
				bgRef.current.style.backgroundImage = `url(${nextImage})`
				bgRef.current.classList.add('fade-in')
			}

			currentIndex.current = nextIndex
			setRender(r => r + 1)
		}, 5000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className={st.hero_container}>
			<div
				ref={bgRef}
				className={st.hero_background}
				style={{ backgroundImage: `url(${images[0]})` }}
			/>
			<div
				className={st.hero_background_mobile}
				style={{ backgroundImage: `url(${bg_1})` }}
			/>
			{children}
			<div className='bg-black/65 rounded-full px-5 py-2 flex gap-1 absolute 2xl:right-80 bottom-24 max-sm:hidden max-lg:left-auto max-lg:right-auto max-lg:bottom-16 lg:right-36'>
				{images.map((_, index) => (
					<div
						key={index}
						className={`w-2 h-2 rounded-full ${
							currentIndex.current === index ? 'bg-white' : 'bg-white/50'
						}`}
					/>
				))}
			</div>
		</div>
	)
}

export default HomeScreenBg
