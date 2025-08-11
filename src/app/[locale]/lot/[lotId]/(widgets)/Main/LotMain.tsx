import LotPhotos from '@/components/LotPhotos/LotPhotos'
import { TLot } from '@/types/Lot.interface'
import LotDetails from './LotDetails'

const LotMain = ({ lot }: { lot: TLot }) => {
	return (
		<div className='flex flex-col'>
			<div className='bg-white pb-8'>
				<div></div>
				<LotPhotos
					view360={lot.Auction === 'IAAI' ? lot.View360 : undefined}
					photos={lot.VehicleImages || []}
					miniaturePhotos={
						lot.VehicleImagesSmallHD?.map(url => url.small).filter(
							(url): url is string => typeof url === 'string'
						) || []
					}
					lot_id={lot.Auction === 'IAAI' ? Number(lot.Stock) : Number(lot.U_ID)}
					auction_name={lot.Auction}
					engineStartVideo={lot.Auction === 'IAAI' ? lot.EngineVideo : ''}
				/>
				<div>
					<LotDetails lot={lot} />
				</div>
			</div>
		</div>
	)
}

export default LotMain
