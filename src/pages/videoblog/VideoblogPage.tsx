import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
} from '@ionic/react';
import { playCircle } from 'ionicons/icons';
import * as React from 'react';

import { useAppStore } from '../../app/store';
import { cn } from '../../shared/lib';

const VideoblogPage: React.FC = () => {
  const videos = useAppStore((s) => s.videos);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1 className="mb-4 text-xl font-bold text-slate-800">Видеоблог</h1>
        <div className="flex flex-col gap-4">
          {videos.map((v) => (
            <IonCard key={v.id} className="overflow-hidden rounded-xl border-0 shadow-md bg-white">
              <div className="relative">
                <img
                  alt=""
                  className="h-40 w-full object-cover"
                  src={v.thumbnailUrl}
                />
                <div
                  className={cn(
                    'absolute inset-0 flex items-center justify-center bg-black/30'
                  )}
                >
                  <IonIcon className="text-5xl text-white" icon={playCircle} />
                </div>
              </div>
              <IonCardHeader className="pb-1 pt-2">
                <IonCardTitle className="text-base font-bold text-slate-800">
                  {v.title}
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export { VideoblogPage };
