import {
	IonCard,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
} from '@ionic/react'
import * as React from 'react'

import { cn, getStrapiImageUrl } from '../../lib'
import type { StrapiEntity, StrapiResidentialComplexAttributes } from '../../model'

export interface ComplexCardProps {
	className?: string;
	complex: StrapiEntity<StrapiResidentialComplexAttributes>;
}

const ComplexCard = React.forwardRef<HTMLIonCardElement, ComplexCardProps>(
	({className, complex}, ref) => (
		<IonCard
			className={cn(
				'w-full overflow-hidden h-full rounded-xl border-0 shadow-md m-0! ',
				'bg-white',
				className,
			)}
			ref={ref}
		>
			<img
				alt={getStrapiImageUrl(complex.img.url)}
				src={getStrapiImageUrl(complex.img.url)}
				className="h-32 w-full object-cover"
			/>
			<IonCardHeader className="px-4 pb-3 pt-1">
				<IonCardTitle className="text-base font-bold text-slate-800">
					{complex.title}
				</IonCardTitle>
				{complex.description && (
					<IonCardSubtitle className="text-sm text-slate-500">
						{complex.description}
					</IonCardSubtitle>
				)}
			</IonCardHeader>
		</IonCard>
	),
)

ComplexCard.displayName = 'ComplexCard'

export { ComplexCard }
