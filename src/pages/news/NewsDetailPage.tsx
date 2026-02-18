import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import * as React from "react";
import { useParams } from "react-router-dom";

import { useNewsById } from "../../shared/lib/hooks";
import { getStrapiImageUrl } from "../../shared/lib";
import {
  ErrorState,
  LoadingState,
  PageWithRefresher,
} from "../../shared/ui";

const NewsDetailPage: React.FC = () => {
  const { id: documentId } = useParams<{ id: string }>();
  const {
    data: newsResponse,
    isLoading,
    isError,
    refetch,
  } = useNewsById(documentId);

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

  if (!newsResponse?.data) {
    return (
      <PageWithRefresher>
        <div className="flex items-center justify-center p-8">
          <p className="text-slate-600">Новость не найдена</p>
        </div>
      </PageWithRefresher>
    );
  }

  const newsItem = newsResponse.data;

  return (
    <PageWithRefresher>
      <div className="flex flex-col gap-4 p-4">
        <IonCard className="overflow-hidden rounded-xl border-0 shadow-md bg-white m-0!">
          {newsItem.img && (
            <img
              alt={newsItem.title}
              className="h-64 w-full object-cover"
              src={getStrapiImageUrl(newsItem.img.url)}
            />
          )}
          <IonCardHeader className="px-4 pb-2 pt-4">
            <IonCardTitle className="text-2xl font-bold text-slate-800">
              {newsItem.title}
            </IonCardTitle>
            <span className="mt-2 text-sm text-slate-500">
              {new Date(newsItem.createdAt).toLocaleDateString()}
            </span>
          </IonCardHeader>
          <IonCardContent className="px-4 pb-4">
            {newsItem.description && (
              <p className="text-base leading-relaxed text-slate-700">
                {newsItem.description}
              </p>
            )}
          </IonCardContent>
        </IonCard>
      </div>
    </PageWithRefresher>
  );
};

export { NewsDetailPage };
