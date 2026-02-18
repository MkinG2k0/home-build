import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";
import {
  homeOutline,
  informationCircleOutline,
  listOutline,
  newspaperOutline,
  videocamOutline,
} from "ionicons/icons";
import * as React from "react";
import { useLocation } from "react-router-dom";

import { TEXTS } from "../../shared/config";
import { cn } from "../../shared/lib";
import { NotificationsPrompt } from "../../shared/ui";

export const MENU_ITEMS = [
  { icon: homeOutline, path: "/", title: TEXTS.home },
  { icon: listOutline, path: "/catalog", title: TEXTS.catalog },
  { icon: newspaperOutline, path: "/news", title: TEXTS.news },
  { icon: videocamOutline, path: "/videos", title: TEXTS.videoblog },
  { icon: informationCircleOutline, path: "/about", title: TEXTS.about_us },
] as const;

export interface AppMenuProps {
  contentId: string;
}

const AppMenu: React.FC<AppMenuProps> = ({ contentId }) => {
  const location = useLocation();

  return (
    <IonMenu contentId={contentId} type="overlay">
      <IonContent>
        <IonList className="py-4 h-full">
          <IonListHeader className="px-4 py-4">
            <img alt="Эталон Инвест" className="h-12 w-auto" src="/logo.png" />
          </IonListHeader>
          {MENU_ITEMS.map((item) => (
            <IonMenuToggle key={item.path} autoHide={false}>
              <IonItem
                className={cn(
                  " mx-2 rounded-lg",
                  location.pathname === item.path ? "selected" : "",
                )}
                detail={false}
                lines="none"
                routerDirection="none"
                routerLink={item.path}
              >
                <div className="flex gap-2 items-center">
                  <IonIcon aria-hidden slot="start" icon={item.icon} />
                  <IonLabel>{item.title}</IonLabel>
                </div>
              </IonItem>
            </IonMenuToggle>
          ))}
          <div className="mt-4 border-t border-slate-200 pt-2">
            <NotificationsPrompt className="mt-2" />
          </div>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export { AppMenu };
