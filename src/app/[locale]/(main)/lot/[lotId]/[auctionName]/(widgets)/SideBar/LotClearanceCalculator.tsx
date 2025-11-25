import CircleLoader from '@/shared/ui/CircleLoader'
import { priceFormat } from '@/shared/utils/priceFormat'
import { EuCalculator, FeeItem } from '@/types/CalculatorLocation.interface'
import { useTranslations } from 'next-intl'
import { memo } from 'react'
import { LuCalculator } from 'react-icons/lu'

interface ILotClearanceCalculator {
	isLoading: boolean
	calculator: EuCalculator | undefined
	finalPrices: FeeItem[] | undefined
	terminal: { value: string; label: string }
	type?: 'estimated' | 'yourBid' | 'fastBuy'
}

const LotClearanceCalculator = memo<ILotClearanceCalculator>(
	({ isLoading, calculator, finalPrices, terminal, type }) => {
		const t = useTranslations()
		const priceFormatter = priceFormat({ char: 'USD' })

		// Функция для поиска цены по терминалу
		const getPriceByTerminal = (
			arr: FeeItem[] | undefined,
			terminalName: string
		): number | undefined => {
			if (!arr) return undefined
			const item = arr.find(
				i =>
					i.name.toLowerCase().replace(/\s+/g, '') ===
					terminalName.toLowerCase()
			)
			return item ? Math.round(item.price) : undefined
		}

		const formatPrice = (price: number | undefined) =>
			price !== undefined ? priceFormatter.format(price) : ''

		return (
			<div className='relative'>
				<div className='flex items-center gap-x-3 max-md:gap-x-1 p-4 font-semibold'>
					<div className='text-xl max-md:text-xl'>
						<LuCalculator />
					</div>
					<div className='text-lg max-md:text-lg w-64'>
						{t('lot.calc.preliminaryCustomsClearanceCalculator')}
					</div>
					<div className='ml-auto'>
						{type && (
							<div
								className={`rounded-full px-2 text-xs font-normal py-1 ${
									type === 'yourBid'
										? 'bg-t-blue-light text-white'
										: 'bg-gray-400 text-white'
								}`}
							>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</div>
						)}
					</div>
				</div>

				<div className='mb-3 max-md:text-base flex flex-col px-4'>
					{/* VAT */}
					<div className='flex justify-between py-2'>
						<div className='text-gray-500'>{t('lot.calc.vat')}</div>
						<div>
							{isLoading ? (
								<CircleLoader />
							) : (
								formatPrice(
									getPriceByTerminal(calculator?.vats.vats, terminal.value)
								)
							)}
						</div>
					</div>

					{/* Import Tax */}
					<div className='flex justify-between py-2'>
						<div className='text-gray-500'>{t('lot.calc.importTax')}</div>
						<div>
							{isLoading ? (
								<CircleLoader />
							) : (
								formatPrice(
									getPriceByTerminal(calculator?.vats.eu_vats, terminal.value)
								)
							)}
						</div>
					</div>

					{/* Custom Agency */}
					<div className='flex justify-between py-2'>
						<div className='text-gray-500'>{t('lot.calc.customAgency')}</div>
						<div>
							{isLoading ? (
								<CircleLoader />
							) : (
								formatPrice(calculator?.custom_agency)
							)}
						</div>
					</div>

					{/* Total */}
					<div className='flex justify-between py-1 items-center'>
						<div className='flex items-center gap-x-2'>
							<div className='font-medium text-lg'>{t('lot.calc.total')}</div>
						</div>
						<div className='font-semibold'>
							{isLoading ? (
								<CircleLoader />
							) : (
								formatPrice(getPriceByTerminal(finalPrices, terminal.value))
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
)

LotClearanceCalculator.displayName = 'LotClearanceCalculator'

export default LotClearanceCalculator
