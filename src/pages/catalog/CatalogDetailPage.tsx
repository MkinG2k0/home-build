import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import * as React from "react";
import { useParams } from "react-router-dom";

import { useResidentialComplex } from "../../shared/lib/hooks";
import { getStrapiImageUrl } from "../../shared/lib";
import { ErrorState, LoadingState, PageWithRefresher } from "../../shared/ui";

const CatalogDetailPage: React.FC = () => {
  const { id: documentId } = useParams<{ id: string }>();
  const {
    data: complex,
    isLoading,
    isError,
    refetch,
  } = useResidentialComplex(documentId);

  if (isLoading) {
    return (
      <PageWithRefresher>
        <LoadingState />
      </PageWithRefresher>
    );
  }

  if (isError) {
    return (
      <PageWithRefresher>
        <ErrorState onRetry={() => refetch()} />
      </PageWithRefresher>
    );
  }

  if (!complex?.data) {
    return (
      <PageWithRefresher>
        <div className="flex items-center justify-center p-8">
          <p className="text-slate-600">Комплекс не найден</p>
        </div>
      </PageWithRefresher>
    );
  }

  const complexData = complex.data;

  return (
    <PageWithRefresher>
      <div className="flex flex-col gap-4 p-4 h-full">
        <IonCard className="overflow-hidden h-full rounded-xl border-0 shadow-md bg-white m-0!">
          <img
            alt={complexData.title}
            className="h-64 w-full object-cover"
            src={getStrapiImageUrl(complexData.img.url)}
          />
          <IonCardHeader className="px-4 pb-2 pt-4">
            <IonCardTitle className="text-2xl font-bold text-slate-800">
              {complexData.title}
            </IonCardTitle>
            {complexData.description && (
              <IonCardSubtitle className="text-base text-slate-600">
                {complexData.description}
              </IonCardSubtitle>
            )}
          </IonCardHeader>
          <IonCardContent className="flex flex-col gap-3 px-4 pb-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-slate-700">
                Адрес:
              </span>
              <span className="text-base text-slate-600">
                {complexData.address}
              </span>
            </div>
            {complexData.price && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-700">
                  Цена от:
                </span>
                <span className="text-lg font-bold text-slate-800">
                  {complexData.price.toLocaleString()} ₽
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
