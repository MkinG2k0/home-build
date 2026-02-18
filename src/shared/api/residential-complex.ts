import axios from 'axios'

import { getApiHeaders, getApiUrl } from '../config/api'
import type {
	StrapiResponse,
	StrapiResidentialComplexAttributes,
	StrapiSingleResponse,
} from '../model/strapi'

export const fetchResidentialComplexes = async () => {
	const url = getApiUrl('residential-complexes')
	const response = await axios.get<
		StrapiResponse<StrapiResidentialComplexAttributes>
	>(url, {
		headers: getApiHeaders(),
		params: {
			populate: ['img', 'swiper'],
			sort: 'createdAt:desc',
		},
	})

	return response.data
}

export const fetchResidentialComplexById = async (id: string) => {
	const url = getApiUrl(`residential-complexes/${id}`)
	const response = await axios.get<
		StrapiSingleResponse<StrapiResidentialComplexAttributes>
	>(url, {
		headers: getApiHeaders(),
		params: {
			populate: ['img', 'swiper'],
		},
	})

	return response.data
}
