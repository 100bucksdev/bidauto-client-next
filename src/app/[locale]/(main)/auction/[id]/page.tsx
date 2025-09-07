import { getShopVehicleById } from '@/shared/api/Shop/getShopVehicleById/getShopVehicleById'
import { Metadata } from 'next'
import AuctionByIdPage from './AuctionById'

type AuctionParams = Promise<{ id: string }>
type AuctionProps = { params: AuctionParams }

// generateMetadata теперь должна работать с Promise params
export async function generateMetadata({
	params,
}: AuctionProps): Promise<Metadata> {
	const { id } = await params
	const vehicle = await getShopVehicleById({
		params: { id: Number(id) },
	})
	return {
		title: `T-auto${vehicle ? ` | ${vehicle.data.name}` : ''}`,
		description: 'About t-autologistics',
	}
}

// default export также должен работать с Promise params
export default async function AuctionPage({ params }: AuctionProps) {
	const { id } = await params
	return <AuctionByIdPage id={id} />
}
