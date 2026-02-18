import * as React from "react";

function getIsStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as { standalone?: boolean };
  return (
    window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true
  );
}

export function useInstallPrompt(): {
  install: () => Promise<void>;
  installPrompt: BeforeInstallPromptEvent | null;
  isInstallable: boolean;
  isStandalone: boolean;
} {
  const [installPrompt, setInstallPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = React.useState(getIsStandalone);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const checkStandalone = () => setIsStandalone(getIsStandalone());
    mediaQuery.addEventListener("change", checkStandalone);

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);
    setIsStandalone(getIsStandalone());

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
      mediaQuery.removeEventListener("change", checkStandalone);
    };
  }, []);

  const install = React.useCallback(async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
  }, [installPrompt]);

  return {
    install,
    installPrompt,
    isInstallable: installPrompt !== null,
    isStandalone,
  };
}
