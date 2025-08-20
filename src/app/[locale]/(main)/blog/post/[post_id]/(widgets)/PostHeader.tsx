'use client'

import { useDate } from '@/shared/hooks/useDate'
import { IcArrowRight } from '@/shared/icons'
import { useParams, useRouter } from 'next/navigation'
import { blogPosts } from '../../../data'

export default function PostHeader() {
	const path = useRouter()
	const date = useDate()
	const params = useParams<{ post_id: string }>()

	const formatedDate = (dateString?: string) => {
		if (!dateString) return ''
		const dateObj = new Date(dateString)
		return date.getDate(dateObj)
	}

	const post = blogPosts.find(p => p.id.toString() === params.post_id)

	return (
		<header className='bg-white flex items-center p-5 rounded-2xl max-w-6xl my-8 mx-auto'>
			<button
				className='bg-t-blue-light rounded-full p-2 text-white mr-4'
				onClick={() => path.back()}
			>
				<span className='material-icons'>
					<IcArrowRight width='20' height='20' />
				</span>
			</button>
			<div className='flex leading-tight'>
				<span className='text-xl fllex items-center font-extrabold tracking-tight'>
					<span className='text-t-blue-light text-2xl -mr-1'>T</span>-blog
				</span>
			</div>
			<div className='ml-auto'>Created at: {formatedDate(post?.createdAt)}</div>
		</header>
	)
}
