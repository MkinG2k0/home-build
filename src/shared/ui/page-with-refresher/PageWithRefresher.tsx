import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import * as React from "react";

import { cn } from "../../lib";

export interface RefresherEvent {
  detail: { complete(): void };
}

export interface PageWithRefresherProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  onRefresh?: (event: RefresherEvent) => void | Promise<void>;
}

const PageWithRefresher = React.forwardRef<
  HTMLIonPageElement,
  PageWithRefresherProps
>(function PageWithRefresher(
  { children, className, contentClassName, onRefresh },
  ref
) {
  const handleIonRefresh = React.useCallback(
    (event: CustomEvent<{ complete(): void }>) => {
      const result = onRefresh?.(event as unknown as RefresherEvent);
      if (result instanceof Promise) {
        result.finally(() => event.detail.complete());
      } else {
        event.detail.complete();
      }
    },
    [onRefresh]
  );

  return (
    <IonPage className={className} ref={ref}>
      <IonContent className={cn("ion-padding", contentClassName)}>
        {onRefresh && (
          <IonRefresher slot="fixed" onIonRefresh={handleIonRefresh}>
            <IonRefresherContent />
          </IonRefresher>
        )}
        {children}
      </IonContent>
    </IonPage>
  );
});

PageWithRefresher.displayName = "PageWithRefresher";

export { PageWithRefresher };
