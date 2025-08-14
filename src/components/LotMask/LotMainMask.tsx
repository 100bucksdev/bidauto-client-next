import LotDetailsMask from './LotDetailsMask'

const LotMainMask = () => {
	return (
		<div className='bg-white rounded-lg shadow-xl pb-8 relative overflow-hidden'>
			<div>
				<div className='h-[550px] skeleton max-md:h-[250px] relative max-m:h-[200px] max-lg:h-[400px] w-full rounded-lg bg-gray-300'></div>
				<div className='px-2 w-full grid grid-cols-4 mt-3 gap-x-2 '>
					<div className='h-24 max-md:h-16 w-full max-m:h-16 rounded-md skeleton bg-gray-300'></div>
					<div className='h-24 max-md:h-16 w-full max-m:h-16 rounded-md skeleton bg-gray-300'></div>
					<div className='h-24 max-md:h-16 w-full max-m:h-16 rounded-md skeleton bg-gray-300'></div>
					<div className='h-24 max-md:h-16 w-full max-m:h-16 rounded-md skeleton bg-gray-300'></div>
				</div>
			</div>
			<div>
				<LotDetailsMask />
			</div>
		</div>
	)
}

export default LotMainMask
