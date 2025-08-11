const SalesHistoryItemMask = () => {
	return (
		<div className='flex justify-center items-center gap-x-5 text-center'>
			<div className='flex justify-around items-center w-full'>
				<div className='min-w-32 h-6 rounded-md skeleton bg-gray-300'></div>
				<div className='min-w-44 h-6 rounded-md bg-gray-300 skeleton'></div>
				<div className='min-w-44 h-6 rounded-md bg-gray-300 skeleton'></div>
				<div className='min-w-44 h-6 rounded-md bg-gray-300 skeleton'></div>
				<div className='min-w-44 h-6 rounded-md bg-gray-300 skeleton'></div>
				<div className={`min-w-44 h-6 rounded-md bg-gray-300 skeleton`}></div>
			</div>
		</div>
	)
}

export default SalesHistoryItemMask
