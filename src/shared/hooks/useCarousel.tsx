'use client'

import { useEffect, useState } from 'react'
import { SwiperClass } from 'swiper/react'
import { useWindowWidth } from './useWindowWidth'

export function useCarousel(
	{ scrollTimeMs, loop }: { scrollTimeMs?: number; loop?: boolean } = {
		scrollTimeMs: 5000,
		loop: true,
	}
) {
	const [swiper, setSwiper] = useState<SwiperClass | null>(null)
	const [isHover, setIsHover] = useState(false)
	const { windowWidth, setWindowWidth } = useWindowWidth({
		innerWidth: window.innerWidth,
	})

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [windowWidth, setWindowWidth])

	useEffect(() => {
		const interval = setInterval(() => {
			if (swiper) {
				if (loop) {
					swiper.slideNext()
				} else {
					if (swiper.slides.length - 5 == swiper.realIndex) {
						swiper.slideTo(0)
					} else {
						swiper.slideNext()
					}
				}
			}
		}, scrollTimeMs)

		if (isHover) {
			window.clearInterval(interval)
		}

		return () => {
			window.clearInterval(interval)
		}
	}, [swiper, isHover, loop, scrollTimeMs])

	return { setIsHover, windowWidth, setSwiper }
}
