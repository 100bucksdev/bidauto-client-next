import LotMask from '@/components/LotMask/LotMask'
import { getShopVehicleById } from '@/shared/api/Shop/getShopVehicleById/getShopVehicleById'
import { Metadata } from 'next'
import ShopVehicleHeader from './(widgets)/ShopVehicleHeader'
import ShopVehicleMain from './(widgets)/ShopVehicleMain'
import ShopVehicleSidebar from './(widgets)/ShopVehicleSidebar'

type Props = {
	params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params
	const vehicle = await getShopVehicleById({
		params: { id: Number(id) },
	})

	return {
		title: `T-auto${vehicle ? ` | ${vehicle.data.name}` : ''}`,
		description: 'About t-autologistics',
	}
}

const ShopVehicle = async ({ params }: Props) => {
	const { id } = await params
	const data = await getShopVehicleById({ params: { id: Number(id) } })

	const vehicle = data?.data

	return (
		<>
			<div
				className={`flex w-full h-auto bg-white py-10 ${
					!data ? 'justify-center' : ''
				}`}
			>
				{!data ? (
					<LotMask />
				) : data && vehicle ? (
					<div className='mx-auto max-w-[1400px] w-full'>
						<div className='mx-10 max-md:mx-4'>
							<div className='mb-6 max-lg:mb-4'>
								<ShopVehicleHeader vehicle={vehicle} />
							</div>
							<div className='flex max-lg:flex-col-reverse max-lg:gap-y-4 gap-x-6'>
								<div className='w-[65%] max-lg:w-full'>
									<ShopVehicleMain vehicle={vehicle} />
								</div>
								<div className='w-[35%] max-lg:w-full'>
									<ShopVehicleSidebar vehicle={vehicle} />
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className='justify-center font-semibold flex text-5xl rounded-lg mx-auto max-w-[1100px] w-full bg-white py-10'>
						{'Vehicle Not Found'}
					</div>
				)}
			</div>
		</>
	)
}

export default ShopVehicle
