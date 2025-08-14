import LotHeaderMask from './LotHeaderMask'
import LotMainMask from './LotMainMask'
import LotSidebarMask from './LotSidebarMask'

const LotMask = () => {
	return (
		<div className='mx-auto max-w-[1200px] w-full'>
			<div className='mx-10 max-md:mx-4'>
				<div className='mb-6 w-full'>
					<LotHeaderMask />
				</div>
				<div className='flex max-lg:flex-col gap-x-6'>
					<div className='w-[65%] max-lg:w-full'>
						<LotMainMask />
					</div>
					<div className='w-[35%] max-lg:w-full max-lg:mt-4'>
						<LotSidebarMask />
					</div>
				</div>
			</div>
		</div>
	)
}

export default LotMask
