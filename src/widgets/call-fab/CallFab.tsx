import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { call } from 'ionicons/icons';
import * as React from 'react';

import { cn } from '../../shared/lib';

export interface CallFabProps {
  className?: string;
  href?: string;
}

const CallFab = React.forwardRef<HTMLIonFabElement, CallFabProps>(
  ({ className, href = 'tel:+78001234567' }, ref) => (
    <IonFab className={cn(className)} ref={ref} slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton color="primary" href={href} aria-label="Позвонить">
        <IonIcon icon={call} />
      </IonFabButton>
    </IonFab>
  )
);

CallFab.displayName = 'CallFab';

export { CallFab };
