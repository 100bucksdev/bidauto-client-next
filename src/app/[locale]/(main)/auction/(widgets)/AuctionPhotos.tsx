import React, { useEffect, useState } from 'react'
import { FaCar } from 'react-icons/fa'

interface ImageCarouselProps {
	imageUrls: string[]
}

const AuctionImage: React.FC<ImageCarouselProps> = ({ imageUrls }) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [imageHeights, setImageHeights] = useState<number[]>([])

	useEffect(() => {
		if (imageUrls && imageUrls.length > 0) {
			const heights: number[] = []
			let loadedCount = 0

			imageUrls.forEach((imageUrl, index) => {
				const img = new Image()
				img.onload = () => {
					heights[index] = img.height
					loadedCount++

					if (loadedCount === imageUrls.length) {
						setImageHeights(heights)
					}
				}
				img.src = imageUrl
			})

			const intervalId = setInterval(() => {
				setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length)
			}, 5000)

			return () => clearInterval(intervalId)
		}
	}, [imageUrls])

	if (!imageUrls || imageUrls.length === 0) {
		return (
			<div className='p-5'>
				<div className='rounded-xl bg-gray-300 w-full h-96 grid place-items-center justify-center text-5xl'>
					<FaCar />
				</div>
			</div>
		)
	}

	return (
		<div
			className='p-5 relative overflow-hidden mb-5'
			style={{ height: `${imageHeights[currentIndex]}px` }}
		>
			{imageUrls.map((imageUrl, index) => (
				<img
					key={index}
					src={imageUrl}
					alt={`Image ${index}`}
					className={`absolute top-0 left-0 w-full h-full object-cover rounded-xl transition-opacity duration-1000 ${
						index === currentIndex ? 'opacity-100' : 'opacity-0'
					}`}
				/>
			))}
		</div>
	)
}

export default AuctionImage
