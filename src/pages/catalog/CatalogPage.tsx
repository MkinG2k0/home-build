import { IonCol, IonGrid, IonRow, IonRouterLink } from "@ionic/react";
import * as React from "react";

import { useAppStore } from "../../app/store";
import { ComplexCard, PageWithRefresher } from "../../shared/ui";

const CatalogPage: React.FC = () => {
  const complexes = useAppStore((s) => s.complexes);

  return (
    <PageWithRefresher>
      <IonGrid>
        <IonRow>
          {complexes.map((c) => (
            <IonCol key={c.id} size="12" sizeMd="6" sizeLg="4">
              <IonRouterLink
                routerDirection="forward"
                routerLink={`/catalog/${c.id}`}
              >
                <ComplexCard complex={c} />
              </IonRouterLink>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </PageWithRefresher>
  );
};

export { CatalogPage };
