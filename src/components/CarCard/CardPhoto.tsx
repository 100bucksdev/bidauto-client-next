'use client'

import { AuctionImage } from '@/shared/types/Shop.interface'
import { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { FaCar } from 'react-icons/fa'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface CardPhotosProps {
	photos: string[] | AuctionImage[]
	setPhotos: Dispatch<SetStateAction<string[] | AuctionImage[]>>
	limitPhotos?: number | false
	loop?: boolean
	boxCl?: string
	photoCl?: string
}

const CardPhotos: FC<CardPhotosProps> = ({
	photos,
	limitPhotos = 4,
	loop = true,
	photoCl,
	boxCl,
}) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const prevButtonRef = useRef<HTMLDivElement>(null)
	const nextButtonRef = useRef<HTMLDivElement>(null)
	const [isArrowVisible, setIsArrowVisible] = useState(false)

	// Проверка: строка или объект
	const isStringArray = typeof photos[0] === 'string'

	return (
		<div className='p-3'>
			<div
				className={`card_photos relative overflow-hidden rounded-xl ${boxCl}`}
			>
				<div
					onMouseEnter={() => setIsArrowVisible(true)}
					onMouseLeave={() => setIsArrowVisible(false)}
					className={`absolute z-10 items-center !flex h-full px-2 text-3xl cursor-pointer text-white select-none duration-200 hover:bg-black/50 rounded-l-lg ${
						isArrowVisible ? 'opacity-100' : 'opacity-0'
					} ${photos && photos.length > 1 ? 'block' : '!hidden'}`}
					ref={prevButtonRef}
				>
					<GrPrevious />
				</div>
				<div
					onMouseEnter={() => setIsArrowVisible(true)}
					onMouseLeave={() => setIsArrowVisible(false)}
					className={`absolute z-10 items-center !flex h-full px-2 text-3xl cursor-pointer text-white select-none duration-200 hover:bg-black/50 right-0 rounded-r-lg ${
						isArrowVisible ? 'opacity-100' : 'opacity-0'
					} ${photos && photos.length > 1 ? 'block' : '!hidden'}`}
					ref={nextButtonRef}
				>
					<GrNext />
				</div>
				<div className={`select-none w-full rounded-lg h-full min-w-[200px]`}>
					{!isLoaded && !!photos?.length && (
						<div className='bg-gray-300 skeleton w-full rounded-lg h-[200px]'></div>
					)}

					{Array.isArray(photos) && photos.length > 0 ? (
						<Swiper
							modules={[Pagination, A11y, Navigation]}
							slidesPerView={1}
							pagination={{ clickable: true }}
							allowTouchMove={true}
							centeredSlides={true}
							navigation={{
								nextEl: nextButtonRef.current,
								prevEl: prevButtonRef.current,
							}}
							grabCursor={true}
							spaceBetween={20}
							loop={loop}
						>
							{photos.map((photo, index) => {
								if (limitPhotos !== false && index >= limitPhotos) return null

								const imageUrl = isStringArray
									? (photo as string)
									: (photo as AuctionImage).small_image_url ||
									  (photo as AuctionImage).image_url

								return (
									<SwiperSlide key={index}>
										<img
											onMouseEnter={() => setIsArrowVisible(true)}
											onMouseLeave={() => setIsArrowVisible(false)}
											className={`photo ${photoCl} ${
												isLoaded ? '' : '!hidden'
											}`}
											src={imageUrl}
											alt='car'
											onLoad={() => setIsLoaded(true)}
										/>
									</SwiperSlide>
								)
							})}
						</Swiper>
					) : (
						<div
							className={`w-full h-[19vh] ${boxCl} bg-zinc-200 !grid !place-items-center text-5xl border border-gray-300 rounded-lg`}
						>
							<FaCar />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default CardPhotos
