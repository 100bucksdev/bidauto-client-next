import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import { IcChevronLeft, IcChevronRight } from '@/shared/icons'

import EngineStartVideoButton from '../EngineStartVideo/EngineStartVideoButton'
import LotPhotoSwiperFavoriteButton from '../LotPhotoSwiperFavoriteButton'
import SwiperFullscreen from '../SwiperFullscreen/SwiperFullscreen'
import View360Button from '../View360/View360Button'
import './lot-photos-swiper.css'
import st from './lot-photos-swiper.module.css'

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
	auction_name?: 'COPART' | 'IAAI'
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
		<>
			<div className='relative mb-4'>
				<div
					className={`absolute duration-200 flex items-start gap-x-3 top-3 left-14 max-lg:left-4 bg-opacity-55 text-t-text-primary`}
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
				<div
					onMouseEnter={() => setIsArrowVisible(true)}
					onMouseLeave={() => setIsArrowVisible(false)}
					className={[
						st.arrow_new,
						`rounded-full left-3 ${
							isArrowVisible ? 'opacity-100' : 'opacity-0'
						} ${photos && photos.length > 1 ? '' : '!hidden'}`,
					].join(' ')}
					ref={prevButtonRef}
				>
					<IcChevronLeft />
				</div>
				<div
					onMouseEnter={() => setIsArrowVisible(true)}
					onMouseLeave={() => setIsArrowVisible(false)}
					className={[
						st.arrow_new,
						`right-3 rounded-full ${
							isArrowVisible ? 'opacity-100' : 'opacity-0'
						} ${photos && photos.length > 1 ? '' : '!hidden'}`,
					].join(' ')}
					ref={nextButtonRef}
				>
					<IcChevronRight />
				</div>

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
						{photos.map(
							(
								image: { id: number | null; image_url: string },
								index: number
							) => (
								<SwiperSlide key={index} onClick={() => openPhoto()}>
									<div
										className='blur-md absolute inset-0 select-none'
										style={{ backgroundImage: `url(${image.image_url})` }}
										draggable={false}
									/>
									<div className={'flex justify-center'}>
										<img
											onMouseEnter={() => setIsArrowVisible(true)}
											onMouseLeave={() => setIsArrowVisible(false)}
											src={image.image_url}
											className='select-none object-cover w-full rounded-2xl max-h-[600px] max-md:max-h-[250px] max-m:max-h-[200px] z-50 relative'
											alt=''
										/>
									</div>
								</SwiperSlide>
							)
						)}
					</Swiper>
				</div>
			</div>
			<SwiperFullscreen
				mainSwiper={mainSwiper}
				isFullscreen={isFullscreen}
				setIsFullscreen={setIsFullscreen}
				photos={photos}
				currentIndex={mainSwiper?.realIndex || 0}
			/>
		</>
	)
}

export default LotPhotosSwiper
