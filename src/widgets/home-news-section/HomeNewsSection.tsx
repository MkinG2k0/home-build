import * as React from "react";

import { TEXTS } from "../../shared/config";
import type { NewsItem } from "../../shared/model";
import { NewsCard } from "../../shared/ui";
import { IonText } from "@ionic/react";

export interface HomeNewsSectionProps {
  className?: string;
  news: NewsItem[];
}

const HomeNewsSection = React.forwardRef<HTMLElement, HomeNewsSectionProps>(
  ({ className, news }, ref) => (
    <section className={className} ref={ref}>
      <IonText>
        <h2 className="mb-6 text-4xl! font-bold text-slate-800">
          {TEXTS.news}
        </h2>
      </IonText>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-2">
        {news.slice(0, 3).map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  ),
);

HomeNewsSection.displayName = "HomeNewsSection";

export { HomeNewsSection };
