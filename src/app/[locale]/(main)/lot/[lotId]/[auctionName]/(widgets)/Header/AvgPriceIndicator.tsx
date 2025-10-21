import React from 'react'
import { IoMdArrowDropup } from 'react-icons/io'

interface PriceIndicatorProps {
	minPrice: number
	avgPrice: number
	maxPrice: number
	currentPrice: number
}

const AvgPriceIndicator: React.FC<PriceIndicatorProps> = ({
	minPrice,
	maxPrice,
	currentPrice,
}) => {
	const getRelativePosition = () => {
		if (currentPrice <= minPrice) return 0
		if (currentPrice >= maxPrice) return 100
		return ((currentPrice - minPrice) / (maxPrice - minPrice)) * 100
	}

	const indicatorPosition = getRelativePosition()

	return (
		<div className='w-full max-w-xl mx-auto mt-2'>
			{/* Arrow indicator */}
			<div className='relative h-6'>
				<div
					className='absolute z-20 bottom-1 transition-all duration-300'
					style={{ left: `calc(${indicatorPosition}% - 8px)` }}
				>
					<IoMdArrowDropup size={22} />
				</div>
				{/* Price bar */}
				<div className='relative h-2 w-full rounded-lg overflow-hidden price-gradient shadow-inner'>
					{/* Optional: dividers between segments */}
					<div className='absolute left-1/3 top-0 h-full w-0.5 bg-white/50' />
					<div className='absolute left-2/3 top-0 h-full w-0.5 bg-white/50' />
				</div>
			</div>

			{/* Labels */}
			{/* <div className='flex justify-between text-sm mt-2 text-gray-700'>
				<span>Мин: {minPrice}</span>
				<span>Средн: {avgPrice}</span>
				<span>Макс: {maxPrice}</span>
			</div> */}
		</div>
	)
}

export default AvgPriceIndicator
