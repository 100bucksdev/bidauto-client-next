'use client'

import { useGetCarfax } from '@/shared/api/Lots/carfax/get/useGetCarfax'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import CarfaxMask from './(components)/CarfaxMask'

const CarfaxPageClient = () => {
	const params = useParams<{
		auction: 'COPART' | 'IAAI'
		id: string
	}>()

	const auction = params?.auction || 'COPART'
	const lotId = params?.id || '0'

	const { data, isFetching } = useGetCarfax({
		auction,
		id: lotId,
	})

	useEffect(() => {
		const html = document.querySelector('html')
		if (html) html.style.fontSize = '16px'
	}, [])

	return (
		<div className='flex justify-center h-full'>
			{isFetching ? (
				<CarfaxMask />
			) : (
				<>
					{data?.data?.report ? (
						<div
							className='max-w-screen overflow-x-auto h-full'
							style={{ height: '100vh', width: '100%' }}
						>
							<iframe
								src={data?.data?.link}
								width='100%'
								height='100%'
								style={{
									marginTop: '-7vh',
									border: 'none',
								}}
								allowFullScreen
							/>
						</div>
					) : (
						<div className='grid justify-center my-20 font-semibold text-2xl'>
							No Carfax Found
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default CarfaxPageClient
