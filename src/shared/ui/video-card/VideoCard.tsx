import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/react'
import * as React from 'react'

import { cn, getStrapiImageUrl } from '../../lib'
import type { StrapiEntity, StrapiVideoBlogAttributes } from '../../model'

export interface VideoCardProps {
	className?: string;
	item: StrapiEntity<StrapiVideoBlogAttributes>;
	onPress?: () => void;
}

const VideoCard = React.forwardRef<HTMLIonCardElement, VideoCardProps>(
	({className, item, onPress}, ref) => (
		<IonCard
			className={cn(
				' cursor-pointer overflow-hidden rounded-xl h-full border-0 shadow-xl bg-white m-0!',
				'transition-opacity active:opacity-90',
				className,
			)}
			ref={ref}
			onClick={onPress}
		>
			<div className="relative aspect-video w-full overflow-hidden">
				<img
					alt=""
					className="size-full object-cover"
					src={getStrapiImageUrl(item.img.url)}
				/>
				<div
					aria-hidden
					className="absolute inset-0 flex items-center justify-center bg-black/20"
				>
					<div
						className="flex size-14 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm"
						role="presentation"
					>
						<div className="ml-1 h-0 w-0 border-y-8 border-l-14 border-y-transparent border-l-slate-800"/>
					</div>
				</div>
			</div>
			<IonCardHeader className="px-4 pb-4 pt-4">
				<IonCardTitle className="text-base font-bold text-slate-800">
					{item.title}
				</IonCardTitle>
			</IonCardHeader>
		</IonCard>
	),
)

VideoCard.displayName = 'VideoCard'

export { VideoCard }
