'use client'

import { useState } from 'react'
import { FaCar } from 'react-icons/fa'
import { SwiperClass } from 'swiper/react'

import LotPhotoSwiperFavoriteButton from './LotPhotoSwiperFavoriteButton'
import LotPhotosMiniature from './LotPhotosMiniature/LotPhotosMiniature'
import LotPhotosSwiper from './LotPhotosSwiper/LotPhotosSwiper'

const LotPhotos = ({
	photos,
	miniaturePhotos,
	lot_id,
	auction_name,
	disableFavoriteButton = false,
	view360,
	engineStartVideo,
}: {
	photos: string[]
	miniaturePhotos?: string[]
	lot_id?: number
	auction_name?: 'COPART' | 'IAAI'
	disableFavoriteButton?: boolean
	view360?: string
	engineStartVideo?: string
}) => {
	const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null)
	const [miniatureSwiper, setMiniatureSwiper] = useState<SwiperClass | null>(
		null
	)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	return (
		<>
			{photos.length ? (
				<>
					<div>
						<LotPhotosSwiper
							view360={view360}
							auction_name={auction_name}
							setCurrentImageIndex={setCurrentImageIndex}
							photos={photos.map((url, idx) => ({ id: idx, image_url: url }))}
							mainSwiper={mainSwiper}
							lot_id={lot_id}
							miniatureSwiper={miniatureSwiper}
							disableFavoriteButton={disableFavoriteButton}
							setMainSwiper={setMainSwiper}
							engineStartVideo={engineStartVideo || ''}
						/>
					</div>
					<div className='px-2'>
						<LotPhotosMiniature
							currentImageIndex={currentImageIndex}
							photos={
								miniaturePhotos
									? miniaturePhotos.map((url, idx) => ({
											id: idx,
											image_url: url,
									  }))
									: photos.map((url, idx) => ({ id: idx, image_url: url }))
							}
							mainSwiper={mainSwiper}
							setMiniatureSwiper={setMiniatureSwiper}
						/>
					</div>
				</>
			) : (
				<div className='p-5'>
					<div
						className={`rounded-xl bg-gray-300 w-full h-96 grid place-items-center justify-center text-5xl`}
					>
						{!disableFavoriteButton && (
							<LotPhotoSwiperFavoriteButton
								auction_name={auction_name}
								lot_id={lot_id}
							/>
						)}
						<FaCar />
					</div>
				</div>
			)}
		</>
	)
}

export default LotPhotos
