import {
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { notificationsOutline, personCircleOutline } from 'ionicons/icons';
import * as React from 'react';

import { cn } from '../../shared/lib';

export interface AppHeaderProps {
  className?: string;
}

const AppHeader = React.forwardRef<HTMLIonHeaderElement, AppHeaderProps>(
  ({ className }, ref) => (
    <IonHeader
      className={cn(
        'border-b border-slate-200 bg-white shadow-sm',
        className
      )}
      ref={ref}
    >
      <IonToolbar className="min-h-[56px]">
        <IonButtons slot="start">
          <IonMenuButton autoHide={false} className="text-slate-700" />
        </IonButtons>
        <IonTitle className="text-center text-lg font-bold tracking-tight text-blue-600">
          ETALON INVEST
        </IonTitle>
        <IonButtons slot="end">
          <button
            type="button"
            className="ion-activatable ion-focusable flex items-center justify-center rounded-full p-2 text-slate-600 active:bg-slate-100"
            aria-label="Уведомления"
          >
            <IonIcon icon={notificationsOutline} className="text-2xl" />
          </button>
          <button
            type="button"
            className="ion-activatable ion-focusable flex items-center justify-center rounded-full p-2 text-slate-600 active:bg-slate-100"
            aria-label="Профиль"
          >
            <IonIcon icon={personCircleOutline} className="text-2xl" />
          </button>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
);

AppHeader.displayName = 'AppHeader';

export { AppHeader };
