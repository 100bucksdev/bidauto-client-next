import SwipeCheckbox from '@/shared/ui/SwipeCheckbox'
import { SoldVehicleSearchOptionsStore } from '@/store/SoldSearchOptions.store'
import { TSoldVehicleSaleStatus } from '@/types/SoldVehicle.interface'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import Select from 'react-select'
import { SALE_STATUS, SELLER_TYPE } from './data'

const SoldVehicleSidebar = () => {
	const path = useRouter()

	const [isAuctionError, setIsAuctionError] = useState(false)
	const [errorAuctionMessage, setErrorAuctionMessage] = useState('')
	const [isCreationError, setIsCreationError] = useState(false)
	const [errorCreationMessage, setErrorCreationMessage] = useState('')
	const [buyerCountryField, setBuyerCountryField] = useState('')

	const {
		params,
		setSaleStatus,
		setSellerType,
		setBuyerCountry,
		setAuctionDateFrom,
		setAuctionDateTo,
		setOdometerMin,
		setOdometerMax,
		setCreatedAtFrom,
		setCreatedAtTo,
		setIsBuyNow,
		reset,
	} = SoldVehicleSearchOptionsStore()

	const {
		sale_status,
		seller_type,
		buyer_country,
		auction_date_from,
		auction_date_to,
		odometer_min,
		odometer_max,
		created_at_from,
		created_at_to,
		is_buy_now,
	} = params

	const validateAuctionDate = (date: string) => {
		const from = new Date(auction_date_from)
		const to = new Date(date)
		if (from > to) {
			setIsAuctionError(true)
			setErrorAuctionMessage('Date "From" should be less than date "To"')
			return
		}

		setAuctionDateTo(date)
		setIsAuctionError(false)
	}

	const validateCreationDate = (date: string) => {
		const from = new Date(created_at_from)
		const to = new Date(date)
		if (from > to) {
			setIsCreationError(true)
			setErrorCreationMessage('Date "From" should be less than date "To"')
			return
		}

		setCreatedAtTo(date)
		setIsCreationError(false)
	}

	useEffect(() => {
		setBuyerCountryField(buyer_country)
	}, [])

	useEffect(() => {
		setBuyerCountry(buyerCountryField)
	}, [buyerCountryField])

	return (
		<div className={'w-full'}>
			<div className='w-full h-full flex justify-center items-center flex-col gap-y-3'>
				<div className='bg-white flex flex-col justify-center w-full rounded-2xl border-2 border-gray-400 py-3 px-3 max-2xl:px-2'>
					<div className='text-lg font-semibold text-gray-700 w-full '>
						Search options:
						<div className='flex flex-col gap-y-2 mt-2'>
							<h2>Sale status:</h2>
							<Select
								value={SALE_STATUS.find(
									el => el.value.toLowerCase() === sale_status.toLowerCase()
								)}
								onChange={e => {
									setSaleStatus((e?.value as TSoldVehicleSaleStatus) || '')
								}}
								className='w-full z-40'
								options={SALE_STATUS}
							/>
						</div>
						<div className='flex flex-col gap-y-2 mt-2'>
							<h2>Seller type:</h2>
							<Select
								value={SELLER_TYPE.find(
									el => el.value.toLowerCase() === seller_type.toLowerCase()
								)}
								onChange={e => {
									const value = e?.value as 'insurance' | 'dealer' | '-'
									if (
										value === 'insurance' ||
										value === 'dealer' ||
										value === '-'
									) {
										setSellerType(value)
									}
								}}
								className='w-full z-39'
								options={SELLER_TYPE}
							/>
						</div>
						<div className='flex flex-col gap-y-2 mt-2'>
							<h2>Buyer country:</h2>
							<input
								type='text'
								value={buyerCountryField}
								onChange={e => setBuyerCountryField(e.target.value)}
								className='w-full z-39 p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
								placeholder='Enter buyer country'
							/>
						</div>
						<div className='flex flex-col gap-y-2 mt-2'>
							<h2>Is buy now:</h2>
							<div className='flex items-center'>
								<SwipeCheckbox
									onChange={e => {
										if (e.currentTarget.checked) {
											setIsBuyNow(true)
										}
										if (!e.currentTarget.checked) {
											setIsBuyNow(false)
										}
									}}
									isChecked={is_buy_now}
									title=''
								/>
							</div>
						</div>
						<div className='flex flex-col gap-2 mt-2'>
							<h2>Odometer:</h2>
							<div className='flex relative justify-center items-center w-full z-39'>
								<input
									className='w-full outline-none rounded-md border px-3 py-2'
									type='text'
									value={`${odometer_min}`}
									onChange={e => {
										if (
											(/\D/.test(e.target.value) && e.target.value) ||
											e.target.value.length > 8
										)
											return

										setOdometerMin(e.target.value)
									}}
								/>
							</div>
							<div className='flex justify-center w-full z-39'>
								<span className='w-4 h-[2px] bg-black'></span>
							</div>
							<div className='flex relative justify-center items-center w-full z-39'>
								<input
									className='w-full outline-none rounded-md border px-3 py-2'
									type='text'
									value={`${odometer_max}`}
									onChange={e => {
										if (
											(/\D/.test(e.target.value) && e.target.value) ||
											e.target.value.length > 8
										)
											return

										setOdometerMax(e.target.value)
									}}
								/>
							</div>
						</div>
						<div className='flex flex-col gap-2 mt-2'>
							<h2>Auction date:</h2>
							<div className='flex relative justify-center items-center w-full z-39'>
								<input
									id='auctionDateFrom'
									type='date'
									placeholder='Pick date'
									value={auction_date_from}
									onChange={e => {
										setAuctionDateFrom(e.target.value)
									}}
									className='w-full outline-none rounded-md border border-gray-300 px-3 py-2'
								/>
							</div>
							<div className='flex justify-center w-full z-39'>
								<span className='w-4 h-[2px] bg-black'></span>
							</div>
							<div className='flex relative justify-center items-center w-full z-39'>
								<input
									type='date'
									placeholder='Pick date'
									value={auction_date_to}
									onChange={e => {
										validateAuctionDate(e.target.value)
									}}
									className={
										'w-full outline-none rounded-md border px-3 py-2 border-gray-300' +
										(isAuctionError ? ' border-red-500' : '')
									}
								/>
							</div>
							{isAuctionError ? (
								<div className='text-red-500 text-xs mt-1'>
									{errorAuctionMessage}
								</div>
							) : null}
						</div>
						<div className='flex flex-col gap-2 mt-2'>
							<h2>Creation date:</h2>
							<div className='flex relative justify-center items-center w-full z-39'>
								<input
									id='auctionDateFrom'
									type='date'
									placeholder='Pick date'
									value={created_at_from}
									onChange={e => {
										setCreatedAtFrom(e.target.value)
									}}
									className='w-full outline-none rounded-md border border-gray-300 px-3 py-2'
								/>
							</div>
							<div className='flex justify-center w-full z-39'>
								<span className='w-4 h-[2px] bg-black'></span>
							</div>
							<div className='flex relative justify-center items-center w-full z-39'>
								<input
									type='date'
									placeholder='Pick date'
									value={created_at_to}
									onChange={e => {
										validateCreationDate(e.target.value)
									}}
									className={
										'w-full outline-none rounded-md border px-3 py-2 border-gray-300' +
										(isCreationError ? ' border-red-500' : '')
									}
								/>
							</div>
							{isCreationError ? (
								<div className='text-red-500 text-xs mt-1'>
									{errorCreationMessage}
								</div>
							) : null}
						</div>
						<button
							className='py-1 px-2 bg-t-blue-light cursor-pointer mt-2 rounded-md text-white hover:bg-t-blue-light/90 active:scale-95 duration-100'
							onClick={() => {
								reset()
								path.push('/admin/sold-vehicles')
							}}
						>
							Clear all
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SoldVehicleSidebar
