import { FiCalendar } from 'react-icons/fi'
import LotCalculatorMask from './LotCalculatorMask'

const LotSidebarMask = () => {
	return (
		<div>
			<div className='bg-white shadow-xl rounded-lg relative overflow-hidden mb-4 py-2 px-2'>
				<div className='flex justify-between items-center'>
					<div>Vehicle reports</div>
					<div
						className={`px-2 py-1 w-20 h-7 rounded-lg skeleton bg-gray-300`}
					></div>
				</div>
			</div>
			<div className='px-4 bg-white rounded-lg py-6 relative skeleton overflow-hidden shadow-xl'>
				<div className='flex items-center gap-x-2 mb-2'>
					<span>
						<FiCalendar />
					</span>
					<span className='bg-gray-300 w-32 h-5 rounded-md'></span>
				</div>
				<div className='text-center py-1 skeleton h-10 w-full rounded-md bg-gray-300 text-t-text-primary text-lg mt-2'></div>
				<div className={`flex justify-center mt-2`}>
					<div className='w-28 h-5 bg-gray-300 rounded-md'></div>
				</div>
			</div>
			<div className='flex flex-col relative mt-3'>
				<div className='bg-white shadow-xl relative overflow-hidden rounded-lg py-3'>
					<LotCalculatorMask />
				</div>
				<div className='bg-white relative overflow-hidden shadow-xl rounded-lg py-3 mt-3'>
					<LotCalculatorMask />
				</div>
			</div>
		</div>
	)
}

export default LotSidebarMask
