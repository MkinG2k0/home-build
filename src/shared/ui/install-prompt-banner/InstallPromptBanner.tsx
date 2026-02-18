import * as React from "react";

import { TEXTS } from "../../config";
import { cn } from "../../lib";
import { useInstallPrompt } from "../../lib/hooks/use-install-prompt";

const DISMISS_KEY = "pwa-install-banner-dismissed";

export const InstallPromptBanner: React.FC = () => {
  const { install, isInstallable, isStandalone } = useInstallPrompt();
  const [dismissed, setDismissed] = React.useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(DISMISS_KEY) === "1";
  });

  const handleDismiss = React.useCallback(() => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DISMISS_KEY, "1");
    }
  }, []);

  const handleInstall = React.useCallback(() => {
    install();
    handleDismiss();
  }, [install, handleDismiss]);

  const visible = isInstallable && !isStandalone && !dismissed;
  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 z-[90] flex flex-col gap-3 rounded-xl bg-slate-800 p-4 text-white shadow-lg sm:left-auto sm:right-4 sm:max-w-sm",
      )}
      role="dialog"
      aria-labelledby="install-banner-title"
    >
      <p id="install-banner-title" className="text-sm font-medium">
        {TEXTS.install_app_description}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleInstall}
          className={cn(
            "flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium",
            "hover:bg-blue-700 active:bg-blue-800",
          )}
        >
          {TEXTS.install_app}
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className={cn(
            "rounded-lg border border-slate-500 px-3 py-2 text-sm font-medium",
            "hover:bg-slate-700 active:bg-slate-600",
          )}
          aria-label={TEXTS.close}
        >
          {TEXTS.close}
        </button>
      </div>
    </div>
  );
};
