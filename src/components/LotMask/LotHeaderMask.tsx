const LotHeaderMask = () => {
	return (
		<div className='bg-white shadow-xl py-6 rounded-lg w-full relative overflow-hidden'>
			<div className='px-8 max-md:px-4 flex justify-between mb-2'>
				<div className='max-lg:w-full'>
					<div className='flex mb-2 items-center justify-between'>
						<div className='flex text-xl max-md:text-lg gap-x-3 font-semibold max-l:flex-col max-l:items-start max-md:justify-between max-md:w-full'>
							<div className='w-[160px] h-9 bg-gray-300 skeleton rounded-md'></div>
							<div className='max-l:mt-2 h-9 w-[120px] bg-gray-300 skeleton rounded-md'></div>
						</div>
					</div>
					<div className='max-md:text-sm'>
						<div className='w-[220px] mt-2 bg-gray-300 skeleton rounded-md h-5'></div>
						<div className='w-[220px] mt-2 bg-gray-300 skeleton rounded-md h-5'></div>
						<div className='w-[220px] mt-2 bg-gray-300 skeleton rounded-md h-5'></div>
						<div className='w-[220px] mt-2 bg-gray-300 skeleton rounded-md h-5'></div>
						<div className='w-[220px] mt-2 bg-gray-300 skeleton rounded-md h-5'></div>
						<div className='w-[220px] mt-2 bg-gray-300 skeleton rounded-md h-5'></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LotHeaderMask
