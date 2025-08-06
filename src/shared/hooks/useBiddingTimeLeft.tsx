import { useEffect, useState } from 'react'

export function useBiddingTimeLeft(auctionFinal: number | undefined) {
	const [timeLeft, setTimeLeft] = useState<number>(0)

	useEffect(() => {
		if (!auctionFinal) {
			return
		}

		const finalBiddingDateUnix = auctionFinal

		const calculateTimeLeft = () => {
			const now = new Date().getTime()
			const difference = finalBiddingDateUnix - now
			setTimeLeft(Math.max(0, difference))
		}

		calculateTimeLeft()
		const intervalId = setInterval(calculateTimeLeft, 60 * 1000)

		return () => clearInterval(intervalId)
	}, [auctionFinal])

	const formatTime = (milliseconds: number) => {
		const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24))
		const hours = Math.floor(
			(milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		)
		const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))

		return !days && !hours && !minutes
			? false
			: `${days}d ${hours}h ${minutes}m`
	}

	return formatTime(timeLeft)
}
