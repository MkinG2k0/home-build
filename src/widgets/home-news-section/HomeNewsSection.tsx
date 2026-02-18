import { IonRouterLink, IonText } from "@ionic/react";
import * as React from "react";

import { TEXTS } from "../../shared/config";
import type { StrapiEntity, StrapiNewsAttributes } from "../../shared/model";
import { NewsCard } from "../../shared/ui";

export interface HomeNewsSectionProps {
  className?: string;
  news?: StrapiEntity<StrapiNewsAttributes>[];
}

const HomeNewsSection: React.FC<HomeNewsSectionProps> = ({ className, news }) => (
    <section className={className}>
      <IonText>
        <h2 className="mb-6 text-3xl! font-bold text-slate-800">
          {TEXTS.news}
        </h2>
      </IonText>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-1 lg:grid-cols-2">
        {news?.map((item) => (
          <IonRouterLink
            key={item.id}
            routerDirection="forward"
            routerLink={`/news/${item.documentId}`}
          >
            <NewsCard item={item} />
          </IonRouterLink>
        ))}
      </div>
    </section>
  );

HomeNewsSection.displayName = "HomeNewsSection";

export { HomeNewsSection };
