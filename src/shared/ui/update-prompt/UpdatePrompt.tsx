import * as React from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

import { TEXTS } from "../../config";
import { cn } from "../../lib";

export const UpdatePrompt: React.FC = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const handleReload = React.useCallback(() => {
    updateServiceWorker(true);
  }, [updateServiceWorker]);

  const handleClose = React.useCallback(() => {
    setNeedRefresh(false);
  }, [setNeedRefresh]);

  if (!needRefresh) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 z-[100] flex flex-col gap-3 rounded-xl bg-slate-800 p-4 text-white shadow-lg sm:left-auto sm:right-4 sm:max-w-sm",
      )}
      role="dialog"
      aria-labelledby="update-prompt-title"
    >
      <p id="update-prompt-title" className="text-sm font-medium">
        {TEXTS.update_available}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleReload}
          className={cn(
            "flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium",
            "hover:bg-blue-700 active:bg-blue-800",
          )}
        >
          {TEXTS.update_reload}
        </button>
        <button
          type="button"
          onClick={handleClose}
          className={cn(
            "rounded-lg border border-slate-500 px-3 py-2 text-sm font-medium",
            "hover:bg-slate-700 active:bg-slate-600",
          )}
        >
          {TEXTS.close}
        </button>
      </div>
    </div>
  );
};
