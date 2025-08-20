const BlogHeader = () => {
	return (
		<header className='flex max-sm:flex-col max-lg:flex-col items-center justify-between p-4 bg-white border-2 border-gray-400 rounded-2xl my-6 '>
			<div className='flex leading-tight'>
				<span className='text-2xl fllex items-center font-extrabold tracking-tight'>
					<span className='text-t-blue-light text-3xl -mr-1'>T</span>-blog
				</span>
			</div>
			{/* <div className='flex items-center ml-auto max-sm:ml-0 max-sm:mt-5 max-lg:ml-0 max-lg:mt-5'>
				<input
					className='border-2 border-gray-400 px-3 py-1 rounded-full outline-none focus:border-t-blue-light transition-colors'
					placeholder={`${t('blog.search')}...`}
				/>
				<button className='ml-2 p-1.5 bg-t-blue-light text-white rounded-full hover:bg-t-blue-light/90 transition-colors'>
					<IcSearch />
				</button>
			</div> */}
		</header>
	)
}

export default BlogHeader
