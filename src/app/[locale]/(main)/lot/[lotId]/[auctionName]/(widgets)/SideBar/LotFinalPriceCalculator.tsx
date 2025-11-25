import CircleLoader from '@/shared/ui/CircleLoader'
import { priceFormat } from '@/shared/utils/priceFormat'
import { homeSearchBarSelectStyles } from '@/shared/utils/reactSelectStyles'
import { CalculatorBase, FeeItem } from '@/types/CalculatorLocation.interface'
import { useTranslations } from 'next-intl'

import { Dispatch, memo, SetStateAction, useEffect, useMemo } from 'react'
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
	calculator?: CalculatorBase
	lotBid: number
	toEuro: number
	finalPrices: Partial<FeeItem>[] | Partial<FeeItem> | undefined
	terminal: { value: string; label: string }
	setTerminal: Dispatch<SetStateAction<{ value: string; label: string }>>
	info?: any
	type?: 'yourBid' | 'fastBuy'
}

// Нормализация ключей терминалов
const normalize = (name: string) => name.toLowerCase().replace(/\s+/g, '')

// Преобразуем FeeItem[] в объект { key: price }
const feeArrayToObject = (arr: FeeItem[] = []) =>
	arr.reduce<Record<string, number>>((acc, item) => {
		acc[normalize(item.name)] = item.price
		return acc
	}, {})

const LotFinalPriceCalculator = memo<ILotFinalPriceCalculator>(
	({
		error,
		isLoading,
		isError,
		options,
		calculator,
		lotBid,
		terminal,
		setTerminal,
		type,
		info,
	}) => {
		const t = useTranslations()
		const priceFormatter = priceFormat({ char: 'USD' })

		// Преобразуем массивы в словари
		const transport = useMemo(
			() =>
				calculator ? feeArrayToObject(calculator.transportation_price) : {},
			[calculator]
		)

		const ship = useMemo(
			() => (calculator ? feeArrayToObject(calculator.ocean_ship) : {}),
			[calculator]
		)

		const totals = useMemo(
			() => (calculator ? feeArrayToObject(calculator.totals) : {}),
			[calculator]
		)

		// При первой загрузке выставляем первый терминал
		useEffect(() => {
			if (options?.length && !terminal.value) {
				setTerminal(options[0])
			}
		}, [options])

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

					{/* TERMINAL SELECT */}
					<div className='mb-3 max-md:text-base flex flex-col px-4'>
						<div className='flex justify-between items-center'>
							<div className='flex items-center gap-x-2 py-1'>
								<div className='py-2'>{t('lot.calc.terminal')}</div>

								{isLoading || isError ? (
									isLoading ? (
										<CircleLoader />
									) : null
								) : (
									<Select
										styles={homeSearchBarSelectStyles}
										isSearchable={false}
										options={options}
										onChange={e =>
											setTerminal({
												value: e?.value || '',
												label: e?.label || '',
											})
										}
										value={terminal}
									/>
								)}
							</div>
						</div>

						{/* LOT PRICE */}
						<div className='flex justify-between py-2'>
							<div className='text-gray-500'>{t('lot.calc.lotPrice')}</div>
							<div>{info && !isError && priceFormatter.format(lotBid)}</div>
						</div>

						{/* AUCTION FEES */}
						<div className='flex justify-between py-2'>
							<div className='text-gray-500'>{t('lot.calc.auctionFees')}</div>
							<div>
								{isLoading ? (
									<CircleLoader />
								) : (
									priceFormatter.format(calculator?.auction_fee || 0)
								)}
							</div>
						</div>

						{/* BROKER FEE */}
						<div className='flex justify-between py-2'>
							<div className='text-gray-500'>{t('lot.calc.brokerFee')}</div>
							<div>
								{isLoading ? (
									<CircleLoader />
								) : (
									priceFormatter.format(calculator?.broker_fee || 0)
								)}
							</div>
						</div>

						{/* OCEAN SHIP */}
						<div className='flex justify-between py-2'>
							<div className='text-gray-500'>{t('lot.calc.ship')}</div>
							<div>
								{isLoading ? (
									<CircleLoader />
								) : (
									priceFormatter.format(ship[terminal.value] || 0)
								)}
							</div>
						</div>

						{/* TRANSPORTATION */}
						<div className='flex justify-between py-2'>
							<div className='text-gray-500'>{t('lot.calc.transport')}</div>
							<div>
								{isLoading ? (
									<CircleLoader />
								) : (
									priceFormatter.format(transport[terminal.value] || 0)
								)}
							</div>
						</div>

						{/* TOTAL */}
						<div className='flex justify-between py-2'>
							<div className='text-lg font-medium'>{t('lot.calc.total')}</div>
							<div>
								{isLoading ? (
									<CircleLoader />
								) : (
									priceFormatter.format(totals[terminal.value] || 0)
								)}
							</div>
						</div>
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

LotFinalPriceCalculator.displayName = 'LotFinalPriceCalculator'

export default LotFinalPriceCalculator
