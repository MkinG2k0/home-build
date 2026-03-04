import { IonRouterLink, IonText } from '@ionic/react'
import * as React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { TEXTS } from '../../shared/config'
import type {
	StrapiEntity,
	StrapiResidentialComplexAttributes,
} from '../../shared/model'
import { ComplexCard } from '../../shared/ui'

import 'swiper/css'

const SKELETON_COUNT = 4

const ComplexCardSkeleton: React.FC = () => (
	<div className="h-full w-full overflow-hidden rounded-xl border-0 bg-white shadow-md">
		<div className="h-32 w-full animate-pulse rounded-t-xl bg-slate-200"/>
		<div className="space-y-2 px-4 pb-3 pt-3">
			<div className="h-4 w-3/4 animate-pulse rounded bg-slate-200"/>
			<div className="h-3 w-full animate-pulse rounded bg-slate-200"/>
		</div>
	</div>
)

const ComplexesSwiperSkeleton: React.FC = () => (
	<section>
		<IonText>
			<h2 className="mb-6 text-3xl! font-bold text-slate-800">
				{TEXTS.housing_complexes}
			</h2>
		</IonText>
		<div className="flex gap-3.5 ">
			{Array.from({length: SKELETON_COUNT}).map((_, i) => (
				<div
					className="min-w-[calc(40%-7px)] flex-1 sm:min-w-[calc(28.5%-11px)] lg:min-w-[calc(22%-11px)]"
					key={i}
				>
					<ComplexCardSkeleton/>
				</div>
			))}
		</div>
	</section>
)

export interface ComplexesSwiperProps {
	className?: string;
	complexes?: StrapiEntity<StrapiResidentialComplexAttributes>[];
	isLoading?: boolean;
}

const ComplexesSwiper: React.FC<ComplexesSwiperProps> = ({
	complexes,
	isLoading,
}) => {
	if (isLoading || complexes?.length === 0) {
		return <ComplexesSwiperSkeleton/>
	}

	return (
		<section>
			<IonText>
				<h2 className="mb-6 text-3xl! font-bold text-slate-800">
					{TEXTS.housing_complexes}
				</h2>
			</IonText>
			<Swiper
				breakpoints={{
					320: {slidesPerView: 2.5},
					640: {slidesPerView: 3.5},
					1024: {slidesPerView: 4.5},
				}}
				className="overflow-visible!"
				grabCursor
				resistance
				resistanceRatio={0.85}
				slidesPerView={2.5}
				spaceBetween={14}
				touchEventsTarget="container"
			>
				{complexes?.map((c) => (
					<SwiperSlide key={c.id}>
						<IonRouterLink
							routerDirection="forward"
							routerLink={`/catalog/${c.documentId}`}
						>
							<ComplexCard complex={c}/>
						</IonRouterLink>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}

ComplexesSwiper.displayName = 'ComplexesSwiper'

export { ComplexesSwiper }
