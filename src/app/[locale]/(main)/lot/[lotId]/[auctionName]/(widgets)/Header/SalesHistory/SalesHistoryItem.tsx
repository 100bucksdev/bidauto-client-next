import AuctionName from '@/shared/ui/AuctionName'
import { priceFormat } from '@/shared/utils/priceFormat'
import { ISalesHistoryItem } from '@/types/SalesHistoryItem.interface'

const SalesHistoryItem = ({ item }: { item: ISalesHistoryItem }) => {
	const priceFormatter = priceFormat({ char: 'USD' })
	const saleDate = new Date(item.date)

	const formattedDate = () => (
		<div className='flex w-full justify-center'>
			<span>{saleDate.getFullYear()}-</span>
			<span>{String(saleDate.getMonth() + 1).padStart(2, '0')}-</span>
			<span>{String(saleDate.getDate()).padStart(2, '0')}</span>
		</div>
	)

	return (
		<div className='flex justify-center items-center gap-x-5 text-center'>
			<div className='flex justify-around items-center w-full'>
				<div className='min-w-32 flex'>
					<AuctionName auction_name={item.auction} />
				</div>
				<div className='min-w-44'>{formattedDate()}</div>
				<div className='min-w-44'>{item?.lot_id}</div>
				<div className='min-w-44'>{priceFormatter.format(item?.final_bid)}</div>
				<div className='min-w-44'>{item?.buyer_country}</div>
				<div
					className={` text-t-text-primary min-w-44 rounded-md px-2 bg-opacity-70 ${
						item?.status?.toUpperCase() === 'NOT SOLD'
							? 'bg-red-500'
							: item?.status?.toUpperCase() === 'SOLD'
							? 'bg-green-500'
							: 'bg-orange-400'
					}`}
				>
					{item.status.toUpperCase() !== 'SOLD' &&
					item.status.toUpperCase() !== 'NOT SOLD'
						? 'No information'
						: item.status}
				</div>
			</div>
		</div>
	)
}

export default SalesHistoryItem
