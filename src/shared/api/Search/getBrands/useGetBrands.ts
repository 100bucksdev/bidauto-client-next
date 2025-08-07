import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { getBrands, getBrandsParams } from './getBrands'

export function useGetBrands({
	settings,
	params,
}: {
	settings?: QuerySettings<typeof getBrands>
	params: getBrandsParams
}) {
	const t = useTranslations()

	const { data, isFetching } = useQuery({
		queryKey: ['getBrands', params],
		queryFn: () => getBrands({ params, config: settings?.config }),
		...settings?.options,
	})

	const listOfBrandsFormatted: { value: string; label: string }[] =
		!isFetching && Array.isArray(data?.data)
			? data.data.map(model => ({
					value: model.slug,
					label: model.name,
			  }))
			: []

	return [
		{ value: 'All_Makes', label: t('home.searchbar.allMakes') },
		...listOfBrandsFormatted,
	]
}
