import { IonContent, IonPage } from "@ionic/react";
import * as React from "react";

import { useAppStore } from "../../app/store";
import { NewsCard } from "../../shared/ui";

const NewsPage: React.FC = () => {
  const news = useAppStore((s) => s.news);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1 className="mb-4 text-xl font-bold text-slate-800">Новости</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export { NewsPage };
