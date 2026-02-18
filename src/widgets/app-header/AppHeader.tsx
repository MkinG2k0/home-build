import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { notificationsOutline, personCircleOutline } from "ionicons/icons";
import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { MENU_ITEMS } from "../app-menu";
import { cn } from "../../shared/lib";

export interface AppHeaderProps {
  className?: string;
}

const AppHeader = React.forwardRef<HTMLIonHeaderElement, AppHeaderProps>(
  ({ className }, ref) => {
    const history = useHistory();
    const location = useLocation();

    const handleLogoClick = React.useCallback(() => {
      if (location.pathname !== "/") {
        history.push("/");
      }
      const mainElement = document.querySelector(".main-scroll");
      if (mainElement) {
        mainElement.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, [history, location.pathname]);

    return (
      <IonHeader className={cn("shadow-none!   ", className)} ref={ref}>
        <IonToolbar className="min-h-[56px] px-2">
          <IonButtons slot="start">
            <IonMenuButton
              autoHide={false}
              className="text-slate-700 lg:hidden"
            />
            <img
              alt="Эталон Инвест"
              className="hidden h-14 w-auto cursor-pointer lg:block"
              onClick={handleLogoClick}
              src="/logo.png"
            />
          </IonButtons>
          <div className="flex flex-1 justify-center">
            <IonTitle className="flex items-center justify-center lg:hidden">
              <img
                alt="Эталон Инвест"
                className="h-14 w-auto cursor-pointer"
                onClick={handleLogoClick}
                src="/logo.png"
              />
            </IonTitle>
            <nav
              aria-label="Основная навигация"
              className="hidden items-center gap-1 lg:flex"
            >
              {MENU_ITEMS.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (location.pathname !== "/" &&
                    item.path !== "/" &&
                    location.pathname.startsWith(item.path + "/"));

                return (
                  <IonRouterLink
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    )}
                    key={item.path}
                    routerLink={item.path}
                  >
                    {item.title}
                  </IonRouterLink>
                );
              })}
            </nav>
          </div>
          <IonButtons slot="end" className="gap-2">
            <IonButton type="button" aria-label="Уведомления">
              <IonIcon
                icon={notificationsOutline}
                className="text-3xl text-slate-600"
              />
            </IonButton>
            <IonButton type="button" aria-label="Профиль">
              <IonIcon
                icon={personCircleOutline}
                className="text-3xl text-slate-600"
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    );
  },
);

AppHeader.displayName = "AppHeader";

export { AppHeader };
