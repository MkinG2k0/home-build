import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import * as React from 'react';

import { cn } from '../../lib';
import type { TeamMember } from '../../model';

export interface TeamMemberCardProps {
  className?: string;
  member: TeamMember;
}

const TeamMemberCard = React.forwardRef<HTMLIonCardElement, TeamMemberCardProps>(
  ({ className, member }, ref) => (
    <IonCard
      className={cn(
        'min-w-[140px] overflow-hidden rounded-xl border-0 shadow-md bg-white',
        className
      )}
      ref={ref}
    >
      <img
        alt={member.name}
        src={member.photo}
        className="h-28 w-full object-cover"
      />
      <IonCardHeader className="pb-1 pt-2">
        <IonCardTitle className="text-sm font-bold text-slate-800">
          {member.name}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="pt-0 text-xs text-slate-500">
        {member.role}
      </IonCardContent>
    </IonCard>
  )
);

TeamMemberCard.displayName = 'TeamMemberCard';

export { TeamMemberCard };
