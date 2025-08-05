// app/blog/[post_id]/page.tsx

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { blogPosts } from '../../data'
import PostHeader from './(widgets)/PostHeader'

type Props = {
	params: { post_id: string }
}

export async function generateStaticParams() {
	return blogPosts.map(post => ({
		post_id: post.id.toString(),
	}))
}

export default function BlogPost({ params }: Props) {
	const post = blogPosts.find(p => p.id.toString() === params.post_id)

	if (!post) {
		return <div>Post not found</div>
	}

	return (
		<>
			<PostHeader />
			<div className='bg-white p-8 rounded-2xl max-w-6xl mx-auto h-full'>
				<h1 className='font-bold text-3xl mb-5'>{post.title}</h1>
				<div className='prose max-w-none'>
					<ReactMarkdown remarkPlugins={[remarkGfm]}>{post.text}</ReactMarkdown>
				</div>
			</div>
		</>
	)
}

export const dynamic = 'force-static'
