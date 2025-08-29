'use client'

import { AuctionImage } from '@/types/Shop.interface'
import {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react'
import { FaCar } from 'react-icons/fa'
import { GrNext, GrPrevious } from 'react-icons/gr'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
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
	setPhotos,
	limitPhotos = 4,
	loop = true,
	boxCl,
	photoCl,
}) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const prevButtonRef = useRef<HTMLDivElement>(null)
	const nextButtonRef = useRef<HTMLDivElement>(null)
	const [isArrowVisible, setIsArrowVisible] = useState(false)

	const isStringArray = typeof photos[0] === 'string'

	// Force Swiper to update navigation after refs exist
	const [swiperReady, setSwiperReady] = useState(false)
	useEffect(() => {
		setSwiperReady(true)
	}, [])

	return (
		<div className={`relative w-full h-full ${boxCl}`}>
			{Array.isArray(photos) && photos.length > 0 ? (
				<>
					{/* Prev */}
					<div
						ref={prevButtonRef}
						className={`absolute left-0 top-0 z-10 h-full flex items-center px-2 text-3xl cursor-pointer text-white hover:bg-black/50 rounded-l-lg opacity-0 hover:opacity-100 transition-opacity duration-200 ${
							photos.length > 1 ? 'block' : 'hidden'
						}`}
					>
						<GrPrevious />
					</div>

					{/* Next */}
					<div
						ref={nextButtonRef}
						className={`absolute right-0 top-0 z-10 h-full flex items-center px-2 text-3xl cursor-pointer text-white hover:bg-black/50 rounded-r-lg opacity-0 hover:opacity-100 transition-opacity duration-200 ${
							photos.length > 1 ? 'block' : 'hidden'
						}`}
					>
						<GrNext />
					</div>

					<Swiper
						modules={[Navigation, Pagination, A11y]}
						slidesPerView={1}
						pagination={{ clickable: true }}
						loop={loop}
						allowTouchMove={true}
						grabCursor={true}
						spaceBetween={20}
						navigation={
							swiperReady
								? {
										prevEl: prevButtonRef.current,
										nextEl: nextButtonRef.current,
								  }
								: undefined
						}
						onBeforeInit={swiper => {
							if (typeof swiper.params.navigation !== 'boolean') {
								swiper.params.navigation!.prevEl = prevButtonRef.current
								swiper.params.navigation!.nextEl = nextButtonRef.current
							}
						}}
					>
						{photos.map((photo, index) => {
							if (limitPhotos !== false && index >= limitPhotos) return null

							const imageUrl = isStringArray
								? (photo as string)
								: (photo as AuctionImage).small_image_url ||
								  (photo as AuctionImage).image_url

							if (!imageUrl) return null

							return (
								<SwiperSlide
									key={imageUrl}
									className='w-full h-[200px] md:h-[250px] lg:h-[300px]'
								>
									{!isLoaded && (
										<div className='w-full h-full bg-gray-300 animate-pulse rounded-lg'></div>
									)}
									<img
										src={imageUrl}
										alt='car'
										className={`w-full h-full object-cover rounded-lg ${
											isLoaded ? '' : 'hidden'
										} ${photoCl}`}
										onLoad={() => setIsLoaded(true)}
									/>
								</SwiperSlide>
							)
						})}
					</Swiper>
				</>
			) : (
				<div className='w-full h-[200px] md:h-[250px] lg:h-[300px] bg-zinc-200 flex items-center justify-center rounded-lg text-5xl'>
					<FaCar />
				</div>
			)}
		</div>
	)
}

export default CardPhotos
