import { useGetSearchFilters } from '@/shared/api/Search/getAllFilters/useGetAllFilters'
import Menu from '@/shared/ui/Menu'
import { searchOptions } from '@/store/searchOptions.store'
import { useState } from 'react'
import Select from 'react-select'

const SearchSidebarDeep = () => {
	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const [isOpen, setIsOpen] = useState(false)
	const {
		params: {
			auction,
			fuel,
			vehicle_condition,
			odometerFrom,
			odometerTo,
			insurance,
			auctionDateFrom,
			auctionDateTo,
		},
		setBidFrom,
		setBidTo,
		setBuyNowPriceFrom,
		setBuyNowPriceTo,
		setAuctionDateFrom,
		setAuctionDateTo,
		setVehicleCondition,
		setSeller,
		setFuel,
		setOdometerFrom,
		setInsurance,
		setOdometerTo,
	} = searchOptions()
	const { fuels, lot_conditions, insurances } = useGetSearchFilters({
		auction,
	})

	const validateAuctionDate = (date: string) => {
		const from = new Date(auctionDateFrom)
		const to = new Date(date)
		if (from > to) {
			setIsError(true)
			setErrorMessage('Date "From" should be less than date "To"')
			return
		}

		setAuctionDateTo(date)
		setIsError(false)
	}
	return (
		<Menu
			smooth={false}
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			title='Deeper filter'
			className='border-2 border-gray-400'
		>
			<div className='w-full py-3'>
				<div className='flex flex-col items-start px-2'>
					<div className='font-semibold text-base mb-1'>Odometer</div>
					<div className='grid grid-cols-[3fr_1fr_3fr] max-2xl:grid-rows-3 max-2xl:grid-cols-1 max-lg:grid-rows-1 max-lg:grid-cols-[3fr_1fr_3fr] max-md:grid-rows-3 max-md:grid-cols-1 text-sm gap-x-2 items-center justify-center w-full'>
						<div className='flex relative justify-center items-center'>
							<input
								className='w-full outline-none rounded-md border px-3 py-2'
								type='text'
								value={`${odometerFrom}`}
								onChange={e => {
									if (
										(/\D/.test(e.target.value) && e.target.value) ||
										e.target.value.length > 8
									)
										return

									setOdometerFrom(e.target.value)
								}}
							/>
						</div>
						<div className='flex justify-center'>
							<span className='w-4 h-[2px] bg-black'></span>
						</div>
						<div className='flex relative justify-center items-center'>
							<input
								className='w-full outline-none rounded-md border px-3 py-2'
								type='text'
								value={`${odometerTo}`}
								onChange={e => {
									if (
										(/\D/.test(e.target.value) && e.target.value) ||
										e.target.value.length > 8
									)
										return

									setOdometerTo(e.target.value)
								}}
							/>
						</div>
					</div>
				</div>
				<hr className='my-2' />
				<div className='flex flex-col px-2'>
					<div className='font-semibold text-base mb-1'>
						Auction date ( From - To )
					</div>
					<div className='grid grid-cols-[3fr_1fr_3fr] max-2xl:grid-rows-3 max-2xl:grid-cols-1 max-lg:grid-rows-1 max-lg:grid-cols-[3fr_1fr_3fr] max-md:grid-rows-3 max-md:grid-cols-1 text-sm gap-x-2 items-center justify-center w-full'>
						<div className='flex relative justify-center items-center'>
							<input
								id='auctionDateFrom'
								type='date'
								placeholder='Pick date'
								value={auctionDateFrom}
								onChange={e => {
									setAuctionDateFrom(e.target.value)
								}}
								className='w-full outline-none rounded-md border px-3 py-2'
							/>
						</div>
						<div className='flex justify-center'>
							<span className='w-4 h-[2px] bg-black'></span>
						</div>
						<div className='flex relative justify-center items-center'>
							<input
								type='date'
								placeholder='Pick date'
								value={auctionDateTo}
								onChange={e => {
									validateAuctionDate(e.target.value)
								}}
								className={
									'w-full outline-none rounded-md border px-3 py-2' +
									(isError ? ' border-red-500' : '')
								}
							/>
						</div>
					</div>
					{isError ? (
						<div className='text-red-500 text-xs mt-1'>{errorMessage}</div>
					) : null}
				</div>

				<hr className='my-2' />
				<div className='flex flex-col px-2'>
					<div className='font-semibold text-base mb-1'>Insurance</div>
					<Select
						options={insurances}
						value={insurances?.find(
							el => el.value.toLowerCase() === insurance.toLowerCase()
						)}
						onChange={e => {
							setInsurance((e?.value as '1' | '0') || 'ALL')
						}}
					/>
				</div>
				<hr className='my-2' />
				<div className='flex flex-col px-2'>
					<div className='font-semibold text-base mb-1'>Fuel</div>
					<Select
						options={fuels}
						value={fuels?.find(
							el => el.value?.toLowerCase() === fuel?.toLowerCase()
						)}
						onChange={e => {
							setFuel(e?.value || 'ALL_FUELS')
						}}
					/>
				</div>
				<hr className='my-2' />
				<div className='flex flex-col px-2'>
					<div className='font-semibold text-base mb-1'>Lot Condition</div>
					<Select
						options={lot_conditions}
						value={lot_conditions?.find(
							el => el.value?.toLowerCase() === vehicle_condition?.toLowerCase()
						)}
						onChange={e => {
							setVehicleCondition(e?.value || 'ALL_CONDITIONS')
						}}
					/>
				</div>
			</div>
			<hr />
			<div className='px-2 my-2'>
				<button
					onClick={() => {
						setAuctionDateFrom('')
						setAuctionDateTo('')
						setBidFrom('')
						setBidTo('')
						setBuyNowPriceFrom('')
						setBuyNowPriceTo('')
						setFuel('ALL_FUELS')
						setSeller('ALL_SELLERS')
						setVehicleCondition('ALL_CONDITIONS')
						setOdometerFrom('0')
						setOdometerTo('250000')
						setInsurance('ALL')
					}}
					className='px-3 py-2 text-sm btn btn-primary'
				>
					Clear all
				</button>
			</div>
		</Menu>
	)
}

export default SearchSidebarDeep
