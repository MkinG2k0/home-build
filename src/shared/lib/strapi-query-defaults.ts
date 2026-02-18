import type { StrapiResponse } from '../model'

export const createEmptyStrapiResponse = <T>(): StrapiResponse<T> => ({
	data: [],
	meta: {
		pagination: {
			page: 1,
			pageSize: 0,
			pageCount: 0,
			total: 0,
		},
	},
})

export const createDefaultQueryOptions = <T>() => ({
	select: (data: StrapiResponse<T>) => data.data,
	placeholderData: createEmptyStrapiResponse<T>(),
})
