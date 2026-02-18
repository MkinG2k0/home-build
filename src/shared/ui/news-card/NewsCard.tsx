import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
} from '@ionic/react'
import * as React from 'react'

import { cn, getStrapiImageUrl } from '../../lib'
import type { StrapiEntity, StrapiNewsAttributes } from '../../model'

export interface NewsCardProps {
	className?: string;
	item: StrapiEntity<StrapiNewsAttributes>;
}

const NewsCard = React.forwardRef<HTMLIonCardElement, NewsCardProps>(
	({className, item}, ref) => (
		<IonCard
			className={cn(
				'overflow-hidden rounded-xl border-0 shadow-md bg-white m-0!',
				className,
			)}
			ref={ref}
		>
			<div className="flex flex-row">
				<img
					alt=""
					src={getStrapiImageUrl(item.img.url)}
					className="h-36 shrink-0 object-cover w-40"
				/>
				<div className="flex flex-1 flex-col">
					<IonCardHeader className="px-4 pb-1 pt-4 sm:px-5">
						<IonCardTitle className="text-base font-bold text-slate-800">
							{item.title}
						</IonCardTitle>
					</IonCardHeader>
					<IonCardContent className="flex flex-1 flex-col px-4 pt-0 pb-4 sm:px-5">
						<p className="line-clamp-2 text-sm text-slate-600">
							{item.description}
						</p>
						<span className="mt-auto pt-2 text-right text-xs text-slate-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
					</IonCardContent>
				</div>
			</div>
		</IonCard>
	),
)

NewsCard.displayName = 'NewsCard'

export { NewsCard }
