const CarCardMask = () => {
	return (
		<div
			className={
				'w-[250px] h-[300px] bg-white bg-opacity-50 rounded-md relative overflow-hidden'
			}
		>
			<div className={''}>
				<div className='relative skeleton h-[190px] overflow-hidden bg-gray-300 rounded-md'></div>
			</div>
			<div className='px-5 py-4 flex flex-col gap-y-2'>
				<div className='w-[80%] skeleton relative overflow-hidden bg-gray-300 h-[20px] rounded-md'></div>
				<div className='w-[60%] skeleton relative overflow-hidden bg-gray-300 h-[18px] rounded-md'></div>
				<div className='w-[30%] skeleton relative overflow-hidden bg-gray-300 h-[20px] rounded-md'></div>
			</div>
		</div>
	)
}

export default CarCardMask
