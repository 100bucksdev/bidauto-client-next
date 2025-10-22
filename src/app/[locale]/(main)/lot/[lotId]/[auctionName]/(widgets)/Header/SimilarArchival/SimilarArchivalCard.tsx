import CardPhotos from '@/components/CarCard/CardPhoto'
import { priceFormat } from '@/shared/utils/priceFormat'
import { TLot } from '@/types/Lot.interface'
import { AuctionImage } from '@/types/Shop.interface'
import Link from 'next/link'
import { useState } from 'react'

const SimilarArchivalCard = ({ lot }: { lot: TLot }) => {
	const [photos, setPhotos] = useState<string[] | AuctionImage[]>(
		lot.VehicleImages ?? []
	)
	const priceFormatter = priceFormat({ char: 'USD' })

	return (
		<div className='p-2 bg-gray-200 rounded-lg mx-1 max-md:w-[70%] max-md:my-1 '>
			<div>
				<CardPhotos photos={photos} setPhotos={setPhotos} loop={false} />
			</div>
			<Link
				href={`/lot/${lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID}/${
					lot.Auction
				}`}
				className='w-full flex flex-wrap gap-2 mx-auto mt-2 text-base hover:text-sky-500'
			>
				<div>{lot.Year}</div>
				<div>{lot.Make}</div>
				<div>{lot.ModelGroup}</div>
			</Link>
			{/* <div className='mt-2 text-sm'>
				<div className='text-slate-500'>Seller</div>
				<div>{lot.Seller ?? 'Unknown'}</div>
			</div> */}
			<div className='grid grid-cols-2 max-md:grid-cols-none max-md:grid-rows-2 w-full mt-2 text-sm bg-gray-300 rounded-lg p-2'>
				<div>
					<div className='text-slate-600'>Seller:</div>
					<div>{lot.Seller ?? 'Unknown'}</div>
				</div>
				<div>
					<div className='text-slate-600'>Final Bid:</div>
					<div>
						{lot.CurrentBid ? priceFormatter.format(lot.CurrentBid) : 'Unknown'}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SimilarArchivalCard
