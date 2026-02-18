import * as React from "react";

import { TEXTS } from "../../config";
import { cn } from "../../lib";
import { useOnlineStatus } from "../../lib/hooks/use-online-status";

const BACK_ONLINE_DURATION_MS = 3000;

export const OfflineBanner: React.FC = () => {
  const { isOnline } = useOnlineStatus();
  const [showBackOnline, setShowBackOnline] = React.useState(false);
  const prevOnlineRef = React.useRef(isOnline);

  React.useEffect(() => {
    if (isOnline && !prevOnlineRef.current) {
      setShowBackOnline(true);
      const t = window.setTimeout(
        () => setShowBackOnline(false),
        BACK_ONLINE_DURATION_MS,
      );
      prevOnlineRef.current = true;
      return () => window.clearTimeout(t);
    }
    prevOnlineRef.current = isOnline;
  }, [isOnline]);

  if (isOnline && !showBackOnline) return null;

  return (
    <div
      className={cn(
        "fixed left-0 right-0 bottom-2 z-100 flex justify-center items-center text-center text-sm font-medium text-white",
      )}
      role="status"
    >
      <div
        className={cn(
          "px-4 py-2 rounded-lg",
          isOnline ? "bg-emerald-600" : "bg-amber-600",
        )}
      >
        {isOnline ? TEXTS.back_online_message : TEXTS.offline_message}
      </div>
    </div>
  );
};
