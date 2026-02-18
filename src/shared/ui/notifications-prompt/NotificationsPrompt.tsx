import { IonIcon } from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import * as React from "react";

import { TEXTS } from "../../config";
import { cn } from "../../lib";
import { usePushSubscription } from "../../lib/hooks/use-push-subscription";

export interface NotificationsPromptProps {
  className?: string;
}

export const NotificationsPrompt: React.FC<NotificationsPromptProps> = ({
  className,
}) => {
  const {
    error,
    isSupported,
    permission,
    subscribe,
    subscription,
  } = usePushSubscription();
  const [loading, setLoading] = React.useState(false);

  const handleSubscribe = React.useCallback(async () => {
    setLoading(true);
    try {
      await subscribe();
    } finally {
      setLoading(false);
    }
  }, [subscribe]);

  if (!isSupported) {
    return (
      <div
        className={cn("px-4 py-2 text-sm text-slate-500", className)}
        role="status"
      >
        {TEXTS.notifications_not_supported}
      </div>
    );
  }

  if (permission === "denied") {
    return (
      <div
        className={cn("px-4 py-2 text-sm text-slate-500", className)}
        role="status"
      >
        {TEXTS.notifications_disabled}
      </div>
    );
  }

  if (subscription || permission === "granted") {
    return (
      <div
        className={cn("px-4 py-2 text-sm text-slate-600", className)}
        role="status"
      >
        {TEXTS.notifications_enabled}
      </div>
    );
  }

  return (
    <div className={cn("px-2", className)}>
      <button
        type="button"
        onClick={handleSubscribe}
        disabled={loading}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700",
          "hover:bg-slate-100 active:bg-slate-200 disabled:opacity-50",
        )}
      >
        <IonIcon icon={notificationsOutline} />
        <span>{TEXTS.notifications_enable}</span>
      </button>
      {error && (
        <p className="mt-1 px-3 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
