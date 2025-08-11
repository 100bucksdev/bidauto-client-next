import { IcDollarCircle } from '@/shared/icons'
import SwipeCheckbox from '@/shared/ui/SwipeCheckbox'
import { ITerminalsPrices } from '@/types/Terminals.interface'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'

const LotCalculatorAdditionalServices = ({
	setFinalPrices,
	setEuFinalPrices,
}: {
	setFinalPrices: Dispatch<
		SetStateAction<Partial<ITerminalsPrices> | undefined>
	>
	setEuFinalPrices: Dispatch<
		SetStateAction<Partial<ITerminalsPrices> | undefined>
	>
}) => {
	const t = useTranslations()
	const swiperCheckboxStyles = {
		switchCl: '!w-[44px] !h-[24px]',
		sliderCl: '!left-[2px] !bottom-[2px] before:!w-[14px] before:!h-[14px]',
	}

	const cargoPrice = 200
	const oversizedPrice = 200

	return (
		<div>
			<div>
				<div className='flex items-center gap-x-3 max-md:gap-x-1 pb-3 font-semibold'>
					<div className='text-3xl max-md:text-2xl'>
						<IcDollarCircle />
					</div>
					<div className='text-xl max-md:text-xl'>
						{t('lot.additionalServices.title')}
					</div>
				</div>
			</div>
			<div className='mb-3 max-md:text-base flex flex-col px-4 text-sm'>
				<div className='flex justify-between items-center'>
					<div className='p-3 border-2 rounded-2xl border-gray-300 flex items-center gap-2 w-full'>
						<SwipeCheckbox
							titleCl='select-none'
							onChange={e => {
								if (e.target.checked) {
									setFinalPrices(prev => {
										if (!prev) return

										const newObj = { ...prev }

										for (let key in newObj) {
											;(newObj as any)[key] += cargoPrice
										}

										return newObj
									})
									setEuFinalPrices(prev => {
										if (!prev) return

										const newObj = { ...prev }

										for (let key in newObj) {
											;(newObj as any)[key] += cargoPrice
										}

										return newObj
									})
								} else {
									setFinalPrices(prev => {
										if (!prev) return

										const newObj = { ...prev }

										for (let key in newObj) {
											;(newObj as any)[key] -= cargoPrice
										}

										return newObj
									})
									setEuFinalPrices(prev => {
										if (!prev) return

										const newObj = { ...prev }

										for (let key in newObj) {
											;(newObj as any)[key] -= cargoPrice
										}

										return newObj
									})
								}
							}}
							{...swiperCheckboxStyles}
							title=''
						/>
						<div className='flex items-center gap-1'>
							<p className=' text-lg font-semibold'>200$</p>
							<div className='w-0.5 h-5 bg-gray-400' />
							<p className='text-gray-500'>
								{t('lot.additionalServices.text1')}
							</p>
						</div>
					</div>
				</div>

				<div className='flex justify-between items-center mt-4'>
					<div className='p-3 border-2 rounded-2xl border-gray-300 flex items-center gap-2 w-full'>
						<SwipeCheckbox
							titleCl='select-none'
							onChange={e => {
								if (e.target.checked) {
									setFinalPrices(prev => {
										if (!prev) return

										const newObj = { ...prev }

										for (let key in newObj) {
											;(newObj as any)[key] += oversizedPrice
										}

										return newObj
									})
									setEuFinalPrices(prev => {
										if (!prev) return

										const newObj = { ...prev }

										for (let key in newObj) {
											;(newObj as any)[key] += oversizedPrice
										}

										return newObj
									})
								} else {
									setFinalPrices(prev => {
										if (!prev) return

										const newObj = { ...prev }

										for (let key in newObj) {
											;(newObj as any)[key] -= oversizedPrice
										}

										return newObj
									})
									setEuFinalPrices(prev => {
										if (!prev) return

										const newObj = { ...prev }

										for (let key in newObj) {
											;(newObj as any)[key] -= oversizedPrice
										}

										return newObj
									})
								}
							}}
							{...swiperCheckboxStyles}
							title=''
						/>
						<div className='flex items-center gap-1'>
							<p className=' text-lg font-semibold'>200$</p>
							<div className='w-0.5 h-5 bg-gray-400' />
							<p className='text-gray-500'>
								{t('lot.additionalServices.text2')}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LotCalculatorAdditionalServices
