import { IcDollarCircle } from '@/shared/icons'
import SwipeCheckbox from '@/shared/ui/SwipeCheckbox'
import { FeeItem } from '@/types/CalculatorLocation.interface'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'

const LotCalculatorAdditionalServices = ({
	setFinalPrices,
	setEuFinalPrices,
}: {
	setFinalPrices: Dispatch<SetStateAction<FeeItem[] | undefined>>
	setEuFinalPrices: Dispatch<SetStateAction<FeeItem[] | undefined>>
}) => {
	const t = useTranslations()

	const swiperCheckboxStyles = {
		switchCl: '!w-[44px] !h-[24px]',
		sliderCl: '!left-[2px] !bottom-[2px] before:!w-[14px] before:!h-[14px]',
	}

	const cargoPrice = 200
	const oversizedPrice = 200

	// Утилита: прибавить/отнять сумму ко всем price
	const updateAllPrices = (
		prev: FeeItem[] | undefined,
		amount: number
	): FeeItem[] | undefined => {
		if (!prev) return prev
		return prev.map(item => ({
			...item,
			price: item.price + amount,
		}))
	}

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
				{/* CARGO */}
				<div className='flex justify-between items-center'>
					<div className='p-3 border-2 rounded-2xl border-gray-300 flex items-center gap-2 w-full'>
						<SwipeCheckbox
							titleCl='select-none'
							onChange={e => {
								const add = e.target.checked ? cargoPrice : -cargoPrice
								setFinalPrices(prev => updateAllPrices(prev, add))
								setEuFinalPrices(prev => updateAllPrices(prev, add))
							}}
							{...swiperCheckboxStyles}
							title=''
						/>
						<div className='flex items-center gap-1'>
							<p className='text-lg font-semibold'>200$</p>
							<div className='w-0.5 h-5 bg-gray-400' />
							<p className='text-gray-500'>
								{t('lot.additionalServices.text1')}
							</p>
						</div>
					</div>
				</div>

				{/* OVERSIZED */}
				<div className='flex justify-between items-center mt-4'>
					<div className='p-3 border-2 rounded-2xl border-gray-300 flex items-center gap-2 w-full'>
						<SwipeCheckbox
							titleCl='select-none'
							onChange={e => {
								const add = e.target.checked ? oversizedPrice : -oversizedPrice
								setFinalPrices(prev => updateAllPrices(prev, add))
								setEuFinalPrices(prev => updateAllPrices(prev, add))
							}}
							{...swiperCheckboxStyles}
							title=''
						/>
						<div className='flex items-center gap-1'>
							<p className='text-lg font-semibold'>200$</p>
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
