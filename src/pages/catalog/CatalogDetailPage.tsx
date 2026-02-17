import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import * as React from "react";
import { useParams } from "react-router-dom";

import { useAppStore } from "../../app/store";
import { PageWithRefresher } from "../../shared/ui";

const CatalogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const complexes = useAppStore((s) => s.complexes);

  const complex = React.useMemo(
    () => complexes.find((c) => c.id === id),
    [complexes, id],
  );

  if (!complex) {
    return (
      <PageWithRefresher>
        <div className="flex items-center justify-center p-8">
          <p className="text-slate-600">Комплекс не найден</p>
        </div>
      </PageWithRefresher>
    );
  }

  return (
    <PageWithRefresher>
      <div className="flex flex-col gap-4 p-4">
        <IonCard className="overflow-hidden rounded-xl border-0 shadow-md bg-white m-0!">
          <img
            alt={complex.name}
            className="h-64 w-full object-cover"
            src={complex.image}
          />
          <IonCardHeader className="px-4 pb-2 pt-4">
            <IonCardTitle className="text-2xl font-bold text-slate-800">
              {complex.name}
            </IonCardTitle>
            {complex.subtitle && (
              <IonCardSubtitle className="text-base text-slate-600">
                {complex.subtitle}
              </IonCardSubtitle>
            )}
          </IonCardHeader>
          <IonCardContent className="flex flex-col gap-3 px-4 pb-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-slate-700">
                Адрес:
              </span>
              <span className="text-base text-slate-600">
                {complex.address}
              </span>
            </div>
            {complex.metro && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-700">
                  Метро:
                </span>
                <span className="text-base text-slate-600">
                  {complex.metro}
                </span>
              </div>
            )}
            {complex.priceStart && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-700">
                  Цена от:
                </span>
                <span className="text-lg font-bold text-slate-800">
                  {complex.priceStart}
                </span>
              </div>
            )}
          </IonCardContent>
        </IonCard>
      </div>
    </PageWithRefresher>
  );
};

export { CatalogDetailPage };
