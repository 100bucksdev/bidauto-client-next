import { motion } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { A11y, Mousewheel, Navigation, Zoom } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import st from './main-swiper-fullscreen.module.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/zoom'

const MainSwiperFullscreen = ({
	photos,
	setCurrentImageIndex,
	setMainFullscreenSwiper,
	mainSwiper,
	miniatureSwiper,
}: {
	photos: { id: number | null; image_url: string }[]
	setCurrentImageIndex: Dispatch<SetStateAction<number>>
	setMainFullscreenSwiper: Dispatch<SetStateAction<SwiperClass | null>>
	mainSwiper: SwiperClass | null
	miniatureSwiper: SwiperClass | null
}) => {
	const handleMainSlideChange = (swiper: SwiperClass) => {
		if (miniatureSwiper) {
			miniatureSwiper.slideTo(swiper.realIndex)
		}
		setCurrentImageIndex(swiper.realIndex)
	}

	const [isArrowVisible, setIsArrowVisible] = useState(false)
	const prevButtonRef = useRef<HTMLDivElement>(null)
	const nextButtonRef = useRef<HTMLDivElement>(null)
	const [innerHeight, setInnerHeight] = useState(0)
	const [innerWidth, setInnerWidth] = useState(0)

	useEffect(() => {
		setInnerHeight(window.innerHeight - 180)
	}, [window.innerHeight, setInnerHeight])

	useEffect(() => {
		setInnerWidth(window.innerWidth)
	}, [window.innerWidth, setInnerWidth])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (mainSwiper) {
				switch (event.key) {
					case 'ArrowLeft':
						mainSwiper.slidePrev()
						break
					case 'ArrowRight':
						mainSwiper.slideNext()
						break
					default:
						break
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [mainSwiper])

	return (
		<motion.div
			className='w-full flex items-center'
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0 }}
			onMouseEnter={() => setIsArrowVisible(true)}
			onMouseLeave={() => setIsArrowVisible(false)}
		>
			<div
				onMouseEnter={() => setIsArrowVisible(true)}
				className={[
					st.arrow,
					`h-1/2 ${isArrowVisible ? 'opacity-100' : 'opacity-0'} ${
						photos && photos.length > 1 ? '' : '!hidden'
					}`,
				].join(' ')}
				ref={prevButtonRef}
			>
				<GrPrevious />
			</div>
			<div
				onMouseEnter={() => setIsArrowVisible(true)}
				className={[
					st.arrow,
					`right-0 h-1/2 ${isArrowVisible ? 'opacity-100' : 'opacity-0'} ${
						photos && photos.length > 1 ? '' : '!hidden'
					}`,
				].join(' ')}
				ref={nextButtonRef}
			>
				<GrNext />
			</div>
			<Swiper
				mousewheel
				onSlideChange={handleMainSlideChange}
				centeredSlides
				modules={[A11y, Navigation, Zoom, Mousewheel]}
				spaceBetween={900}
				breakpoints={{
					1024: {
						spaceBetween: 3000,
					},
					700: {
						spaceBetween: 2000,
					},
				}}
				grabCursor
				onSwiper={e => {
					setMainFullscreenSwiper(e)
				}}
				slidesPerView={1}
				navigation={{
					nextEl: nextButtonRef.current,
					prevEl: prevButtonRef.current,
				}}
				zoom={true}
			>
				{photos.map((photo, index) => (
					<SwiperSlide className='h-full' key={index}>
						<div className='swiper-zoom-container'>
							<div
								className={`w-10/12 rounded-2xl flex justify-center select-none z-50`}
								style={{
									height: `${innerHeight}px`,
									width: `${innerWidth}px`,
								}}
							>
								<img
									src={photo.image_url}
									alt={``}
									className='max-w-full rounded-2xl object-contain'
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</motion.div>
	)
}

export default MainSwiperFullscreen
