import { useQuery } from '@tanstack/react-query'

import { fetchMainSlider } from '../../api'
import {
	StrapiEntity, StrapiMainSlider,
	StrapiSingleResponse, StrapiSlide,
} from '../../model'

const QUERY_KEYS = {
	all: ['main-slider'] as const,
	single: () => [...QUERY_KEYS.all, 'single'] as const,
} as const

export const useMainSlider = () => {
	return useQuery<
		StrapiSingleResponse<StrapiMainSlider>,
		Error,
		StrapiEntity<StrapiSlide>[]
	>({
		queryKey: QUERY_KEYS.single(),
		queryFn: fetchMainSlider,
		select: (data) => data.data.slides,
	})
}
