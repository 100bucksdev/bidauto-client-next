import {
	getStringParams,
	searchOptions,
	TCopartVehicles,
} from '@/store/searchOptions.store'
import { ISearchLotParams } from '@/types/SearchLotParams.interface'
import { usePathname, useRouter } from 'next/navigation'
import queryString from 'query-string'
import st from './brand.module.css'

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
	const location = usePathname()
	const queryParams: ISearchLotParams = queryString.parse(location.toString())
	const { setMake } = searchOptions()

	const isMakeMatch =
		label.replace(/ /g, '_').toLowerCase() === queryParams.make?.toLowerCase()

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
			} ${st.brand}`}
		>
			{label}
		</div>
	)
}

export default Brand
