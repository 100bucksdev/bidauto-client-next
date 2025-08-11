import { getTranslations } from 'next-intl/server'
import { IoStatsChartSharp } from 'react-icons/io5'
import { MdExpandMore } from 'react-icons/md'

const SalesHistoryTitle = async ({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
}) => {
	const t = await getTranslations()

	return (
		<div
			onClick={() => setIsOpen(!isOpen)}
			className={`bg-gray-200 rounded-l-2xl mt-3 duration-150 items-center cursor-pointer justify-between flex text-lg select-none py-5 px-8 max-sm:rounded-t-2xl max-sm:rounded-bl-none`}
		>
			<div className='flex items-center gap-x-3  max-sm:text-base'>
				<span>
					<IoStatsChartSharp />
				</span>
				<span>{t('lot.salesHistory.salesHistory')}</span>
			</div>
			<div className={`text-2xl ${isOpen ? 'rotate-180' : ''} duration-150`}>
				<MdExpandMore />
			</div>
		</div>
	)
}

export default SalesHistoryTitle
