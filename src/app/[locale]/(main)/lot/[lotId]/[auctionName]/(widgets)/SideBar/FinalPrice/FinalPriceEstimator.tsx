import CircleLoader from '@/shared/ui/CircleLoader'
import { FeeItem } from '@/types/CalculatorLocation.interface'
import { useTranslations } from 'next-intl'
import { MdOutlineDiscount } from 'react-icons/md'
import FinalPriceEstimatorFields from './FinalPriceEstimatorFields'

const FinalPriceEstimator = ({
	info,
	type,
	setType,
	terminal,
	lotBid,
	euFinalPrices,
	finalPrices,
}: {
	info: any
	type: 'yourBid' | 'fastBuy'
	setType: (data: 'yourBid' | 'fastBuy') => void
	terminal: { value: string; label: string }
	lotBid: number
	finalPrices: FeeItem[] | undefined
	euFinalPrices: FeeItem[] | undefined
	fastBuy?: boolean
}) => {
	const t = useTranslations()

	// Утилита: найти цену по терминалу
	const getPriceByTerminal = (
		arr: FeeItem[] | undefined,
		terminalName: string
	) => {
		if (!arr) return ''
		const item = arr.find(
			i =>
				i.name.toLowerCase().replace(/\s+/g, '') === terminalName.toLowerCase()
		)
		return item ? Math.round(item.price) : ''
	}

	return (
		<div className='bg-white rounded-2xl border-2 border-gray-300 mb-5'>
			<div>
				<div className='flex items-center p-4 gap-x-3 max-md:gap-x-1 pb-4  font-semibold'>
					<div className='text-xl max-md:text-xl'>
						<MdOutlineDiscount />
					</div>
					<div className='text-xl max-md:text-lg'>
						{t('lot.calc.finalPriceEstimator')}
					</div>
					<div className='flex justify-center gap-x-1 text-xs ml-auto'>
						<button
							onClick={() => setType('yourBid')}
							className={`border border-t-blue-light rounded-full text-t-blue-light py-1 px-2 font-normal ${
								type === 'yourBid' ? 'bg-t-blue-light text-white' : ''
							} duration-200`}
						>
							{t('lot.userBid.yourBid')}
						</button>
					</div>
				</div>
			</div>

			{info?.isLoading ? (
				<div className='flex justify-center items-center h-20'>
					<CircleLoader />
				</div>
			) : !info ? (
				<div className='flex justify-center items-center h-20'>
					<div className='text-red-500'>
						Something went wrong, please try again later
					</div>
				</div>
			) : (
				<>
					{type === 'yourBid' && (
						<FinalPriceEstimatorFields
							estimatedPrice={`$${getPriceByTerminal(
								euFinalPrices,
								terminal.value
							)}`}
							purchaseAmount={`$${lotBid}`}
							customValue={`$${getPriceByTerminal(
								finalPrices,
								terminal.value
							)}`}
						/>
					)}

					{type === 'fastBuy' && (
						<FinalPriceEstimatorFields
							estimatedPrice={`$${getPriceByTerminal(
								euFinalPrices,
								terminal.value
							)}`}
							purchaseAmount={`$${lotBid}`}
							customValue={`$${getPriceByTerminal(
								finalPrices,
								terminal.value
							)}`}
						/>
					)}
				</>
			)}
		</div>
	)
}

export default FinalPriceEstimator
