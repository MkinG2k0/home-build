import { IonButton, IonContent, IonPage } from '@ionic/react';
import * as React from 'react';

import { useAppStore } from '../../app/store';
import { TEXTS } from '../../shared/config';
import { ComplexCard, NewsCard } from '../../shared/ui';

const HomePage: React.FC = () => {
  const complexes = useAppStore((s) => s.complexes);
  const news = useAppStore((s) => s.news);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <section className="mb-8">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-white">
              {TEXTS.inviting_realtors}
            </h2>
            <p className="mb-5 text-sm text-blue-100">
              Сотрудничаем с риелторами. Выгодные условия и эксклюзивные объекты.
            </p>
            <IonButton fill="solid" color="light" size="small" className="font-semibold">
              Подробнее
            </IonButton>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="mb-4 text-xl font-bold text-slate-800">
            {TEXTS.housing_complexes}
          </h3>
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2">
            {complexes.map((c) => (
              <ComplexCard key={c.id} complex={c} />
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold text-slate-800">{TEXTS.news}</h3>
          <div className="flex flex-col gap-4">
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
