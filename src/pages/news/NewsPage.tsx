import * as React from "react";

import { useAppStore } from "../../app/store";
import { NewsCard, PageWithRefresher } from "../../shared/ui";

const NewsPage: React.FC = () => {
  const news = useAppStore((s) => s.news);

  return (
    <PageWithRefresher>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {news.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </PageWithRefresher>
  );
};

export { NewsPage };
