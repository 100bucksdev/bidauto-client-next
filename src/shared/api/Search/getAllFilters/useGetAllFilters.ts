import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getAllFilters, getAllFiltersParams } from './getAllFilters'

export function useGetSearchFilters(
	params: getAllFiltersParams,
	settings?: QuerySettings<typeof getAllFilters>
): {
	fuels: { value: string; label: string }[] | undefined
	vehicles_types: { value: string; label: string }[] | undefined
	lot_conditions: { value: string; label: string }[] | undefined
	insurances: { value: string; label: string }[]
} {
	const { data } = useQuery({
		queryKey: ['gelAllFilters', params.auction],
		queryFn: () => getAllFilters({ params, config: settings?.config }),
		...settings?.options,
	})

	const [response, setResponse] = useState<
		Record<
			'fuels' | 'vehicles_types' | 'lot_conditions',
			{ value: string; label: string }[] | undefined
		>
	>({
		fuels: undefined,
		vehicles_types: undefined,
		lot_conditions: undefined,
	})

	useEffect(() => {
		if (data) {
			const transformedData: any = {}

			for (const k in data.data) {
				const key: 'fuels' | 'vehicles_types' | 'lot_conditions' = k as
					| 'fuels'
					| 'vehicles_types'
					| 'lot_conditions'
				if (Array.isArray(data.data[key])) {
					transformedData[key] = data.data[key].map(item => ({
						value: item.slug,
						label: item.name,
					}))
				}
			}

			setResponse(prevState => ({
				...prevState,
				...transformedData,
			}))
		}
	}, [data])

	return {
		fuels: [
			{ value: 'ALL_FUELS', label: 'All Fuels' },
			...(response.fuels ? response.fuels : []),
		],
		lot_conditions: [
			{ value: 'ALL_CONDITIONS', label: 'All Conditions' },
			...(response.lot_conditions ? response.lot_conditions : []),
		],
		vehicles_types: [
			{ value: 'ALL_VEHICLES_TYPES', label: 'All Vehicles Types' },
			...(response.vehicles_types ? response.vehicles_types : []),
		],
		insurances: [
			{ value: 'ALL', label: 'All' },
			{ value: '1', label: 'Yes' },
			{ value: '0', label: 'No' },
		],
	}
}
