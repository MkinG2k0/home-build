import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { call } from "ionicons/icons";

import { logoWhatsapp } from "ionicons/icons";
export interface CallFabProps {
  className?: string;
  href?: string;
}

const CallFab = () => {
  return (
    <IonFab
      slot="fixed"
      vertical="bottom"
      horizontal="end"
      className="scale-125 sm:scale-100"
    >
      <IonFabButton>
        <IonIcon icon={call}></IonIcon>
      </IonFabButton>
      <IonFabList side="top" className="scale-125 sm:scale-100">
        <IonFabButton
          color={"secondary"}
          href={"tel:+78001234567"}
          aria-label="Позвонить"
        >
          <IonIcon icon={call}></IonIcon>
        </IonFabButton>
        <IonFabButton
          color={"secondary"}
          href={"tel:+78001234567"}
          aria-label="Позвонить"
        >
          <IonIcon icon={call}></IonIcon>
        </IonFabButton>
        <IonFabButton color={"success"}>
          <IonIcon icon={logoWhatsapp} className="text-white"></IonIcon>
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};

CallFab.displayName = "CallFab";

export { CallFab };
