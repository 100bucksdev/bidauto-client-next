import CircleLoader from '@/shared/ui/CircleLoader'
import { priceFormat } from '@/shared/utils/priceFormat'
import { homeSearchBarSelectStyles } from '@/shared/utils/reactSelectStyles'
import { ITerminalsPrices } from '@/types/Terminals.interface'
import { useTranslations } from 'next-intl'

import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react'
import { LuCalculator } from 'react-icons/lu'
import Select from 'react-select'

interface ILotFinalPriceCalculator {
	error: string
	isLoading: boolean
	isError: boolean
	options:
		| {
				value: string
				label: string
		  }[]
		| undefined
	calculator?: any
	lotBid: number
	toEuro: number
	finalPrices:
		| Partial<ITerminalsPrices>
		| undefined
		| Partial<ITerminalsPrices>[]
	terminal: { value: string; label: string }
	setTerminal: Dispatch<SetStateAction<{ value: string; label: string }>>
	info?: any
	type?: 'yourBid' | 'fastBuy'
}

const LotFinalPriceCalculator = memo<ILotFinalPriceCalculator>(
	({
		error,
		isLoading,
		isError,
		options,
		calculator,
		lotBid,
		finalPrices,
		terminal,
		setTerminal,
		type,
		info,
	}) => {
		const t = useTranslations()
		const priceFormatter = priceFormat({ char: 'USD' })

		const [loadOptions, setLoadOptions] = useState(false)

		useEffect(() => {
			if (options && !loadOptions) {
				setTerminal(options[0])
				setLoadOptions(true)
			}
		}, [options, loadOptions])

		return (
			<>
				<div className='relative'>
					<div>
						<div className='flex items-center gap-x-3 max-md:gap-x-1 px-4 pt-4 pb-1 font-semibold'>
							<div className='text-xl max-md:text-xl'>
								<LuCalculator />
							</div>
							<div className='text-xl max-md:text-lg'>
								{t('lot.calc.finalPriceCalculator')}
							</div>
							<div className='ml-auto'>
								{type && (
									<div
										className={`rounded-full px-2 text-xs py-1 font-normal ${
											type === 'yourBid'
												? 'bg-t-blue-light text-white'
												: 'bg-gray-400 text-white'
										}`}
									>
										{type.charAt(0).toUpperCase() +
											type
												.slice(1)
												.split(/(?=[A-Z])/)
												.join(' ')}
									</div>
								)}
							</div>
						</div>
					</div>
					<div className='mb-3 max-md:text-base flex flex-col px-4'>
						<div className='flex justify-between items-center'>
							<div className='flex items-center gap-x-2 py-1'>
								<div className='py-2'>{t('lot.calc.terminal')}</div>
								{isLoading || isError ? (
									isLoading ? (
										<CircleLoader />
									) : (
										''
									)
								) : (
									<Select
										styles={homeSearchBarSelectStyles}
										isSearchable={false}
										options={options}
										onChange={e =>
											setTerminal({
												value: e?.value || 'newyork',
												label: e?.label || 'Newyork',
											})
										}
										value={terminal}
									/>
								)}
							</div>
						</div>
						<div className='flex justify-between py-2'>
							<div className='text-gray-500'>{t('lot.calc.lotPrice')}</div>
							<div>
								{(info && !isError && priceFormatter.format(lotBid)) || ''}
							</div>
						</div>
						<div className='flex justify-between py-2'>
							<div className='text-gray-500'>{t('lot.calc.auctionFees')}</div>
							<div>
								{isLoading ? (
									<CircleLoader />
								) : (
									info &&
									((calculator?.additional &&
										priceFormatter.format(calculator?.additional)) ||
										'')
								)}
							</div>
						</div>
						<div className='flex justify-between py-2'>
							<div className='text-gray-500'>
								{t('lot.calc.titleMailingFee')}
							</div>
							<div>
								{isLoading ? (
									<CircleLoader />
								) : (
									(calculator?.title_mailing_fee &&
										priceFormatter.format(calculator?.title_mailing_fee)) ||
									''
								)}
							</div>
						</div>
						<div className='flex justify-between py-2'>
							<div className='text-gray-500'>{t('lot.calc.brokerFee')}</div>
							<div>
								{isLoading ? (
									<CircleLoader />
								) : (
									(calculator?.broker_fee &&
										priceFormatter.format(calculator?.broker_fee)) ||
									''
								)}
							</div>
						</div>
						<div className='flex justify-between py-2'>
							<div className='text-gray-500'>{t('lot.calc.ship')}</div>
							<div>
								{isLoading ? (
									<CircleLoader />
								) : (
									(calculator?.ocean_ship[terminal.value] &&
										priceFormatter.format(
											calculator?.ocean_ship[terminal.value]
										)) ||
									''
								)}
							</div>
						</div>
						<div className='flex justify-between py-2 items-center'>
							<div className='flex items-center gap-x-2'>
								<div className='text-gray-500'>{t('lot.calc.transport')}</div>
							</div>
							<div>
								{isLoading ? (
									<CircleLoader />
								) : (
									(calculator?.transportation_price[terminal.value] &&
										priceFormatter.format(
											calculator?.transportation_price[terminal.value]
										)) ||
									''
								)}
							</div>
						</div>
						<div className='flex justify-between py-2 items-center'>
							<div className='flex items-center gap-x-2'>
								<div className='text-lg font-medium'>{t('lot.calc.total')}</div>
							</div>
							<div>
								{isLoading ? (
									<CircleLoader />
								) : finalPrices && info ? (
									priceFormatter.format((finalPrices as any)[terminal.value])
								) : (
									'No price available'
								)}
							</div>
						</div>
						{/* <div className='flex justify-between items-center'>
							<div className='font-semibold'>
							{isLoading ? (
									<CircleLoader />
								) : info && type === 'yourBid' ? (
									`${priceFormatter.format(
										currency.value === 'EUR'
											? info.data?.data.min_price_calculated.calculator.totals[
													terminal.value
												] * toEuro
											: info.data?.data.min_price_calculated.calculator.totals[
													terminal.value
												]
									)} - ${priceFormatter.format(
										currency.value === 'EUR'
											? info.data?.data.max_price_calculated.calculator.totals[
													terminal.value
												] * toEuro
											: info.data?.data.max_price_calculated.calculator.totals[
													terminal.value
												]
									)}`
								) : (
									(finalPrices &&
									info &&
									((finalPrices &&
										(finalPrices as any)[terminal.value] &&
										priceFormatter.format(
											currency.value === 'EUR'
												? (finalPrices as any)[terminal.value] * toEuro
												: (finalPrices as any)[terminal.value]
										)) ||
									'')
								))}
							</div>
						</div> */}
					</div>
					<hr />
				</div>
				{error ? (
					<div className='text-center text-t-text-error'>{error}</div>
				) : (
					<div className='p-2 text-sm text-slate-400'>
						*this price is actual total amount you pay to US bank
					</div>
				)}
			</>
		)
	}
)

export default LotFinalPriceCalculator
