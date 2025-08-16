import { getShopVehicleById } from '@/shared/api/Shop/getShopVehicleById/getShopVehicleById'
import { Metadata } from 'next'
import AuctionByIdPage from './AuctionById'

type Props = {
	params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const vehicle = await getShopVehicleById({
		params: { id: Number(params.id) },
	}) // асинхронный запрос

	return {
		title: `T-auto${vehicle ? ` | ${vehicle.data.name}` : ''}`,
		description: 'About t-autologistics',
	}
}

export const AuctionPage = () => {
	return <AuctionByIdPage />
}
