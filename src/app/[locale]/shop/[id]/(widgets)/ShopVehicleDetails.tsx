import { IShopVehicle } from '@/types/Shop.interface'

const ShopVehicleDetails = ({ vehicle }: { vehicle: IShopVehicle }) => {
	return (
		<>
			{vehicle.special_notes ? (
				<>
					<hr className='border border-slate-200 my-6' />
					<div>
						<div className='text-slate-500'>Special Notes</div>
						<div>{vehicle.special_notes}</div>
					</div>
					<hr className='border border-slate-200 my-6' />
				</>
			) : null}
		</>
	)
}

export default ShopVehicleDetails
