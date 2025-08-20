'use client'

import { useGetTotalLotPrice } from '@/shared/api/Lots/getTotalLotPrice/useGetTotalLotPrice'
import { toEuro } from '@/shared/utils/ExchageRates'
import { TLot } from '@/types/Lot.interface'
import { ITerminalsPrices } from '@/types/Terminals.interface'
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
	const price = lot?.CurrentBid ?? 0

	const [lotBid, setLotBid] = useState<number>(price + 25)
	const [error, setError] = useState('')
	const [terminal, setTerminal] = useState({ value: '', label: '' })
	const [estimator, setEstimator] = useState(true)

	// При изменении лота — сбрасываем ставку
	useEffect(() => {
		if (lot) {
			setLotBid(price + 25)
		}
	}, [lot, price])

	// Если выбран FastBuy — обновляем ставку
	useEffect(() => {
		if (type === 'fastBuy') {
			setLotBid(lot.BuyNowPrice || lot.CurrentBid + 25)
		}
	}, [type, lot.BuyNowPrice, lot.CurrentBid])

	// Получаем цены
	const totalPrice = useGetTotalLotPrice({
		price: type === 'fastBuy' ? lot.BuyNowPrice : lotBid,
		lot_id: lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID,
		auction_name: lot.Auction,
	})

	const keys = totalPrice.data?.calculator.totals
		? Object.keys(totalPrice.data.calculator.totals)
		: undefined

	const options = keys?.length
		? keys.map(key => ({
				value: key,
				label: key.charAt(0).toUpperCase() + key.slice(1),
		  }))
		: undefined

	const calculator = totalPrice.data?.calculator
	const [finalPrices, setFinalPrices] = useState<
		Partial<ITerminalsPrices> | undefined
	>(calculator?.totals)

	const euCalculator = totalPrice.data?.eu_calculator
	const [euFinalPrices, setEuFinalPrices] = useState<
		Partial<ITerminalsPrices> | undefined
	>(euCalculator?.totals)

	// При изменении данных с сервера — обновляем цены
	useEffect(() => {
		if (calculator?.totals) setFinalPrices(calculator.totals)
		if (euCalculator?.totals) setEuFinalPrices(euCalculator.totals)
	}, [calculator?.totals, euCalculator?.totals])

	return (
		<div>
			<GetCarfaxReports
				auction={lot.Auction}
				lot_id={lot.Auction === 'IAAI' ? lot.Stock : lot.U_ID}
			/>

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
					toEuro={totalPrice.data?.eur_rate || toEuro}
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
					fastBuy={lot.BuyNowPrice > 0}
				/>
			)}

			<div className='mt-5 bg-white border-2 border-gray-300 rounded-2xl'>
				<LotClearanceCalculator
					finalPrices={euFinalPrices}
					options={options}
					lotBid={lotBid}
					error={error}
					isError={totalPrice.isError}
					isLoading={totalPrice.isLoading}
					calculator={euCalculator}
					toEuro={totalPrice.data?.eur_rate || toEuro}
					terminal={terminal}
					type={type}
					info={info}
				/>
			</div>
		</div>
	)
}
