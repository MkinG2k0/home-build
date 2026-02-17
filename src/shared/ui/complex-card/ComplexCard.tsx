import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import * as React from "react";

import { cn } from "../../lib";
import type { Complex } from "../../model";

export interface ComplexCardProps {
  className?: string;
  complex: Complex;
}

const ComplexCard = React.forwardRef<HTMLIonCardElement, ComplexCardProps>(
  ({ className, complex }, ref) => (
    <IonCard
      className={cn(
        "w-full overflow-hidden h-full rounded-xl border-0 shadow-md m-0! ",
        "bg-white",
        className,
      )}
      ref={ref}
    >
      <img
        alt={complex.name}
        src={complex.image}
        className="h-32 w-full object-cover"
      />
      <IonCardHeader className="px-4 pb-3 pt-1">
        <IonCardTitle className="text-base font-bold text-slate-800">
          {complex.name}
        </IonCardTitle>
        {complex.subtitle && (
          <IonCardSubtitle className="text-sm text-slate-500">
            {complex.subtitle}
          </IonCardSubtitle>
        )}
      </IonCardHeader>
    </IonCard>
  ),
);

ComplexCard.displayName = "ComplexCard";

export { ComplexCard };
