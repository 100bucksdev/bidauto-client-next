'use client'

import logo from '@/assets/images/mstile-150x150.png'
import Image from 'next/image'

const ChatGPTLogo = () => {
	return (
		<div className='flex justify-center items-center rounded-full bg-blue-700 overflow-hidden'>
			<Image
				src={logo}
				alt='AI Logo'
				className='w-72 h-auto translate-y-[0.35rem] scale-150'
			/>
		</div>
	)
}

export default ChatGPTLogo
