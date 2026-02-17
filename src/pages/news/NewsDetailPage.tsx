import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import * as React from "react";
import { useParams } from "react-router-dom";

import { useAppStore } from "../../app/store";
import { PageWithRefresher } from "../../shared/ui";

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const news = useAppStore((s) => s.news);

  const newsItem = React.useMemo(
    () => news.find((item) => item.id === id),
    [news, id],
  );

  if (!newsItem) {
    return (
      <PageWithRefresher>
        <div className="flex items-center justify-center p-8">
          <p className="text-slate-600">Новость не найдена</p>
        </div>
      </PageWithRefresher>
    );
  }

  return (
    <PageWithRefresher>
      <div className="flex flex-col gap-4 p-4">
        <IonCard className="overflow-hidden rounded-xl border-0 shadow-md bg-white m-0!">
          <img
            alt={newsItem.title}
            className="h-64 w-full object-cover"
            src={newsItem.image}
          />
          <IonCardHeader className="px-4 pb-2 pt-4">
            <IonCardTitle className="text-2xl font-bold text-slate-800">
              {newsItem.title}
            </IonCardTitle>
            <span className="mt-2 text-sm text-slate-500">{newsItem.date}</span>
          </IonCardHeader>
          <IonCardContent className="px-4 pb-4">
            <p className="text-base leading-relaxed text-slate-700">
              {newsItem.description}
            </p>
          </IonCardContent>
        </IonCard>
      </div>
    </PageWithRefresher>
  );
};

export { NewsDetailPage };
