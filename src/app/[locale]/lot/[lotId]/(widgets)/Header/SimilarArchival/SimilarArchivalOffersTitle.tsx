import { getTranslations } from 'next-intl/server'
import { MdExpandMore, MdOutlineContentCopy } from 'react-icons/md'

const SimilarArchivalOffersTitle = async ({
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
			className={`bg-gray-200 rounded-r-2xl mt-3 duration-150 items-center cursor-pointer justify-between flex text-lg select-none py-5 px-8 max-sm:mt-0 max-sm:rounded-t-none max-sm:rounded-b-2xl`}
		>
			<div className='flex items-center gap-x-3 max-sm:text-base'>
				<span>
					<MdOutlineContentCopy />
				</span>
				<span>{t('lot.similarSales.similarSales')}</span>
			</div>
			<div className={`text-2xl ${isOpen ? 'rotate-180' : ''} duration-150`}>
				<MdExpandMore />
			</div>
		</div>
	)
}

export default SimilarArchivalOffersTitle
