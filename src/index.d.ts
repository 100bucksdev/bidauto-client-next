import { FetchesRequestConfig } from '@astralis-team/primitive-fetch'

interface MutationSettings<Params = void, Func = unknown> {
	config?: FetchesRequestConfig
	options?: import('@tanstack/react-query').UseMutationOptions<
		Awaited<ReturnType<Func>>,
		unknown,
		Params,
		unknown
	>
}

interface QuerySettings<Func = unknown> {
	config?: FetchesRequestConfig
	options?: Omit<
		UseQueryOptions<
			Awaited<ReturnType<Func>>, // Данные
			Error, // Ошибка
			Awaited<ReturnType<Func>>, // Данные
			[string] // Тип ключа (QueryKey)
		>,
		'queryKey'
	>
}
