/// <reference lib="webworker" />

import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

declare const self: ServiceWorkerGlobalScope;

// Немедленная активация Service Worker для всех клиентов
self.addEventListener("activate", (event: ExtendableEvent) => {
	event.waitUntil(self.clients.claim());
});

// Немедленная активация при установке
self.addEventListener("install", (event: ExtendableEvent) => {
	event.waitUntil(self.skipWaiting());
});

precacheAndRoute(self.__WB_MANIFEST);

// Кэширование изображений с стратегией CacheFirst
// Используем широкий паттерн для перехвата всех изображений, включая внешние домены
registerRoute(
	({ request, url }) => {
		// Пропускаем не-GET запросы
		if (request.method !== "GET") {
			return false;
		}
		
		// Проверяем destination (работает для большинства случаев)
		if (request.destination === "image") {
			return true;
		}
		
		// Проверяем расширение файла в пути
		if (/\.(jpg|jpeg|png|gif|webp|svg|ico|bmp|avif|tiff)$/i.test(url.pathname)) {
			return true;
		}
		
		// Проверяем путь на наличие типичных путей к изображениям Strapi
		if (/\/uploads\//i.test(url.pathname) || /\/media\//i.test(url.pathname)) {
			return true;
		}
		
		// Проверяем Accept header для изображений
		const acceptHeader = request.headers.get("accept");
		if (acceptHeader && acceptHeader.includes("image")) {
			return true;
		}
		
		return false;
	},
	new CacheFirst({
		cacheName: "images-cache",
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			new ExpirationPlugin({
				maxEntries: 500,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
				purgeOnQuotaError: true,
			}),
		],
		matchOptions: {
			ignoreSearch: false,
		},
	}),
);

// Кэширование API запросов с стратегией NetworkFirst для данных
registerRoute(
	({ url }) => url.pathname.startsWith("/api/"),
	new NetworkFirst({
		cacheName: "api-cache",
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			new ExpirationPlugin({
				maxEntries: 50,
				maxAgeSeconds: 24 * 60 * 60, // 1 день
			}),
		],
	}),
);


self.addEventListener("push", (event: PushEvent) => {
  if (!event.data) return;
  const data = event.data.json() as {
    title?: string;
    body?: string;
    tag?: string;
  };
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
        const client = clientList.find(
          (c) => c.url === urlToOpen || "focus" in c,
        );
        if (client) return client.focus();
        if (self.clients.openWindow) return self.clients.openWindow(urlToOpen);
      }),
  );
});
