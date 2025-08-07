'use client'

import { IcSearchSquare } from '@/shared/icons'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'

const HomeSearchBarByVinOrLotNumber = ({
	search,
	setSearch,
}: {
	search: string
	setSearch: Dispatch<SetStateAction<string>>
}) => {
	const t = useTranslations()

	return (
		<>
			<div className='grid grid-cols-1 relative items-center max-sm:w-full max-lg:w-full lg:w-full'>
				<div className='absolute left-12 3xl:-left-6 2xl:-left-4 text-2xl max-sm:left-4 max-lg:left-4 lg:left-4'>
					<IcSearchSquare />
				</div>
				<input
					type='text'
					value={search}
					onChange={e => setSearch(e.target.value)}
					className='pl-10 px-2 mx-12 3xl:pl-2 3xl:px-0 3xl:-mr-11 2xl:mx-0 2xl:pl-3 2xl:-mr-10 py-2 outline-none bg-t-home-search-select-bg rounded-md text-base font-light max-sm:w-full max-sm:pl-12 max-sm:mx-0 max-sm:px-0 max-lg:w-full max-lg:pl-12 max-lg:mx-0 max-lg:px-0 lg:mx-2'
					placeholder={t('home.searchbar.selects.inputPlaceholder')}
				/>
			</div>
		</>
	)
}

export default HomeSearchBarByVinOrLotNumber
