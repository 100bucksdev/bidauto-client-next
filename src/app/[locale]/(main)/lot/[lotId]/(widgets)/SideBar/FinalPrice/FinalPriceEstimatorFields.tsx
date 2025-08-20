import { useTranslations } from 'next-intl'

const FinalPriceEstimatorFields = ({
	estimatedPrice,
	purchaseAmount,
	customValue,
}: {
	estimatedPrice: string
	purchaseAmount: string
	customValue: string
}) => {
	const t = useTranslations()

	return (
		<div className='bg-gray-200 rounded-b-2xl mt-2'>
			<div className='px-2 py-2 text-center'>
				<div className='text-xl font-bold'>{estimatedPrice}</div>
				<div className='text-sm text-gray-500'>
					{t('lot.calc.estimatedPrice')}
				</div>
			</div>
			<div className='px-2 py-2 text-center'>
				<div className='text-xl font-semibold'>{purchaseAmount}</div>
				<div className='text-sm text-gray-500'>
					{t('lot.calc.purchaseAmount')}
				</div>
			</div>
			<div className='px-2 py-2 text-center'>
				<div className='text-xl font-semibold'>{customValue}</div>
				<div className='text-xs text-gray-500'>{t('lot.calc.customValue')}</div>
			</div>
		</div>
	)
}

export default FinalPriceEstimatorFields
