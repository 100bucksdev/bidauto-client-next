'use server'

export async function getBiddingTimeLeft(auctionFinal: number | undefined) {
	if (!auctionFinal) return false

	const now = Date.now()
	const difference = Math.max(0, auctionFinal - now)

	const days = Math.floor(difference / (1000 * 60 * 60 * 24))
	const hours = Math.floor(
		(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	)
	const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

	return !days && !hours && !minutes ? false : `${days}d ${hours}h ${minutes}m`
}
