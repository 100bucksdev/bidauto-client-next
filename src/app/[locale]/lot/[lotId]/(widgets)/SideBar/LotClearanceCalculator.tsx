import CircleLoader from '@/shared/ui/CircleLoader'
import { priceFormat } from '@/shared/utils/priceFormat'
import { ITerminalsPrices } from '@/types/Terminals.interface'
import { useTranslations } from 'next-intl'
import { memo } from 'react'
import { LuCalculator } from 'react-icons/lu'

interface ILotClearanceCalculator {
	error: string
	isLoading: boolean
	isError: boolean
	options:
		| {
				value: string
				label: string
		  }[]
		| undefined
	calculator: any | undefined
	lotBid: number
	toEuro: number
	finalPrices: Partial<ITerminalsPrices> | undefined
	terminal: { value: string; label: string }
	type?: 'estimated' | 'yourBid' | 'fastBuy'
	info?: any
}

const LotClearanceCalculator = memo<ILotClearanceCalculator>(
	({ isLoading, calculator, finalPrices, terminal, type, info }) => {
		const t = useTranslations()
		const priceFormatter = priceFormat({ char: 'USD' })

		return (
			<>
				<div className='relative'>
					<div>
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
					</div>
					<div className='mb-3 max-md:text-base flex flex-col px-4'>
						{
							<>
								<div className='flex justify-between py-2'>
									<div className='text-gray-500'>{t('lot.calc.vat')}</div>
									<div>
										{isLoading ? (
											<CircleLoader />
										) : (
											info &&
											((calculator?.vats?.vats[terminal.value] &&
												priceFormatter.format(
													calculator?.vats?.vats[terminal.value]
												)) ||
												'')
										)}
									</div>
								</div>
							</>
						}
						{
							<>
								<div className='flex justify-between py-2'>
									<div className='text-gray-500'>{t('lot.calc.importTax')}</div>
									<div>
										{isLoading ? (
											<CircleLoader />
										) : (
											info &&
											((calculator?.vats?.eu_vats[terminal.value] &&
												priceFormatter.format(
													calculator?.vats?.eu_vats[terminal.value]
												)) ||
												'')
										)}
									</div>
								</div>
							</>
						}
						{
							<>
								<div className='flex justify-between py-2'>
									<div className='text-gray-500'>
										{t('lot.calc.customAgency')}
									</div>
									<div>
										{isLoading ? (
											<CircleLoader />
										) : (
											(calculator?.custom_agency &&
												priceFormatter.format(calculator?.custom_agency)) ||
											''
										)}
									</div>
								</div>
							</>
						}
						<div className='flex justify-between py-1 items-center'>
							<div className='flex items-center gap-x-2'>
								<div className='font-medium text-lg'>{t('lot.calc.total')}</div>
							</div>
							<div className='font-semibold'>
								{isLoading ? (
									<CircleLoader />
								) : (
									info &&
									((finalPrices &&
										(finalPrices as any)[terminal.value] &&
										priceFormatter.format(
											(finalPrices as any)[terminal.value]
										)) ||
										'')
								)}
							</div>
						</div>
					</div>
					{/* <hr className='pt-1' /> */}
				</div>
				{/* {error ? (
					<div className='text-center text-t-text-error'>{error}</div>
				) : (
					<div className='px-4 py-1 text-sm text-slate-400'>
						{t('lot.calc.euroRate')}: <EuroRate />
					</div>
				)} */}
			</>
		)
	}
)

export default LotClearanceCalculator
