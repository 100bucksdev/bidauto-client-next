import { QuerySettings } from '@/index'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getModelsByMake, getModelsByMakeParams } from './getModelsByMake'

export function useGetModelsByMake({
	settings,
	params,
	setModels,
}: {
	settings?: QuerySettings<typeof getModelsByMake>
	params: getModelsByMakeParams
	setModels?: Dispatch<SetStateAction<{ value: string; label: string }[]>>
}) {
	const t = useTranslations()
	const [models, setLocalModels] = useState<{ value: string; label: string }[]>(
		[{ value: 'All_Models', label: t('home.searchbar.allModels') }]
	)

	useEffect(() => {
		if (params.make.toLowerCase() === 'all_makes') {
			const allOption = [
				{ value: 'All_Models', label: t('home.searchbar.allModels') },
			]
			setLocalModels(allOption)
			if (setModels) {
				setModels(allOption)
			}
		}
	}, [params.make, setModels])

	const { data, isSuccess } = useQuery({
		queryKey: ['getModelsByMake', params],
		queryFn: () => getModelsByMake({ params, config: settings?.config }),
		enabled: params.make.toLowerCase() !== 'all_makes',

		...settings?.options,
	})

	useEffect(() => {
		if (isSuccess && data?.data) {
			if (!data?.data.length) {
				const defaultOption = [
					{ value: 'All_Models', label: t('home.searchbar.allModels') },
				]
				setLocalModels(defaultOption)
				if (setModels) {
					setModels(defaultOption)
				}
			} else {
				const listOfModelsFormatted: { value: string; label: string }[] =
					data.data.map(model => ({
						value: model.slug,
						label: model.name,
					}))

				setLocalModels([
					{ value: 'All_Models', label: t('home.searchbar.allModels') },
					...listOfModelsFormatted,
				])
				if (setModels) {
					setModels([
						{ value: 'All_Models', label: t('home.searchbar.allModels') },
						...listOfModelsFormatted,
					])
				}
			}
		}
	}, [isSuccess, data])

	useEffect(() => {
		if (!data?.data.length && params.make.toLowerCase() !== 'all_makes') {
			setLocalModels([
				{ value: 'All_Models', label: t('home.searchbar.allModels') },
			])
		}
	}, [data, params.make])

	return models
}
