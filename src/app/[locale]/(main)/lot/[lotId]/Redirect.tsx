'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function OldLotPage() {
	const router = useRouter()
	const params = useParams()
	const searchParams = useSearchParams()
	const [auctionData, setAuctionData] = useState<string>('')

	const id = params.lotId
	const auction = searchParams.get('auction_name')

	useEffect(() => {
		if (auction) {
			setAuctionData(auction || '')
		}
		if (auctionData) {
			router.replace(`/lot/${id}/${auctionData}`)
		}
	}, [auction, id, router])

	console.log('auction_name:', auctionData)

	if (!auctionData) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen text-center p-6'>
				<h1 className='text-2xl font-semibold'>
					ERROR: auction_name undefined
				</h1>
			</div>
		)
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen text-center p-6'>
			<h1 className='text-2xl font-semibold mb-4'>
				This page has moved to a new address
			</h1>
			<p className='text-gray-500 mb-6'>
				If you were not automatically moved, click the button below.
			</p>
			<button
				onClick={() => router.push(`/lot/${id}/${auctionData}`)}
				className='px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition'
			>
				Move now
			</button>
		</div>
	)
}
