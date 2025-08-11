import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SwiperClass } from 'swiper/react'

import { RxCross1 } from 'react-icons/rx'
import LotPhotosMiniature from '../LotPhotosMiniature/LotPhotosMiniature'
import MainSwiperFullscreen from './MainSwiperFullscreen/MainSwiperFullscreen'

const SwiperFullscreen = ({
	isFullscreen,
	setIsFullscreen,
	photos,
	mainSwiper,
	currentIndex,
}: {
	isFullscreen: boolean
	setIsFullscreen: Dispatch<SetStateAction<boolean>>
	photos: { id: number | null; image_url: string }[]
	mainSwiper?: SwiperClass | null
	currentIndex: number
}) => {
	useEffect(() => {
		const handleBodyOverflow = () => {
			if (isFullscreen) {
				document.body.style.overflow = 'hidden'
				if (window.innerWidth > 768) {
					document.body.style.paddingRight = '8px'
				}
			} else {
				document.body.style.overflow = 'auto'
				document.body.style.paddingRight = '0'
			}
		}

		handleBodyOverflow()

		return () => {
			document.body.style.overflow = 'auto'
			document.body.style.paddingRight = '0'
		}
	}, [isFullscreen])

	return (
		<>
			<AnimatePresence>
				{isFullscreen && (
					<>
						<Swipers
							{...{
								setIsFullscreen,
								photos,
								mainSwiper,
								currentIndex,
							}}
						/>
					</>
				)}
			</AnimatePresence>
		</>
	)
}

const Swipers = ({
	setIsFullscreen,
	photos,
	mainSwiper,
	currentIndex,
}: {
	setIsFullscreen: Dispatch<SetStateAction<boolean>>
	photos: { id: number | null; image_url: string }[]
	mainSwiper?: SwiperClass | null
	currentIndex?: number
}) => {
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState(currentIndex || 0)

	const [mainFullscreenSwiper, setMainFullscreenSwiper] =
		useState<SwiperClass | null>(null)
	const [miniatureSwiper, setMiniatureSwiper] = useState<SwiperClass | null>(
		null
	)

	useEffect(() => {
		if (
			currentIndex &&
			currentIndex >= 0 &&
			mainFullscreenSwiper &&
			!mainFullscreenSwiper.destroyed
		)
			mainFullscreenSwiper.slideTo(currentIndex || 0)
	}, [currentIndex, mainFullscreenSwiper])

	const closePhoto = () => {
		if (mainSwiper) {
			mainSwiper.slideTo(currentPhotoIndex, 0)
		}
		setIsFullscreen(false)
	}

	return (
		<motion.div
			className='fixed top-0 left-0 z-[999999] w-full h-full bg-black bg-opacity-85 flex justify-center items-center'
			initial={{ opacity: 0 }}
			onClick={closePhoto}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div
				onClick={e => e.stopPropagation()}
				className='flex flex-col w-full h-full justify-center'
			>
				<MainSwiperFullscreen
					setMainFullscreenSwiper={setMainFullscreenSwiper}
					mainSwiper={mainFullscreenSwiper}
					photos={photos}
					setCurrentImageIndex={setCurrentPhotoIndex}
					miniatureSwiper={miniatureSwiper}
				/>
				<div className='m-5 opacity-65'>
					<LotPhotosMiniature
						currentImageIndex={currentPhotoIndex}
						photos={photos}
						mainSwiper={mainFullscreenSwiper}
						setMiniatureSwiper={setMiniatureSwiper}
						photoLength={10}
					/>
				</div>
			</div>
			<button
				onClick={closePhoto}
				className='absolute top-0 right-0 text-4xl z-20 text-white bg-zinc-700 p-4'
			>
				<RxCross1 />
			</button>
		</motion.div>
	)
}

export default SwiperFullscreen
