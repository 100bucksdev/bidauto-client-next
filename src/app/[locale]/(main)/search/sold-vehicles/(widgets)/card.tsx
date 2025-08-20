import CardPhotos from '@/components/CarCard/CardPhoto'
import View360Modal from '@/components/LotPhotos/View360/View360Modal'
import InsuranceBar from '@/components/SearchCard/InsuranceBar'
import { getListOfMonthes } from '@/shared/serverActions/getListOfMonthes'
import { getListOfWeekDays } from '@/shared/serverActions/getListOfWeekDays'
import AuctionName from '@/shared/ui/AuctionName'
import { kmInMile, odometer } from '@/shared/utils/odometer'
import { priceFormat } from '@/shared/utils/priceFormat'
import { AuctionImage } from '@/types/Shop.interface'
import { ISoldLot } from '@/types/SoldVehicle.interface'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiCalendar } from 'react-icons/fi'

const SoldVehicleCard = async ({
	lot,
	redirectWithAuction = false,
}: {
	lot: ISoldLot
	redirectWithAuction?: boolean
}) => {
	const [isModalVisible, setIsModalVisible] = useState(false)

	function getSmallImages(lot: ISoldLot): string[] | undefined {
		if (lot.VehicleImagesSmallHD && lot.VehicleImagesSmallHD.length > 0) {
			return lot.VehicleImagesSmallHD.map(image => image.small).filter(
				(small): small is string => small !== undefined
			)
		}
		return lot.VehicleImages || undefined
	}

	const img = getSmallImages(lot) ?? []

	const t = useTranslations()
	const path = useRouter()
	const [photos, setPhotos] = useState<string[] | AuctionImage[]>(img)

	useEffect(() => {
		setPhotos(img ?? [])
	}, [lot])

	const auctionDate = lot.AuctionDate
	const listOfWeekDays = await getListOfWeekDays()
	const listOfMonths = await getListOfMonthes()
	const saleDate = new Date(lot.AuctionDate)

	const price = priceFormat({ char: 'USD' })

	return (
		<>
			<div
				className={
					' relative flex max-xl:block border-2 border-gray-400 rounded-2xl my-2.5 p-2'
				}
			>
				<div className='max-2xl:flex max-2xl:justify-center'>
					<div className={'max-2xl:mb-3 w-full'}>
						<CardPhotos photos={photos} setPhotos={setPhotos} />
					</div>
				</div>
				<div className='flex max-md:flex-col w-full'>
					<div className='px-3 max-md:px-0 max-md:w-full 2xl:w-[60%] lg:w-[60%] max-lg:w-[50%] mt-3 max-md:mb-3 max-md:pb-3'>
						<div className='flex gap-x-5 justify-between items-start'>
							<button
								onClick={() =>
									path.push(
										`/lot/${lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID}${
											redirectWithAuction
												? `?auction_name=${lot.Auction.toUpperCase()}`
												: ''
										}`
									)
								}
								className='flex gap-1 hover:underline text-2xl text-start font-semibold flex-wrap'
							>
								<div>{lot.Year}</div>
								<div>{lot.Make}</div>
								<div>{lot.ModelGroup}</div>
							</button>
						</div>
						<div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.lotId')}: </span>
									<span className='font-medium'>
										{lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID}
									</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>VIN: </span>
									<span className='font-medium'>{lot.VIN}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.odometer')}: </span>
									<span className='font-medium'>
										{odometer.format(Number(lot.Odometer))} miles{' '}
									</span>
									<span className='font-medium'>
										{`(${odometer.format(
											Math.round(Number(lot.Odometer) * kmInMile)
										)} km)`}
									</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.location')}: </span>
									<span className='font-medium'>
										{lot.LocationCity} {lot.LocationState}
									</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.damage')}: </span>
									<span className='font-medium'>{lot.PrimaryDamage}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>Engine Size: </span>
									<span className='font-medium'>{lot.EngineSize}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>Salvage Id: </span>
									<span className='font-medium'>{lot.SalvageId}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>Auction type: </span>
									<span className='font-medium'>{lot.AuctionType}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
						</div>
					</div>
					<div className='2xl:w-[40%] max-lg:w-[50%] max-md:w-full lg:w-[40%] xl:w-[50%] px-3 justify-items-end flex flex-col'>
						<div className='mb-1.5 mt-11'>
							<div className='flex items-center gap-1'>
								<span>Buyer state: </span>
								<span className='font-medium'>{lot.BuyerState}</span>
							</div>
							<hr className='border border-gray-200 w-56 max-sm:hidden' />
						</div>
						<div className='mb-1.5'>
							<div className='flex items-center gap-1'>
								<span>Buyer country: </span>
								<span className='font-medium'>{lot.BuyerCountry}</span>
							</div>
							<hr className='border border-gray-200 w-56 max-sm:hidden' />
						</div>
						<div className='mb-1.5'>
							<div className='flex items-center gap-1'>
								<span>Sale status: </span>
								<span className='font-medium'>{lot.SaleStatus}</span>
							</div>
							<hr className='border border-gray-200 w-56 max-sm:hidden' />
						</div>
						<div className='mb-1.5'>
							<div className='flex items-center gap-1'>
								<span>Purchase price: </span>
								<span className='font-medium'>
									{price.format(lot.PurchasePrice)}
								</span>
							</div>
							<hr className='border border-gray-200 w-56 max-sm:hidden' />
						</div>
						<div className='mb-1.5'>
							<div className='flex items-center gap-1'>
								<span>Reserve price: </span>
								<span className='font-medium'>
									{lot.ReservePrice ? price.format(lot.ReservePrice) : ''}
								</span>
							</div>
							<hr className='border border-gray-200 w-56 max-sm:hidden' />
						</div>
						<div className='mb-1.5'>
							<div className='flex items-center gap-1'>
								<span>Future price: </span>
								<span className='font-medium'>
									{lot.PriceFuture ? price.format(lot.PriceFuture) : ''}
								</span>
							</div>
							<hr className='border border-gray-200 w-56 max-sm:hidden' />
						</div>
						{lot.Auction === 'IAAI' ? (
							<div className='mb-24'>
								<div className='flex items-center gap-1'>
									<span>Vehicle score: </span>
									<span className='font-medium'>{lot.VehicleScore}</span>
								</div>
								<hr className='border border-gray-200 w-56 max-sm:hidden' />
							</div>
						) : lot.Auction === 'COPART' ? (
							<div className='mb-24'>
								<div className='flex items-center gap-1'>
									<span>CopartInterior360: </span>
									<span className='font-medium'>
										{lot.CopartInterior360 ? (
											<a
												href={''}
												target='_blank'
												rel='noopener noreferrer'
												className='text-blue-600 underline'
												onClick={e => {
													e.preventDefault()
													setIsModalVisible(true)
												}}
											>
												View
											</a>
										) : (
											'No photo available'
										)}
									</span>
								</div>
								<hr className='border border-gray-200 w-56 max-sm:hidden' />
							</div>
						) : null}

						<div className='absolute bottom-2 right-0 px-4 flex items-center justify-end gap-2 w-full max-md:flex-col '>
							<div className='w-full text-center'>
								<AuctionName auction_name={lot.Auction} />
							</div>
							<div className='w-full text-center'>
								{lot.Insurance ? <InsuranceBar /> : ''}
							</div>
							<div className='flex max-sm:flex-col items-center gap-2 max-md:gap-1 justify-end w-full text-center'>
								{auctionDate ? (
									<div className='flex items-center justify-center bg-gray-200 py-1.5 px-2 rounded-full gap-x-2 mt-2 w-auto max-sm:w-full text-center'>
										<span>
											<FiCalendar />
										</span>
										<span>
											{`${
												listOfWeekDays[saleDate.getDay()]
											} ${saleDate.getDate()} ${
												listOfMonths[saleDate.getMonth()]
											}, ${saleDate
												.getHours()
												.toString()
												.padStart(2, '0')}:${saleDate
												.getMinutes()
												.toString()
												.padStart(2, '0')}`}
										</span>
									</div>
								) : (
									''
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			{lot.CopartInterior360 ? (
				<View360Modal
					isVisible={isModalVisible}
					setIsVisible={setIsModalVisible}
					src={lot.CopartInterior360}
				/>
			) : (
				''
			)}
		</>
	)
}

export default SoldVehicleCard
