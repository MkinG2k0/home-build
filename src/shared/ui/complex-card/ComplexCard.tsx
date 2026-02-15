import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import * as React from 'react';

import { cn } from '../../lib';
import type { Complex } from '../../model';

export interface ComplexCardProps {
  className?: string;
  complex: Complex;
}

const ComplexCard = React.forwardRef<HTMLIonCardElement, ComplexCardProps>(
  ({ className, complex }, ref) => (
    <IonCard
      className={cn(
        'min-w-[260px] overflow-hidden rounded-xl border-0 shadow-md',
        'bg-white',
        className
      )}
      ref={ref}
    >
      <img
        alt={complex.name}
        src={complex.image}
        className="h-40 w-full object-cover"
      />
      <IonCardHeader className="px-4 pb-1 pt-4">
        <IonCardTitle className="text-base font-bold text-slate-800">
          {complex.name}
        </IonCardTitle>
        {complex.subtitle && (
          <IonCardSubtitle className="text-sm text-slate-500">
            {complex.subtitle}
          </IonCardSubtitle>
        )}
      </IonCardHeader>
      {complex.priceStart && (
        <IonCardContent className="px-4 pt-0 pb-4 text-sm text-slate-600">
          {complex.priceStart}
          {complex.metro && ` · ${complex.metro}`}
        </IonCardContent>
      )}
    </IonCard>
  )
);

ComplexCard.displayName = 'ComplexCard';

export { ComplexCard };
