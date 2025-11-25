'use client'

import { getStringParams } from '@/store/searchOptions.store'

import { UseQueryResult } from '@tanstack/react-query'

import CircleLoader from '@/shared/ui/CircleLoader'
import { TLot } from '@/types/Lot.interface'
import { FetchesResponse } from '@astralis-team/primitive-fetch'
import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'
import st from '../home-search-bar-main.module.css'

const HomeSearchBarButton = ({
	search,
	lotsByVinOrId,
}: {
	search: string
	lotsByVinOrId: UseQueryResult<FetchesResponse<TLot | TLot[]>>
}) => {
	const queryParamsString = new URLSearchParams(getStringParams()).toString()
	const path = useRouter()

	const t = useTranslations()

	return (
		<button
			onClick={() =>
				path.push(
					`${
						search.length &&
						(Array.isArray(lotsByVinOrId.data?.data)
							? lotsByVinOrId.data?.data.length || 1
							: 1) === 1
							? `/lot/${search}/${
									lotsByVinOrId.data &&
									(Array.isArray(lotsByVinOrId.data?.data)
										? lotsByVinOrId.data.data[0].site === 1
											? 'copart'
											: lotsByVinOrId.data.data[0].site === 2
											? 'iaai'
											: 'copart'
										: lotsByVinOrId.data.data.site === 1
										? 'copart'
										: lotsByVinOrId.data.data.site === 2
										? 'iaai'
										: 'copart')
							  }`
							: `/search${
									queryParamsString
										? `?${queryParamsString}${search ? `&vin=${search}` : ''}`
										: ''
							  }`
					}`
				)
			}
			className={[
				`text-t-text-primary relative bg-t-blue-light hover:bg-t-blue-light/90 transition-all duration-100 py-3 px-8 2xl:rounded-r-2xl 2xl:rounded-l-none shadow-lg overflow-hidden max-sm:rounded-b-2xl max-sm:rounded-t-none max-lg:rounded-b-2xl max-lg:rounded-t-none lg:rounded-b-2xl lg:rounded-t-none 2xl:ml-10 max-sm:w-full max-lg:w-full lg:w-full max-sm:h-14 h-full flex justify-center items-center`,
			].join(' ')}
			disabled={
				lotsByVinOrId.isLoading || (!lotsByVinOrId.data?.data && !!search)
			}
		>
			{lotsByVinOrId.isLoading ? (
				<CircleLoader circleClassName='!stroke-white' />
			) : (
				<>
					{!lotsByVinOrId.data?.data && !!search ? (
						<span>Not Found</span>
					) : (
						<span className={st.span}>{t('home.searchbar.search')}</span>
					)}
				</>
			)}
		</button>
	)
}

export default HomeSearchBarButton
