import LotPhotos from '@/components/LotPhotos/LotPhotos'
import { auctionName } from '@/shared/utils/auctionName'
import { TLot } from '@/types/Lot.interface'
import LotDetails from './LotDetails'

const LotMain = ({ lot }: { lot: TLot }) => {
	return (
		<div className='flex flex-col'>
			<div className='bg-white pb-8'>
				<div></div>
				<LotPhotos
					view360={lot.iaai_360 || undefined}
					photos={lot.link_img_hd || []}
					miniaturePhotos={lot.link_img_small}
					lot_id={lot.lot_id}
					auction_name={auctionName(lot.lot_id)}
					// engineStartVideo={lot.}
				/>
				<div>
					<LotDetails lot={lot} />
				</div>
			</div>
		</div>
	)
}

export default LotMain
