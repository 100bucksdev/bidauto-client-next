const CarfaxMask = () => {
	return (
		<div className='flex flex-col gap-y-4 items-center justify-center my-10 px-4'>
			<div className='bg-gray-300 w-[602px] relative overflow-hidden max-md:w-full rounded-md p-4 flex flex-col gap-y-4'>
				<div className='bg-gray-400 skeleton w-full h-52 rounded-md'></div>
				<div className='flex gap-x-4'>
					<div className='bg-gray-400 skeleton w-2/3 h-52 rounded-md'></div>
					<div className='bg-gray-400 skeleton w-1/3 h-52 rounded-md'></div>
				</div>
			</div>
			<div className='bg-gray-300 relative overflow-hidden w-[602px] max-md:w-full rounded-md p-4 flex flex-col gap-y-4'>
				<div className='bg-gray-400 skeleton w-full h-52 rounded-md'></div>
			</div>
		</div>
	)
}

export default CarfaxMask
