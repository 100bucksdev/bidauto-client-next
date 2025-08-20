import SwipeCheckbox from '@/shared/ui/SwipeCheckbox'
import { searchOptions } from '@/store/searchOptions.store'

import { useTranslations } from 'next-intl'

const HomeSearchBarAuctionType = () => {
	const {
		params: { auction, archived },
		setAuction,
		setArchived,
	} = searchOptions()

	const t = useTranslations()

	return (
		<div className='flex max-sm:flex-col gap-5 text-t-text-primary text-lg max-sm:mt-4 max-sm:mb-4'>
			<div className='flex items-center bg-t-blue-cyan px-6 max-lg:px-8 justify-center max-sm:py-2 max-sm:w-full py-1 rounded-full'>
				<SwipeCheckbox
					onChange={e => {
						if (e.currentTarget.checked) {
							return setArchived('true')
						}
						return setArchived('false')
					}}
					isChecked={archived === 'true'}
					title={t('home.searchbar.selects.archived')}
				/>
			</div>

			<div className='flex items-center bg-white max-lg:px-7 max-sm:w-full max-sm:py-2 justify-center text-black px-6 py-1 rounded-full'>
				<SwipeCheckbox
					onChange={e => {
						if (e.currentTarget.checked) {
							setAuction('COPART')
						}
					}}
					isChecked={auction === 'COPART'}
					title='Copart'
				/>
			</div>

			<div className='flex items-center bg-white max-lg:px-8 max-sm:w-full max-sm:py-2 justify-center text-black px-6 py-1 rounded-full'>
				<SwipeCheckbox
					onChange={e => {
						if (e.currentTarget.checked) {
							setAuction('IAAI')
						}
					}}
					isChecked={auction === 'IAAI'}
					title='IAAI'
				/>
			</div>
		</div>
	)
}

export default HomeSearchBarAuctionType
