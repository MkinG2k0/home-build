import { IonRouterLink } from "@ionic/react";
import * as React from "react";

import { mockNews } from "../../shared/data/mockData";
import { NewsCard, PageWithRefresher } from "../../shared/ui";

const NewsPage: React.FC = () => {
  return (
    <PageWithRefresher>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {mockNews.map((item) => (
          <IonRouterLink
            key={item.id}
            routerDirection="forward"
            routerLink={`/news/${item.id}`}
          >
            <NewsCard item={item} />
          </IonRouterLink>
        ))}
      </div>
    </PageWithRefresher>
  );
};

export { NewsPage };
