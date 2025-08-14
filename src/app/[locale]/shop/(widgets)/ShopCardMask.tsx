const ShopCardMask = () => {
	return (
		<div className='relative bg-white bg-opacity-45 rounded-[10px] shadow-xl px-3 py-3'>
			<div className='skeleton max-xl:!w-[280px] max-xl:!min-h-[170px] bg-gray-300 rounded-lg h-[200px] w-[330px]'></div>
			<div className='mt-2 px-3 py-4'>
				<div className='w-[170px] h-[42px] skeleton bg-gray-300 rounded-md'></div>
				<div className='bg-gray-300 h-[24px] mt-2 rounded-md w-[100px] skeleton'></div>
			</div>
		</div>
	)
}

export default ShopCardMask
