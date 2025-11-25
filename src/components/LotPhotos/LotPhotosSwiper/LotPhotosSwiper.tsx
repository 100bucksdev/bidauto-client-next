import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import { IcChevronLeft, IcChevronRight } from '@/shared/icons'

import EngineStartVideoButton from '../EngineStartVideo/EngineStartVideoButton'
import LotPhotoSwiperFavoriteButton from '../LotPhotoSwiperFavoriteButton'
import View360Button from '../View360/View360Button'
import './lot-photos-swiper.css'

const LotPhotosSwiper = ({
	photos,
	mainSwiper,
	setCurrentImageIndex,
	miniatureSwiper,
	lot_id,
	setMainSwiper,
	auction_name,
	disableFavoriteButton,
	view360,
	engineStartVideo,
}: {
	photos: { id: number | null; image_url: string }[]
	mainSwiper: SwiperClass | null
	miniatureSwiper: SwiperClass | null
	setMainSwiper: Dispatch<SetStateAction<SwiperClass | null>>
	setCurrentImageIndex: Dispatch<SetStateAction<number>>
	lot_id?: number
	auction_name?: 'copart' | 'iaai'
	disableFavoriteButton: boolean
	view360?: string
	engineStartVideo: string
}) => {
	const [isArrowVisible, setIsArrowVisible] = useState(false)
	const prevButtonRef = useRef<HTMLDivElement>(null)
	const nextButtonRef = useRef<HTMLDivElement>(null)
	const [isFullscreen, setIsFullscreen] = useState(false)

	const handleMainSlideChange = (swiper: SwiperClass) => {
		if (miniatureSwiper) {
			miniatureSwiper.slideTo(swiper.realIndex)
		}
		setCurrentImageIndex(swiper.realIndex)
	}

	const openPhoto = () => {
		setIsFullscreen(true)
	}

	return (
		<div className='relative mb-4'>
			<div
				className={`absolute duration-200 flex items-start gap-x-3 top-3 left-14 max-lg:left-4 bg-opacity-55 text-t-text-primary z-50`}
			>
				{!disableFavoriteButton && (
					<LotPhotoSwiperFavoriteButton
						auction_name={auction_name}
						lot_id={lot_id}
					/>
				)}
				<View360Button view360={view360} />
				<EngineStartVideoButton engineVideo={engineStartVideo} />
			</div>

			{/* Стрелки */}
			<div
				onMouseEnter={() => setIsArrowVisible(true)}
				onMouseLeave={() => setIsArrowVisible(false)}
				ref={prevButtonRef}
				className={`absolute top-1/2 -translate-y-1/2 left-2 z-50 p-2 rounded-full bg-black/30 cursor-pointer transition-opacity duration-200 text-white ${
					isArrowVisible ? 'opacity-100' : 'opacity-0'
				} ${photos.length > 1 ? '' : 'hidden'}`}
			>
				<IcChevronLeft width='28' height='28' strokeWidth='1.5' />
			</div>
			<div
				onMouseEnter={() => setIsArrowVisible(true)}
				onMouseLeave={() => setIsArrowVisible(false)}
				ref={nextButtonRef}
				className={`absolute top-1/2 -translate-y-1/2 right-2 z-50 p-2 rounded-full bg-black/30 cursor-pointer transition-opacity duration-200 text-white ${
					isArrowVisible ? 'opacity-100' : 'opacity-0'
				} ${photos.length > 1 ? '' : 'hidden'}`}
			>
				<IcChevronRight width='28' height='28' strokeWidth='1.5' />
			</div>

			{/* Swiper */}
			<div className='rounded-2xl relative overflow-hidden'>
				<Swiper
					onSlideChange={handleMainSlideChange}
					modules={[Pagination, A11y, Navigation]}
					navigation={{
						nextEl: nextButtonRef.current,
						prevEl: prevButtonRef.current,
					}}
					cssMode
					onSwiper={swiper => {
						setMainSwiper(swiper)
					}}
					slidesPerView={1}
					spaceBetween={20}
					grabCursor
				>
					{photos.map((image, index) => (
						<SwiperSlide key={index} onClick={() => openPhoto()}>
							<div
								className='blur-md absolute inset-0 select-none'
								style={{ backgroundImage: `url(${image.image_url})` }}
								draggable={false}
							/>
							<div className='flex justify-center'>
								<img
									onMouseEnter={() => setIsArrowVisible(true)}
									onMouseLeave={() => setIsArrowVisible(false)}
									src={image.image_url}
									className='select-none object-cover w-full rounded-2xl max-h-[600px] max-md:max-h-[250px] max-m:max-h-[200px] z-50 relative'
									alt=''
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}

export default LotPhotosSwiper
