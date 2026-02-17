import { IonRouterLink, IonText } from "@ionic/react";
import * as React from "react";

import { TEXTS } from "../../shared/config";
import type { NewsItem } from "../../shared/model";
import { NewsCard } from "../../shared/ui";

export interface HomeNewsSectionProps {
  className?: string;
  news: NewsItem[];
}

const HomeNewsSection = React.forwardRef<HTMLElement, HomeNewsSectionProps>(
  ({ className, news }, ref) => (
    <section className={className} ref={ref}>
      <IonText>
        <h2 className="mb-6 text-3xl! font-bold text-slate-800">
          {TEXTS.news}
        </h2>
      </IonText>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-1 lg:grid-cols-2">
        {news.slice(0, 4).map((item) => (
          <IonRouterLink
            key={item.id}
            routerDirection="forward"
            routerLink={`/news/${item.id}`}
          >
            <NewsCard item={item} />
          </IonRouterLink>
        ))}
      </div>
    </section>
  ),
);

HomeNewsSection.displayName = "HomeNewsSection";

export { HomeNewsSection };
