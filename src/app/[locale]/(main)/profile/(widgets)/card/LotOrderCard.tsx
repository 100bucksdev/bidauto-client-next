import CardPhotos from '@/components/CarCard/CardPhoto'
import {
	useDownloadUserInvoice,
	useGetUserInvoice,
} from '@/hooks/Invoices.hooks'
import { useGetUserData } from '@/shared/api/User/getUserData/useGetUserData'
import AuctionName from '@/shared/ui/AuctionName'
import CircleLoader from '@/shared/ui/CircleLoader'
import { priceFormat } from '@/shared/utils/priceFormat'
import { IOrder, orderDeliveryStatusesLabels } from '@/types/Order.interface'
import { AuctionImage } from '@/types/Shop.interface'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const LotOrderCard = ({ order }: { order: IOrder }) => {
	const { data } = useGetUserData()
	const is_superuser = data?.is_superuser
	const is_staff = data?.is_staff
	const t = useTranslations()
	const { push: path } = useRouter()
	const [photos, setPhotos] = useState<string[] | AuctionImage[]>([])
	const [isLoading, setIsLoading] = useState(true)

	// const loadPhotos = async (images: any[]) => {
	// 	const photos = []
	// 	setIsLoading(true)

	// 	const limitedImages = images.slice(0, 4)

	// 	for (const photo of limitedImages) {
	// 		const response = await $api.get(photo.url, {
	// 			responseType: 'blob',
	// 		})
	// 		const blobUrl = URL.createObjectURL(response.data)
	// 		photos.push(blobUrl)
	// 	}

	// 	setPhotos(photos)
	// 	setIsLoading(false)
	// }

	useEffect(() => {
		setPhotos(order.auction_image || [])
		setIsLoading(false)
	}, [order])

	const price = priceFormat({ char: 'USD' })

	const downloadUserInvoice = useDownloadUserInvoice()

	const getUserInvoice = useGetUserInvoice()

	const onSubmit = async () => {
		return await getUserInvoice.mutateAsync({
			id: Number(order.id),
			user_id: is_superuser || is_staff ? order.user.id : undefined,
		})
	}

	const onDownload = async () => {
		return await downloadUserInvoice.mutateAsync({
			id: Number(order.id),
			user_id: is_superuser || is_staff ? order.user.id : undefined,
		})
	}

	return (
		<>
			<div
				className={
					'flex max-2xl:block py-3 px-2 border-2 border-gray-400 rounded-2xl my-2.5'
				}
			>
				<div className='max-2xl:flex max-2xl:justify-center'>
					<div className={'max-2xl:mb-3 w-full'}>
						{isLoading ? (
							<div className='w-full skeleton min-w-[330px] h-full min-h-[200px] bg-gray-300 rounded-lg relative overflow-hidden'></div>
						) : (
							<CardPhotos photos={photos} setPhotos={setPhotos} loop={false} />
						)}
					</div>
				</div>
				<div className='flex max-md:flex-col w-full'>
					<div className='px-3 max-md:px-0 max-md:w-full 2xl:w-[60%] lg:w-[60%] max-lg:w-[50%] mt-3 max-md:mb-3 max-md:pb-3'>
						<div className='flex justify-between items-center'>
							<button
								onClick={() => path(`/order/${order.id}`)}
								className='flex gap-1 hover:underline text-2xl text-start font-semibold flex-wrap'
							>
								<div>{order.vehicle_name}</div>
							</button>
						</div>
						<div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.lotId')}: </span>
									<span className='font-medium'>{order.lot_id}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('profile.carValue')}: </span>
									<span className='font-medium'>
										{price.format(order.car_value)}
									</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>VIN: </span>
									<span className='font-medium'>{order.vin}</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.location')}: </span>
									<span className='font-medium'>
										{order.auction_city.location}
									</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
							<div className='mb-1.5'>
								<div className='flex items-center gap-1'>
									<span>{t('lot.details.damage')}: </span>
									<span className='font-medium'>
										{order.damage ? 'Yes' : 'No'}
									</span>
								</div>
								<hr className='border border-gray-200 w-72 max-sm:hidden' />
							</div>
						</div>
					</div>
					<div className='2xl:w-[40%] max-lg:w-[50%] max-md:w-full lg:w-[40%] xl:w-[50%] px-3 justify-items-end flex flex-col'>
						{order.appeal?.new_messages && (
							<div>
								<button
									onClick={() => path(`/order/${order.id}?isOpen=true`)}
									className='text-t-text-primary mb-2 bg-amber-400 hover:bg-amber-500 active:scale-95 duration-100 py-1.5 rounded-full w-full text-center'
								>
									<span className='font-semibold'>
										{order.appeal.new_messages}
									</span>{' '}
									new messages
								</button>
							</div>
						)}
						<div>
							<button
								onClick={onSubmit}
								className='text-t-text-primary mb-2 bg-blue-500 hover:bg-blue-600 active:scale-95 duration-100 py-1.5 rounded-full w-full flex justify-center'
							>
								{getUserInvoice.isLoading ? (
									<div>
										<CircleLoader />
									</div>
								) : (
									<span>{t('profile.seeInvoice')}</span>
								)}
							</button>
						</div>
						{getUserInvoice.isError && (
							<div className='text-t-text-error'>
								{(getUserInvoice.error as any)?.response.data[0]}
							</div>
						)}
						<div>
							<button
								onClick={onDownload}
								className='text-t-text-primary bg-blue-500 hover:bg-blue-600 active:scale-95 duration-100 py-1.5 rounded-full w-full flex justify-center'
							>
								{downloadUserInvoice.isLoading ? (
									<div>
										<CircleLoader />
									</div>
								) : (
									<span>{t('profile.downloadInvoice')}</span>
								)}
							</button>
						</div>
						<div className='w-full text-center mt-2 text-green-500 py-2 bg-green-100 rounded-full'>
							{orderDeliveryStatusesLabels[order.delivery_status]}
						</div>
						<div className='w-full text-center mt-2'>
							<AuctionName auction_name={order.auction_name} />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default LotOrderCard
