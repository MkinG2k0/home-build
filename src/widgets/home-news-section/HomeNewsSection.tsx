import { IonRouterLink, IonText } from "@ionic/react";
import * as React from "react";

import { TEXTS } from "../../shared/config";
import type { StrapiEntity, StrapiNewsAttributes } from "../../shared/model";
import { NewsCard } from "../../shared/ui";

const NewsCardSkeleton: React.FC = () => (
  <div className="flex flex-row overflow-hidden rounded-xl border-0 bg-white shadow-md">
    <div className="h-36 w-40 shrink-0 animate-pulse bg-slate-200" />
    <div className="flex flex-1 flex-col gap-2 px-4 py-4">
      <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
      <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
      <div className="mt-auto h-3 w-16 animate-pulse rounded bg-slate-200 self-end" />
    </div>
  </div>
);

const HomeNewsSectionSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => (
  <section className={className}>
    <IonText>
      <h2 className="mb-6 text-3xl! font-bold text-slate-800">{TEXTS.news}</h2>
    </IonText>
    <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2">
      <NewsCardSkeleton />
      <NewsCardSkeleton />
      <NewsCardSkeleton />
      <NewsCardSkeleton />
    </div>
  </section>
);

export interface HomeNewsSectionProps {
  className?: string;
  news?: StrapiEntity<StrapiNewsAttributes>[];
}

const HomeNewsSection: React.FC<HomeNewsSectionProps> = ({
  className,
  news,
}) => {
  const isLoading = news === undefined || news.length === 0;

  if (isLoading) {
    return <HomeNewsSectionSkeleton className={className} />;
  }

  return (
    <section className={className}>
      <IonText>
        <h2 className="mb-6 text-3xl! font-bold text-slate-800">
          {TEXTS.news}
        </h2>
      </IonText>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-1 lg:grid-cols-2">
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
    </section>
  );
};

HomeNewsSection.displayName = "HomeNewsSection";

export { HomeNewsSection };
