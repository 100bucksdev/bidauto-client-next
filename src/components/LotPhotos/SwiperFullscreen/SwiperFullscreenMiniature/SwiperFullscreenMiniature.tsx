import { Dispatch, SetStateAction } from 'react'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import st from './swiper-fullscreen-miniature.module.css'

const SwiperFullscreenMiniature = ({
	photos,
	setMiniatureFullscreenSwiper,
	mainFullscreenSwiper,
	currentPhotoIndex,
}: {
	photos: string[]
	setMiniatureFullscreenSwiper: Dispatch<SetStateAction<SwiperClass | null>>
	mainFullscreenSwiper: SwiperClass | null
	currentPhotoIndex: number
}) => {
	const handleMiniatureClick = (index: number) => {
		mainFullscreenSwiper?.slideTo(index)
	}

	return (
		<div className={`mb-5 mx-5 max-md:mx-1 flex items-end h-full w-full`}>
			<Swiper
				modules={[Pagination, A11y, Navigation]}
				slidesPerView={3}
				onSwiper={e => setMiniatureFullscreenSwiper(e)}
				initialSlide={currentPhotoIndex}
				breakpoints={{
					425: {
						slidesPerView: 4,
					},
					768: {
						slidesPerView: 5,
					},
					1024: {
						slidesPerView: 6,
					},
					1440: {
						slidesPerView: 7,
					},
					1800: {
						slidesPerView: photos.length < 10 ? photos.length : 10,
					},
				}}
			>
				{photos.map((photo, index) => (
					<SwiperSlide key={index}>
						<div
							onClick={() => handleMiniatureClick(index)}
							className={`select-none px-2 w-44 max-md:h-16 2xl:h-28 max-lg:h-20 h-24 max-md:w-28 max-lg:w-32 max-2xl:w-36 flex items-center`}
						>
							<div
								className={`${
									currentPhotoIndex === index
										? 'after:bg-black after:bg-opacity-50'
										: ''
								} ${st.photo}`}
							>
								<img
									src={photo}
									alt={``}
									className='w-full h-full object-cover rounded-md'
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default SwiperFullscreenMiniature
