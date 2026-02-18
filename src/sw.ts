/// <reference lib="webworker" />

import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("push", (event: PushEvent) => {
  if (!event.data) return;
  const data = event.data.json() as { title?: string; body?: string; tag?: string };
  const title = data?.title ?? "Уведомление";
  const options: NotificationOptions = {
    body: data?.body,
    tag: data?.tag,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close();
  const urlToOpen = self.location.origin + "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const client = clientList.find((c) => c.url === urlToOpen || "focus" in c);
        if (client) return client.focus();
        if (self.clients.openWindow) return self.clients.openWindow(urlToOpen);
      }),
  );
});
