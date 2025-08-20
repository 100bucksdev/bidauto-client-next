import LotPhotos from '@/components/LotPhotos/LotPhotos'
import { IShopVehicle } from '@/types/Shop.interface'
import ShopVehicleDetails from './ShopVehicleDetails'

const ShopVehicleMain = ({ vehicle }: { vehicle: IShopVehicle }) => {
	return (
		<div className='flex flex-col'>
			<div className='bg-white rounded-2xl pb-8'>
				<LotPhotos
					disableFavoriteButton
					photos={vehicle.images.map(el => el.image_url) || []}
					miniaturePhotos={vehicle.images.map(el => el.small_image_url) || []}
				/>
				<div>
					<ShopVehicleDetails vehicle={vehicle} />
				</div>
			</div>
		</div>
	)
}

export default ShopVehicleMain
