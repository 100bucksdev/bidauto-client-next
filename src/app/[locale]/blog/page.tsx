import { useDate } from '@/shared/hooks/useDate'
import { getTranslations } from 'next-intl/server'
import BlogHeader from './(components)/BlogHeader'
import { blogPosts } from './data'

export default async function Blog() {
	const t = await getTranslations()
	const date = useDate()

	const formatedDate = (dateString?: string) => {
		if (!dateString) return ''
		const dateObj = new Date(dateString)
		return date.getDate(dateObj)
	}

	return (
		<>
			<BlogHeader />
			<div className='bg-white p-5 rounded-2xl w-full max-w-[78rem] mx-auto overflow-hidden'>
				<div>
					<h1 className='text-2xl font-bold'>
						{t('blog.headers.AllPosts.header')}{' '}
						<span className='text-gray-400'>({blogPosts.length})</span>
					</h1>
					<p className='text-gray-600'>
						{t('blog.headers.AllPosts.subHeader')}
					</p>
				</div>
				<div>
					<div className='mt-6 flex flex-wrap gap-6'>
						{blogPosts.map(post => (
							<div className='bg-gray-100 p-4 w-96 h-56 flex flex-col rounded-lg shadow hover:shadow-lg transition-shadow'>
								<h2 className='text-xl font-semibold'>{post.title}</h2>
								<p className='text-gray-700 mt-2 max-sm:line-clamp-3'>
									{post.description}
								</p>
								<div className='flex items-center mt-auto'>
									<a
										href={`/blog/post/${post.id}`}
										className='text-t-blue-light inline-block'
									>
										{t('blog.readMore')}
									</a>
									<p className='ml-auto text-neutral-600 text-base'>
										{formatedDate(post.createdAt)}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export const dynamic = 'force-static'
