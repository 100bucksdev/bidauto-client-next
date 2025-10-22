// app/[locale]/(main)/blog/post/[post_id]/page.tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { blogPosts } from '../../data'
import PostHeader from './(widgets)/PostHeader'

export async function generateStaticParams() {
	const locales = ['en', 'lt']
	return locales.flatMap(locale =>
		blogPosts.map(post => ({
			locale,
			post_id: post.id.toString(),
		}))
	)
}

export default async function BlogPost({
	params,
}: {
	params: Promise<{ locale: string; post_id: string }>
}) {
	// ✅ Await params
	const { post_id } = await params

	const post = blogPosts.find(p => p.id.toString() === post_id)

	if (!post) {
		return <div>Post not found</div>
	}

	return (
		<div className='px-72'>
			<PostHeader />
			<div className='bg-white p-8 rounded-2xl max-w-6xl mx-auto h-full'>
				<h1 className='font-bold text-3xl mb-5'>{post.title}</h1>
				<div className='prose max-w-none'>
					<ReactMarkdown remarkPlugins={[remarkGfm]}>{post.text}</ReactMarkdown>
				</div>
			</div>
		</div>
	)
}
