import * as React from "react";

import { VAPID_PUBLIC_KEY } from "../../config";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    output[i] = rawData.charCodeAt(i);
  }
  return output;
}

export type PushPermissionState = "default" | "granted" | "denied" | "unsupported";

export interface UsePushSubscriptionResult {
  error: string | null;
  isSupported: boolean;
  permission: PushPermissionState;
  subscribe: () => Promise<PushSubscription | null>;
  subscription: PushSubscription | null;
}

export function usePushSubscription(): UsePushSubscriptionResult {
  const [permission, setPermission] = React.useState<PushPermissionState>("default");
  const [subscription, setSubscription] = React.useState<PushSubscription | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const isSupported = React.useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window &&
      typeof VAPID_PUBLIC_KEY === "string" &&
      VAPID_PUBLIC_KEY.length > 0
    );
  }, []);

  React.useEffect(() => {
    if (!isSupported || !("Notification" in window)) return;
    setPermission(Notification.permission as PushPermissionState);
  }, [isSupported]);

  const subscribe = React.useCallback(async (): Promise<PushSubscription | null> => {
    setError(null);
    if (!isSupported) {
      setError("unsupported");
      return null;
    }
    try {
      const permissionResult = await Notification.requestPermission();
      setPermission(permissionResult as PushPermissionState);
      if (permissionResult !== "granted") return null;

      const registration = await navigator.serviceWorker.ready;
      const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY!);
      const sub = await registration.pushManager.subscribe({
        applicationServerKey: applicationServerKey.buffer as ArrayBuffer,
        userVisibleOnly: true,
      });
      setSubscription(sub);
      return sub;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      return null;
    }
  }, [isSupported]);

  return {
    error,
    isSupported,
    permission,
    subscribe,
    subscription,
  };
}
