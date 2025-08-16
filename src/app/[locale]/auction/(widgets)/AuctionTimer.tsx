import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AuctionTimerProps {
	duration: number
	percentage: number
}

export default function AuctionTimer({
	duration,
	percentage,
}: AuctionTimerProps) {
	const [key, setKey] = useState(0)
	const [percent, setPercent] = useState(100)

	useEffect(() => {
		setKey(prev => prev + 1)
		setPercent(percentage)
	}, [duration, percentage])

	return (
		<div className='w-full bg-gray-200 rounded-full overflow-hidden'>
			<motion.div
				key={key}
				initial={{ width: `${percent}%` }}
				animate={{ width: '0%' }}
				transition={{ duration: duration / 1000, ease: 'linear' }}
				className='h-2 bg-blue-500 rounded-full'
			/>
		</div>
	)
}
