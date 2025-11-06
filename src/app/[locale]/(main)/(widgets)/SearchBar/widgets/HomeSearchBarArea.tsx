import { useGetLot } from '@/shared/api/Lots/getLot/useGetLot'
import { useState } from 'react'
import HomeSearchBarButton from './HomeSearchBarButton'
import HomeSearchBarByVinOrLotNumber from './HomeSearchBarByVinOrLotNumber'
import HomeSearchbarSelects from './HomeSearchBarSelects'

const HomeSearchBarArea = () => {
	const [search, setSearch] = useState('')

	const lotsByVinOrId = useGetLot({
		settings: {
			options: {
				enabled: !!search,
			},
		},
		params: { vinOrId: search },
	})

	return (
		<section className='w-full px-2 py-2 rounded-2xl h-auto bg-white'>
			<div className='bg-gray-200 rounded-2xl flex 2xl:flex-row max-sm:flex-col max-lg:flex-col lg:flex-col items-center'>
				<HomeSearchbarSelects />
				<HomeSearchBarByVinOrLotNumber search={search} setSearch={setSearch} />
				<HomeSearchBarButton search={search} lotsByVinOrId={lotsByVinOrId} />
			</div>
		</section>
	)
}

export default HomeSearchBarArea
