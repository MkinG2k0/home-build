import { IonCol, IonGrid, IonRow, IonRouterLink } from "@ionic/react";
import * as React from "react";

import { useResidentialComplexes } from "../../shared/lib/hooks";
import {
  ComplexCard,
  ErrorState,
  LoadingState,
  PageWithRefresher,
} from "../../shared/ui";

const CatalogPage: React.FC = () => {
  const {
    data: complexes,
    isLoading,
    isError,
    refetch,
  } = useResidentialComplexes();

  if (isLoading) {
    return (
      <PageWithRefresher>
        <LoadingState />
      </PageWithRefresher>
    );
  }

  if (isError || !complexes) {
    return (
      <PageWithRefresher>
        <ErrorState onRetry={() => refetch()} />
      </PageWithRefresher>
    );
  }

  return (
    <PageWithRefresher>
      <IonGrid>
        <IonRow>
          {complexes.map((c) => (
            <IonCol key={c.id} size="12" sizeMd="6" sizeLg="4">
              <IonRouterLink
                routerDirection="forward"
                routerLink={`/catalog/${c.documentId}`}
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
