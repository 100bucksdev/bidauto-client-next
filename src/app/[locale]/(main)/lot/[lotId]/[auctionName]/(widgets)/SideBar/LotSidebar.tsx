'use client'

import { useGetTotalLotPrice } from '@/shared/api/Lots/getTotalLotPrice/useGetTotalLotPrice'
import { toEuro } from '@/shared/utils/ExchageRates'
import { FeeItem } from '@/types/CalculatorLocation.interface'
import { TLot } from '@/types/Lot.interface'
import { useEffect, useState } from 'react'
import FinalPriceEstimator from './FinalPrice/FinalPriceEstimator'
import GetCarfaxReports from './GetCarfaxReports'
import LotCalculatorAdditionalServices from './LotCalculatorAdditionalServices'
import LotClearanceCalculator from './LotClearanceCalculator'
import LotFinalPriceCalculator from './LotFinalPriceCalculator'
import LotPlaceBidBox from './PlaceBid/LotPlaceBidBox'

interface LotSidebarProps {
	lot: TLot
	info: any
}

export default function LotSidebar({ lot, info }: LotSidebarProps) {
	const [type, setType] = useState<'yourBid' | 'fastBuy'>('yourBid')
	const price = lot?.current_bid ?? 0

	const [lotBid, setLotBid] = useState<number>(price + 25)
	const [error, setError] = useState('')
	const [terminal, setTerminal] = useState({ value: '', label: '' })
	const [estimator, setEstimator] = useState(true)

	// Сбрасываем ставку при смене лота
	useEffect(() => {
		if (lot) {
			setLotBid(price + 25)
		}
	}, [lot, price])

	// FastBuy обновляет ставку
	useEffect(() => {
		if (type === 'fastBuy') {
			setLotBid(lot.current_bid + 25)
		}
	}, [type, lot.current_bid])

	const auctionName = lot.site === 1 ? 'COPART' : 'IAAI'

	// Получаем цену
	const totalPrice = useGetTotalLotPrice({
		price: lotBid,
		auction_name: auctionName,
		vehicle_type: lot.vehicle_type,
		destination: terminal.value || 'losangeles',
		location: terminal.value || 'losangeles',
	})

	// Новый путь к данным
	const calculator = totalPrice.data?.calculator_in_dollars?.calculator

	const euCalculator = totalPrice.data?.calculator_in_dollars?.eu_calculator

	// Формирование списка терминалов
	const options =
		calculator?.totals?.map(item => ({
			value: item.name,
			label:
				item.name.toLowerCase() === 'losangeles'
					? 'Los Angeles'
					: item.name.toLowerCase() === 'newyork'
					? 'New York'
					: item.name.charAt(0).toUpperCase() + item.name.slice(1),
			price: item.price,
		})) ?? []

	// Локальные состояния финальных цен
	const [finalPrices, setFinalPrices] = useState<FeeItem[] | undefined>(
		calculator?.totals
	)

	const [euFinalPrices, setEuFinalPrices] = useState<FeeItem[] | undefined>(
		euCalculator?.totals
	)

	// Обновляем финальные цены при изменении данных с API
	useEffect(() => {
		if (calculator?.totals) setFinalPrices(calculator.totals)
		if (euCalculator?.totals) setEuFinalPrices(euCalculator.totals)
	}, [calculator?.totals, euCalculator?.totals])

	return (
		<div>
			<GetCarfaxReports auction={auctionName} lot_id={lot.lot_id.toString()} />

			<div className='mb-3'>
				<LotPlaceBidBox
					error={error}
					lot={lot}
					price={price}
					lotBid={lotBid}
					setLotBid={setLotBid}
					setType={setType}
					type={type}
				/>
			</div>

			<div className='bg-white border-2 border-gray-300 rounded-2xl'>
				<LotFinalPriceCalculator
					finalPrices={finalPrices}
					options={options}
					lotBid={lotBid}
					error={error}
					isError={totalPrice.isError}
					isLoading={totalPrice.isLoading}
					calculator={calculator}
					toEuro={toEuro}
					terminal={terminal}
					setTerminal={setTerminal}
					info={info}
					type={type}
				/>
			</div>

			<div className='bg-white my-3 rounded-2xl border-2 border-gray-300 p-4'>
				<LotCalculatorAdditionalServices
					setEuFinalPrices={setEuFinalPrices}
					setFinalPrices={setFinalPrices}
				/>
			</div>

			{estimator && (
				<FinalPriceEstimator
					info={info}
					type={type}
					setType={setType}
					terminal={terminal}
					lotBid={lotBid}
					finalPrices={finalPrices}
					euFinalPrices={euFinalPrices}
					// fastBuy={lot.BuyNowPrice > 0}
				/>
			)}

			<div className='mt-5 bg-white border-2 border-gray-300 rounded-2xl'>
				<LotClearanceCalculator
					finalPrices={euFinalPrices}
					isLoading={totalPrice.isLoading}
					calculator={euCalculator}
					terminal={terminal}
					type={type}
				/>
			</div>
		</div>
	)
}
