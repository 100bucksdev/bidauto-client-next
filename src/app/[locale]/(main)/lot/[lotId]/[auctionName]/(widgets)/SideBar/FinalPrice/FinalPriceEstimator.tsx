import { ITerminalsPrices } from '@/types/Terminals.interface'

import CircleLoader from '@/shared/ui/CircleLoader'
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
	finalPrices: Partial<ITerminalsPrices> | undefined
	euFinalPrices: Partial<ITerminalsPrices> | undefined
	fastBuy: boolean
}) => {
	const t = useTranslations()

	console.log(info)

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
						{/* {fastBuy && (
              <button
                onClick={() => {
                  console.log("Switching to fastBuy");
                  setType("fastBuy");
                }}
                className={`border border-gray-400 rounded-full text-gray-500 py-1 px-2 ${
                  type === "fastBuy" ? "bg-gray-400 text-white" : ""
                } duration-200`}
              >
                {t("lot.buyNow")}
              </button>
            )} */}
					</div>
				</div>
			</div>

			{info.isLoading ? (
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
					{type === 'yourBid' ? (
						<FinalPriceEstimatorFields
							estimatedPrice={`$${
								euFinalPrices?.[terminal.value as keyof ITerminalsPrices]
									? Math.round(
											Number(
												euFinalPrices[terminal.value as keyof ITerminalsPrices]
											)
									  )
									: ''
							}`}
							purchaseAmount={`$${lotBid}`}
							customValue={`$${
								finalPrices?.[terminal.value as keyof ITerminalsPrices] || ''
							}`}
						/>
					) : (
						''
					)}
					{type === 'fastBuy' ? (
						<FinalPriceEstimatorFields
							estimatedPrice={`$${Math.round(
								Number(terminal.value as keyof ITerminalsPrices)
							)}`}
							purchaseAmount={`$${lotBid}`}
							customValue={`$${
								finalPrices?.[terminal.value as keyof ITerminalsPrices] || ''
							}`}
						/>
					) : (
						''
					)}
				</>
			)}
		</div>
	)
}

export default FinalPriceEstimator
