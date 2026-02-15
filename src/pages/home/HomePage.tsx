import { IonContent, IonPage } from "@ionic/react";
import * as React from "react";

import { useAppStore } from "../../app/store";
import { TEXTS } from "../../shared/config";
import { NewsCard } from "../../shared/ui";
import { ComplexesSwiper } from "../../widgets/complexes-swiper";
import { HeroSwiper } from "../../widgets/hero-swiper";

const HomePage: React.FC = () => {
  const complexes = useAppStore((s) => s.complexes);
  const news = useAppStore((s) => s.news);

  return (
    <IonPage>
      <IonContent>
        <HeroSwiper className="mb-6 sm:mb-8" />

        <ComplexesSwiper className="mb-8 sm:mb-8" complexes={complexes} />

        <section className="pb-8">
          <h3 className="mb-6 text-xl font-bold text-slate-800">
            {TEXTS.news}
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 3).map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export { HomePage };
