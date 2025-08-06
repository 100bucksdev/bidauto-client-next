'use client'

import { IcBookmark, IcHeart, IcMessage, IcSend } from '@/shared/icons'
import { IInstagramPost } from '@/shared/types/InstagramPost.interface'

import instagramLogo from '@/assets/images/InstagramLogo.jpg'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { useRef, useState } from 'react'

interface props {
	post: IInstagramPost
}

export default function VideoPost({ post }: props) {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const t = useTranslations()

	const handleVideoClick = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause()
			} else {
				videoRef.current.play()
			}
			setIsPlaying(!isPlaying)
		}
	}

	const goPost = () => {
		window.location.href = post.url
	}

	const goProfile = () => {
		window.location.href = post.inputUrl
	}
	return (
		<div className='3xl:w-[17vw] 2xl:w-[23vw] lg:w-[30vw] max-lg:w-[40vw] max-sm:w-[80vw] bg-white rounded-2xl overflow-hidden'>
			{/* Header */}
			<div className='flex items-center px-4 py-3 bg-gray-100 border-b border-gray-200'>
				<Image
					src={instagramLogo}
					alt={`${post.ownerUsername}'s profile`}
					className='w-10 h-10 rounded-full mr-3'
				/>
				<div className='flex-grow'>
					<div className='text-sm font-semibold'>@{post.ownerUsername}</div>
					<div className='text-xs text-gray-500 w-32 truncate'>
						{post.locationName}
					</div>
				</div>
				<button
					onClick={goProfile}
					className='text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-3 py-1'
				>
					{t('home.instagram.viewProfile')}
				</button>
			</div>

			{/* Video */}
			<div className='relative'>
				<div
					className='relative flex flex-col items-center w-full h-auto max-lg:auto max-sm:h-auto bg-cover bg-center cursor-pointer'
					style={{ backgroundImage: `url(${post.displayUrl})` }}
					onClick={handleVideoClick}
				>
					<video
						ref={videoRef} // Привязываем видео к рефу
						className='3xl:w-[16vw] 2xl:w-[22vw] cursor-pointer rounded-b-lg h-auto max-lg:w-full'
					>
						<source src={post.videoUrl} type='video/mp4' />
						Your browser does not support the video tag.
					</video>
				</div>
			</div>

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
