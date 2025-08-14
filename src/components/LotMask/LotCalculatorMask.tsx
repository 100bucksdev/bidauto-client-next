import { LuCalculator } from 'react-icons/lu'

const LotCalculatorMask = () => {
	return (
		<div>
			<div>
				<div className='flex items-center gap-x-3 max-md:gap-x-1 pb-3 pl-2 font-semibold'>
					<div className='text-3xl max-md:text-2xl'>
						<LuCalculator />
					</div>
					<div className='bg-gray-300 skeleton w-52 rounded-md h-8'></div>
				</div>
				<hr />
			</div>
			<div className='mb-3 text-lg max-md:text-base flex flex-col px-4'>
				<div className='flex items-center gap-x-2 py-2'>
					<div className='py-2 bg-gray-300 skeleton w-32 rounded-md h-5'></div>
				</div>
				<hr />
				<div className='flex items-center gap-x-2 py-2'>
					<div className='py-2 bg-gray-300 skeleton w-32 rounded-md h-5'></div>
				</div>
				<hr />
				<div className='flex items-center gap-x-2 py-2'>
					<div className='py-2 bg-gray-300 skeleton w-32 rounded-md h-5'></div>
				</div>
				<hr />
				<div className='flex items-center gap-x-2 py-2'>
					<div className='py-2 bg-gray-300 skeleton w-32 rounded-md h-5'></div>
				</div>
				<hr />
				<div className='flex items-center gap-x-2 py-2'>
					<div className='py-2 bg-gray-300 skeleton w-32 rounded-md h-5'></div>
				</div>
				<hr />
				<div className='flex items-center gap-x-2 py-2'>
					<div className='py-2 bg-gray-300 skeleton w-32 rounded-md h-5'></div>
				</div>
				<hr />
				<div className='flex items-center gap-x-2 py-2'>
					<div className='py-2 bg-gray-300 skeleton w-32 rounded-md h-5'></div>
				</div>
				<hr />
			</div>
		</div>
	)
}

export default LotCalculatorMask
