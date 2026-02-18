export interface StrapiMedia {

	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: Record<string, unknown> | null;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: Record<string, unknown> | null;
	createdAt: string;
	updatedAt: string;

}

export interface StrapiMediaArray {
	data: Array<{
		id: number;
		attributes: {
			name: string;
			alternativeText: string | null;
			caption: string | null;
			width: number;
			height: number;
			formats: Record<string, unknown> | null;
			hash: string;
			ext: string;
			mime: string;
			size: number;
			url: string;
			previewUrl: string | null;
			provider: string;
			provider_metadata: Record<string, unknown> | null;
			createdAt: string;
			updatedAt: string;
		};
	}>;
}

export type  StrapiEntity<T> = {
	id: number;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
} & T

export interface StrapiResponse<T> {
	data: StrapiEntity<T>[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export interface StrapiSingleResponse<T> {
	data: StrapiEntity<T>;
	meta: Record<string, unknown>;
}

export interface StrapiResidentialComplexAttributes {
	title: string;
	description: string | null;
	info: unknown;
	img: StrapiMedia;
	swiper: StrapiMediaArray;
	address: string;
	price: number | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
}

export interface StrapiVideoBlogAttributes {
	title: string;
	description: string | null;
	img: StrapiMedia;
	url: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
}

export interface StrapiNewsAttributes {
	title: string;
	description: string | null;
	img: StrapiMedia;
	content: unknown;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
}

export interface StrapiSlideAttributes {
	img: StrapiMedia;
	url: string | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
}

export interface StrapiMainSliderAttributes {
	slides: Array<StrapiEntity<StrapiSlideAttributes>>;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
}

export type StrapiResidentialComplex = StrapiEntity<StrapiResidentialComplexAttributes>;
export type StrapiVideoBlog = StrapiEntity<StrapiVideoBlogAttributes>;
export type StrapiNews = StrapiEntity<StrapiNewsAttributes>;
export type StrapiSlide = StrapiEntity<StrapiSlideAttributes>;
export type StrapiMainSlider = StrapiEntity<StrapiMainSliderAttributes>;
