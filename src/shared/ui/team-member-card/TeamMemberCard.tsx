import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import * as React from "react";

import { cn, getStrapiImageUrl } from "../../lib";
import type { StrapiEmployee } from "../../model";

export interface TeamMemberCardProps {
  className?: string;
  member: StrapiEmployee;
}

const TeamMemberCard = React.forwardRef<
  HTMLIonCardElement,
  TeamMemberCardProps
>(({ className, member }, ref) => (
  <IonCard
    className={cn(
      "min-w-[140px] overflow-hidden rounded-xl border-0 shadow-md bg-white m-0!",
      className,
    )}
    ref={ref}
  >
    {member.img && (
      <img
        alt={member.fullName || ""}
        src={getStrapiImageUrl(member.img.url)}
        className="h-56 w-full object-cover"
      />
    )}
    <IonCardHeader className="pb-1 pt-2">
      <IonCardTitle className="text-sm font-bold text-slate-800">
        {member.fullName || ""}
      </IonCardTitle>
    </IonCardHeader>
    {member.post && (
      <IonCardContent className="pt-0 text-xs text-slate-500">
        {member.post}
      </IonCardContent>
    )}
  </IonCard>
));

TeamMemberCard.displayName = "TeamMemberCard";

export { TeamMemberCard };
