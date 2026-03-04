import { IonText } from '@ionic/react'
import * as React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { TEXTS } from '../../shared/config'
import type {
	StrapiEntity,
	StrapiVideoBlogAttributes,
} from '../../shared/model'
import { VideoCard, VideoModal } from '../../shared/ui'

import 'swiper/css'

const SKELETON_COUNT = 4

const VideoCardSkeleton: React.FC = () => (
	<div className="h-full w-full overflow-hidden rounded-xl border-0 bg-white shadow-xl">
		<div className="aspect-video w-full animate-pulse rounded-t-xl bg-slate-200"/>
		<div className="px-4 pb-4 pt-4">
			<div className="h-4 w-3/4 animate-pulse rounded bg-slate-200"/>
		</div>
	</div>
)

const VideoSectionSkeleton: React.FC = () => (
	<section className="video-section">
		<IonText>
			<h2 className="mb-6 text-3xl! font-bold text-slate-800">{TEXTS.video}</h2>
		</IonText>
		<div className="flex gap-3.5 ">
			{Array.from({length: SKELETON_COUNT}).map((_, i) => (
				<div
					className="min-w-[calc(40%-7px)] flex-1 sm:min-w-[calc(28.5%-11px)] lg:min-w-[calc(22%-11px)]"
					key={i}
				>
					<VideoCardSkeleton/>
				</div>
			))}
		</div>
	</section>
)

export interface VideoSectionProps {
	className?: string;
	videos?: StrapiEntity<StrapiVideoBlogAttributes>[];
	isLoading?: boolean;
}

const VideoSection: React.FC<VideoSectionProps> = ({videos, isLoading}) => {
	const [selectedVideo, setSelectedVideo] =
		React.useState<StrapiEntity<StrapiVideoBlogAttributes> | null>(null)

	const handleCloseModal = React.useCallback(() => {
		setSelectedVideo(null)
	}, [])

	if (isLoading || videos?.length === 0) {
		return <VideoSectionSkeleton/>
	}

	return (
		<section className="video-section">
			<IonText>
				<h2 className="mb-6 text-3xl! font-bold text-slate-800">
					{TEXTS.video}
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
				{videos?.map((v) => (
					<SwiperSlide key={v.id}>
						<VideoCard item={v} onPress={() => setSelectedVideo(v)}/>
					</SwiperSlide>
				))}
			</Swiper>
			<VideoModal
				isOpen={selectedVideo !== null}
				onDidDismiss={handleCloseModal}
				video={selectedVideo}
			/>
		</section>
	)
}

VideoSection.displayName = 'VideoSection'

export { VideoSection }
