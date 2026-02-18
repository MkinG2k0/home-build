import { IonRouterLink } from "@ionic/react";
import * as React from "react";

import { useNews } from "../../shared/lib/hooks";
import {
  ErrorState,
  LoadingState,
  NewsCard,
  PageWithRefresher,
} from "../../shared/ui";

const NewsPage: React.FC = () => {
  const {
    data: news,
    isLoading,
    isError,
    refetch,
  } = useNews();

  if (isLoading) {
    return (
      <PageWithRefresher>
        <LoadingState />
      </PageWithRefresher>
    );
  }

  if (isError || !news) {
    return (
      <PageWithRefresher>
        <ErrorState onRetry={() => refetch()} />
      </PageWithRefresher>
    );
  }

  return (
    <PageWithRefresher>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {news.map((item) => (
          <IonRouterLink
            key={item.id}
            routerDirection="forward"
            routerLink={`/news/${item.documentId}`}
          >
            <NewsCard item={item} />
          </IonRouterLink>
        ))}
      </div>
    </PageWithRefresher>
  );
};

export { NewsPage };
