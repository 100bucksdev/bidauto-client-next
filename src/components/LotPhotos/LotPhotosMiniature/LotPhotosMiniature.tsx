import { Dispatch, SetStateAction } from 'react'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

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
										? 'after:bg-white/40 after:bg-opacity-50 after:rounded-xl'
										: ''
								} relative select-none cursor-pointer rounded-xl mx-2 duration-100 max-md:mx-1 after:content-[''] after:absolute after:inset-0 hover:scale-90 hover:after:bg-white/30 hover:after:bg-opacity-50 hover:after:rounded-xl active:scale-90 active:after:bg-white/20 active:after:bg-opacity-50 active:after:rounded-xl`}
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
