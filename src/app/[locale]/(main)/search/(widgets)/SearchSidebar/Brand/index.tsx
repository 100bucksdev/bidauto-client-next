'use client'

import {
	getStringParams,
	searchOptions,
	TCopartVehicles,
} from '@/store/searchOptions.store'
import { ISearchLotParams } from '@/types/SearchLotParams.interface'
import { useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'

const Brand = ({
	label,
	value,
	type,
}: {
	label: string
	value: string
	type: TCopartVehicles
}) => {
	const path = useRouter()
	const location = useSearchParams()
	const queryParams: ISearchLotParams = queryString.parse(location.toString())
	const { setMake } = searchOptions()

	const isMakeMatch = value.toLowerCase() === queryParams.make?.toLowerCase()

	const stringParams = getStringParams()

	return (
		<div
			onClick={() => {
				const newFilteredParams = {
					...stringParams,
					make: value,
					type: type,
				}

				const newQueryParamsString = new URLSearchParams(
					newFilteredParams
				).toString()

				path.push(
					`/search${newQueryParamsString ? `?${newQueryParamsString}` : ''}`
				)

				setMake(value)
			}}
			className={`${
				isMakeMatch ? '!text-t-text-primary !bg-t-blue-light' : ''
			} bg-gray-200 px-2 text-sm py-1 cursor-pointer duration-100 rounded-xl hover:text-t-text-primary hover:bg-t-blue-light :active:text-t-text-primary :active:bg-t-blue-light;`}
		>
			{label}
		</div>
	)
}

export default Brand
