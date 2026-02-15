import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import * as React from 'react';

import { useAppStore } from '../../app/store';
import { ComplexCard } from '../../shared/ui';

const CatalogPage: React.FC = () => {
  const complexes = useAppStore((s) => s.complexes);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1 className="mb-4 text-xl font-bold text-slate-800">Каталог</h1>
        <IonGrid>
          <IonRow>
            {complexes.map((c) => (
              <IonCol key={c.id} size="12" sizeMd="6" sizeLg="4">
                <ComplexCard complex={c} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export { CatalogPage };
