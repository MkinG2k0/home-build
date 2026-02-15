import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import {
  homeOutline,
  informationCircleOutline,
  listOutline,
  newspaperOutline,
  videocamOutline,
} from 'ionicons/icons';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { TEXTS } from '../../shared/config';

const MENU_ITEMS = [
  { icon: homeOutline, path: '/', title: TEXTS.home },
  { icon: listOutline, path: '/catalog', title: TEXTS.catalog },
  { icon: newspaperOutline, path: '/news', title: TEXTS.news },
  { icon: videocamOutline, path: '/videos', title: TEXTS.videoblog },
  { icon: informationCircleOutline, path: '/about', title: TEXTS.about_us },
] as const;

export interface AppMenuProps {
  contentId: string;
}

const AppMenu: React.FC<AppMenuProps> = ({ contentId }) => {
  const location = useLocation();

  return (
    <IonMenu contentId={contentId} type="overlay">
      <IonContent>
        <IonList>
          <IonListHeader>ETALON INVEST</IonListHeader>
          {MENU_ITEMS.map((item) => (
            <IonMenuToggle key={item.path} autoHide={false}>
              <IonItem
                className={location.pathname === item.path ? 'selected' : ''}
                detail={false}
                lines="none"
                routerDirection="none"
                routerLink={item.path}
              >
                <IonIcon aria-hidden slot="start" icon={item.icon} />
                <IonLabel>{item.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export { AppMenu };
