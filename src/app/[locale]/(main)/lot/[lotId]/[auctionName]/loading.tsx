'use client'

import LotMask from '@/components/LotMask/LotMask'
import { useEffect } from 'react'

export default function Loading() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [])

	return (
		<div className='flex bg-white py-10'>
			<LotMask />
		</div>
	)
}
