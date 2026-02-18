import { useQuery } from '@tanstack/react-query'

import { fetchNews, fetchNewsById } from '../../api'
import { createDefaultQueryOptions } from '../../lib'
import type {
	StrapiEntity,
	StrapiResponse,
	StrapiSingleResponse,
	StrapiNewsAttributes,
} from '../../model'

const QUERY_KEYS = {
	all: ['news'] as const,
	lists: () => [...QUERY_KEYS.all, 'list'] as const,
	list: () => [...QUERY_KEYS.lists()] as const,
	details: () => [...QUERY_KEYS.all, 'detail'] as const,
	detail: (id: string) => [...QUERY_KEYS.details(), id] as const,
} as const

export const useNews = () => {
	return useQuery<
		StrapiResponse<StrapiNewsAttributes>,
		Error,
		StrapiEntity<StrapiNewsAttributes>[]
	>({
		queryKey: QUERY_KEYS.list(),
		queryFn: fetchNews,
		...createDefaultQueryOptions<StrapiNewsAttributes>(),
	})
}

export const useNewsById = (id: string | undefined = '') => {
	return useQuery<StrapiSingleResponse<StrapiNewsAttributes> | null>({
		queryKey: QUERY_KEYS.detail(id || ''),
		queryFn: () => fetchNewsById(id),
		enabled: !!id,
	})
}
