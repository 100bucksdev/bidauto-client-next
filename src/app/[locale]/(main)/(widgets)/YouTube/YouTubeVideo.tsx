'use client'

import instagramLogo from '@/assets/images/InstagramLogo.jpg'
import { IcBookmark, IcHeart, IcMessage, IcSend } from '@/shared/icons'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface props {
	videoUrl: string
}

export default function YouTUbeVideoPost({ videoUrl }: props) {
	const t = useTranslations()

	const goPost = () => {
		window.location.href = videoUrl
	}

	const goProfile = () => {
		window.location.href = `https://www.youtube.com/@bidautoLT/featured`
	}
	return (
		<div className='w-fit bg-white rounded-2xl overflow-hidden'>
			{/* Header */}
			<div className='flex items-center px-4 py-3 bg-gray-100 border-b border-gray-200'>
				<Image
					src={instagramLogo}
					alt={`Bidauto.online profile`}
					className='w-10 h-10 rounded-full mr-3'
				/>
				<div className='flex-grow'>
					<div className='text-sm font-semibold'>@Bidauto.online</div>
					{/* <div className='text-xs text-gray-500 w-32 truncate'>
						{post.locationName}
					</div> */}
				</div>
				<button
					onClick={goProfile}
					className='text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-3 py-1'
				>
					{t('home.instagram.viewProfile')}
				</button>
			</div>

			{/* Video */}
			<iframe
				width='330'
				height='600'
				src={videoUrl}
				title=''
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				referrerPolicy='strict-origin-when-cross-origin'
				allowFullScreen
			></iframe>

			{/* Footer */}
			<div className='flex items-center py-3 px-5'>
				<div className='flex gap-3 items-center'>
					<button
						onClick={goPost}
						className='text-gray-500 hover:text-red-500 text-xl'
					>
						<IcHeart />
					</button>
					<button
						onClick={goPost}
						className='text-gray-500 hover:text-green-500 text-xl'
					>
						<IcMessage />
					</button>
					<button
						onClick={goPost}
						className='text-gray-500 hover:text-blue-500 text-xl'
					>
						<IcSend />
					</button>
				</div>
				<button
					onClick={goPost}
					className='text-gray-500 hover:text-yellow-500 text-xl ml-auto'
				>
					<IcBookmark />
				</button>
			</div>
		</div>
	)
}
