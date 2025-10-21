const SimilarArchivalCardSkeleton = () => {
	return (
		<div>
			<div className='skeleton w-[200px] h-[160px] rounded-lg bg-slate-200'></div>
			<div className='flex flex-wrap gap-2 mt-1 text-sm'>
				<div className='skeleton w-[100px] h-[20px] rounded-lg bg-slate-200'></div>
				<div className='skeleton w-[100px] h-[20px] rounded-lg bg-slate-200'></div>
				<div className='skeleton w-[100px] h-[20px] rounded-lg bg-slate-200'></div>
			</div>
			<div className='mt-2 text-sm'>
				<div className='text-slate-400'>Seller</div>
				<div className='mt-1 skeleton w-[100px] h-[20px] rounded-lg bg-slate-200'></div>
			</div>
		</div>
	)
}

export default SimilarArchivalCardSkeleton
