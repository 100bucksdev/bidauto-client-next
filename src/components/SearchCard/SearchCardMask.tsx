const SearchCardMask = () => {
	return (
		<>
			<div className='w-full relative rounded-lg py-6 flex px-8 max-md:px-4 overflow-hidden max-2xl:block'>
				<div className='max-2xl:flex max-2xl:justify-center'>
					<div className='w-[330px] max-2xl:min-w-full max-2xl:mb-3 relative'>
						<div className='w-[330px] h-[200px] max-2xl:w-full max-2xl:h-[450px] max-md:h-[220px] skeleton bg-gray-300 rounded-lg' />
					</div>
				</div>
				<div className='flex max-md:flex-col w-full'>
					<div className='ml-4 w-[70%] border-r max-md:w-full max-md:border-b max-md:border-r-0 max-md:mb-3 max-md:pb-3'>
						<div>
							<div className='flex py-5 w-[70%] rounded-md mb-3 skeleton bg-gray-300'></div>
						</div>
						<div className='flex gap-y-2 flex-col'>
							<div className='w-[30%] py-2 rounded-md skeleton bg-gray-300'></div>
							<div className='w-[30%] py-2 rounded-md skeleton bg-gray-300'></div>
							<div className='w-[30%] py-2 rounded-md skeleton bg-gray-300'></div>
							<div className='w-[30%] py-2 rounded-md skeleton bg-gray-300'></div>
							<div className='w-[30%] py-2 rounded-md skeleton bg-gray-300'></div>
						</div>
					</div>
					<div className='w-[30%] max-md:w-full px-3 flex flex-col gap-y-2'>
						<div className='h-6 rounded-md skeleton bg-gray-300'></div>
						<div className='h-9 rounded-md skeleton bg-gray-300'></div>
						<div className='h-6 rounded-md skeleton bg-gray-300'></div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SearchCardMask
