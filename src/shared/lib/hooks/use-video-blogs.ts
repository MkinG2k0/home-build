import { useQuery } from '@tanstack/react-query'

import { fetchVideoBlogById, fetchVideoBlogs } from '../../api'
import { createDefaultQueryOptions } from '../../lib'
import type {
	StrapiEntity,
	StrapiResponse,
	StrapiSingleResponse,
	StrapiVideoBlogAttributes,
} from '../../model'

const QUERY_KEYS = {
	all: ['video-blogs'] as const,
	lists: () => [...QUERY_KEYS.all, 'list'] as const,
	list: () => [...QUERY_KEYS.lists()] as const,
	details: () => [...QUERY_KEYS.all, 'detail'] as const,
	detail: (id: string) => [...QUERY_KEYS.details(), id] as const,
} as const

export const useVideoBlogs = () => {
	return useQuery<
		StrapiResponse<StrapiVideoBlogAttributes>,
		Error,
		StrapiEntity<StrapiVideoBlogAttributes>[]
	>({
		queryKey: QUERY_KEYS.list(),
		queryFn: fetchVideoBlogs,
		...createDefaultQueryOptions<StrapiVideoBlogAttributes>(),
	})
}

export const useVideoBlog = (id: string | undefined = '') => {
	return useQuery<StrapiSingleResponse<StrapiVideoBlogAttributes> | null>({
		queryKey: QUERY_KEYS.detail(id || ''),
		queryFn: () => fetchVideoBlogById(id),
		enabled: !!id,
	})
}
