'use client'

import { priceFormat } from '@/shared/utils/priceFormat'
import { IAvgPrices } from '@/types/Lot.interface'
import { useTranslations } from 'next-intl'
import AvgPriceIndicator from './AvgPriceIndicator'

const AveragePrices = ({
	avg_prices,
	currentPrice,
}: {
	avg_prices: IAvgPrices | undefined
	currentPrice: number
}) => {
	const t = useTranslations()
	const price = priceFormat({ char: 'USD' })

	return (
		<>
			{avg_prices && (
				<div>
					<div className=' bg-gray-200 rounded-2xl py-2 px-5'>
						<div className='flex items-center gap-3'>
							<div className='text-center'>
								<div className='font-semibold'>
									{price.format(Number(avg_prices.min))}
								</div>
								<div className='text-gray-500'>
									{t('lot.averagePrices.minimum')}
								</div>
							</div>
							<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] mr-0.5' />
							<div className='text-center'>
								<div className='font-semibold'>
									{price.format(Number(avg_prices.avg))}
								</div>
								<div className='text-gray-500'>
									{t('lot.averagePrices.average')}
								</div>
							</div>
							<div className='w-[1px] h-9 bg-gray-400 my-2 rounded-full rotate-[20deg] mr-0.5' />
							<div className='text-center'>
								<div className='font-semibold'>
									{price.format(Number(avg_prices.max))}
								</div>
								<div className='text-gray-500'>
									{t('lot.averagePrices.maximum')}
								</div>
							</div>
						</div>
						<AvgPriceIndicator
							minPrice={Number(avg_prices.min)}
							avgPrice={Number(avg_prices.avg)}
							maxPrice={Number(avg_prices.max)}
							currentPrice={currentPrice}
						/>
					</div>
				</div>
			)}
		</>
	)
}

export default AveragePrices
