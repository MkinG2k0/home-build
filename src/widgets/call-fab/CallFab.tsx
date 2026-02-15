import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { call } from "ionicons/icons";

import { logoWhatsapp } from "ionicons/icons";
export interface CallFabProps {
  className?: string;
  href?: string;
}

const CallFab = () => {
  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton>
        <IonIcon icon={call}></IonIcon>
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton href={"tel:+78001234567"} aria-label="Позвонить">
          <IonIcon icon={call}></IonIcon>
        </IonFabButton>
        <IonFabButton href={"tel:+78001234567"} aria-label="Позвонить">
          <IonIcon icon={call}></IonIcon>
        </IonFabButton>
        <IonFabButton>
          <IonIcon icon={logoWhatsapp}></IonIcon>
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};

CallFab.displayName = "CallFab";

export { CallFab };
