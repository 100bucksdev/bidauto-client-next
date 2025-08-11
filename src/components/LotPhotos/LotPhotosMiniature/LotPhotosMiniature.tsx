import { Dispatch, SetStateAction } from 'react'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import st from './lot-photos-miniature.module.css'

const LotPhotosMiniature = ({
	photos,
	mainSwiper,
	currentImageIndex,
	setMiniatureSwiper,
	photoLength,
}: {
	photos: { id: number | null; image_url: string }[]
	mainSwiper: SwiperClass | null
	setMiniatureSwiper: Dispatch<SetStateAction<SwiperClass | null>>
	currentImageIndex: number
	photoLength?: number
}) => {
	const handleMiniatureClick = (index: number) => {
		mainSwiper?.slideTo(index, 0)
	}

	return (
		<>
			{photos.length ? (
				<Swiper
					modules={[Pagination, A11y, Navigation]}
					slidesPerView={photoLength ?? 5}
					freeMode={true}
					watchSlidesProgress={true}
					cssMode
					grabCursor
					onSwiper={swiper => {
						setMiniatureSwiper(swiper)
					}}
					breakpoints={{
						375: {
							slidesPerView: photoLength ?? 5,
						},
					}}
				>
					{photos.map((image, index) => (
						<SwiperSlide key={index}>
							<div
								onClick={() => handleMiniatureClick(index)}
								className={`${
									currentImageIndex === index
										? 'after:bg-white after:bg-opacity-50 after:rounded-xl'
										: ''
								} ${st.photo}`}
							>
								<img
									src={image.image_url}
									alt={''}
									className='rounded-xl object-cover min-h-32 w-full max-md:max-h-16 max-m:max-h-16'
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				''
			)}
		</>
	)
}

export default LotPhotosMiniature
