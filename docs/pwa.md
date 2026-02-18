# PWA: документация по возможностям

В приложении реализованы пять блоков PWA: кэширование и Service Worker, офлайн-режим, обновление приложения, установка на устройство и push-уведомления.

---

## 1. Service Worker и кэширование

### Назначение

- Раздача статики (JS, CSS, HTML, иконки, шрифты) из кэша после первой загрузки.
- Работа приложения без интернета для уже открытых страниц.

### Конфигурация

- **Плагин:** `vite-plugin-pwa` в [vite.config.ts](../vite.config.ts).
- **Режим:** `strategies: "injectManifest"` — используется кастомный Service Worker.
- **Исходник SW:** [src/sw.ts](../src/sw.ts). Плагин подставляет манифест precache и собирает итоговый `dist/sw.js`.

### Как это работает

1. При сборке (`npm run build`) генерируется `dist/sw.js` с массивом `__WB_MANIFEST` (список файлов для precache).
2. В SW вызывается `precacheAndRoute(self.__WB_MANIFEST)` — файлы кэшируются и отдаются из кэша при запросе.
3. Регистрация SW выполняется через скрипт, который подставляет плагин (и через `useRegisterSW` в режиме `prompt`).

### Важные файлы

| Файл | Назначение |
|------|------------|
| [vite.config.ts](../vite.config.ts) | Настройки VitePWA: `filename`, `srcDir`, `strategies`, `registerType`, `workbox.globPatterns` |
| [src/sw.ts](../src/sw.ts) | Кастомный SW: precache + обработчики push и notificationclick |

### Проверка

После `npm run build` в `dist/` должны быть `sw.js` и (при первом запуске preview) регистрация SW. После первой загрузки приложения отключите сеть — интерфейс должен открываться из кэша.

---

## 2. Офлайн-режим и UI «Нет сети»

### Назначение

- Показывать пользователю, что соединения нет.
- При возврате сети — краткое сообщение «Соединение восстановлено».

### Реализация

- **Хук:** [src/shared/lib/hooks/use-online-status.ts](../src/shared/lib/hooks/use-online-status.ts) — подписка на `window` события `online` / `offline`, возвращает `isOnline`.
- **Компонент:** [src/shared/ui/offline-banner/OfflineBanner.tsx](../src/shared/ui/offline-banner/OfflineBanner.tsx):
  - при `!isOnline` — фиксированный баннер сверху с текстом «Нет подключения к интернету» (оранжевый фон);
  - при переходе из offline в online — зелёный баннер «Соединение восстановлено» на 3 секунды, затем скрытие.
- **Тексты:** [src/shared/config/texts.ts](../src/shared/config/texts.ts) — ключи `offline_message`, `back_online_message`.
- **Размещение:** компонент подключён в [src/app/AppShell.tsx](../src/app/AppShell.tsx).

### Использование

Компонент не требует пропсов. Для отображения только статуса в других местах можно использовать хук:

```ts
import { useOnlineStatus } from "@/shared/lib/hooks";

const { isOnline } = useOnlineStatus();
```

---

## 3. Обновление приложения (новая версия)

### Назначение

После деплоя новой версии пользователь видит предложение обновиться; по кнопке страница перезагружается и подхватывается новый Service Worker.

### Режим регистрации SW

В [vite.config.ts](../vite.config.ts) задано `registerType: "prompt"`: новый SW устанавливается, но не активируется до действия пользователя (кнопка «Обновить» или перезагрузка).

### Реализация

- **Хук:** `useRegisterSW` из `virtual:pwa-register/react` (предоставляется плагином).
- **Компонент:** [src/shared/ui/update-prompt/UpdatePrompt.tsx](../src/shared/ui/update-prompt/UpdatePrompt.tsx):
  - при появлении ожидающего обновления SW (`needRefresh`) показывается блок внизу экрана;
  - кнопка «Обновить» вызывает `updateServiceWorker()` (skipWaiting + перезагрузка);
  - кнопка «Закрыть» скрывает блок до следующего обновления.
- **Тексты:** в [texts.ts](../src/shared/config/texts.ts) — `update_available`, `update_reload`, `close`.
- **Типы:** объявление модуля `virtual:pwa-register/react` в [src/vite-env.d.ts](../src/vite-env.d.ts).
- **Размещение:** в [AppShell.tsx](../src/app/AppShell.tsx).

### Сценарий

1. Пользователь открывает приложение (работает старый SW).
2. На сервере выкладывается новый билд.
3. Браузер загружает новый SW в фоне и переводит его в состояние «waiting».
4. `useRegisterSW` получает событие и выставляет `needRefresh: true`.
5. Показывается блок «Доступна новая версия» с кнопкой «Обновить».
6. По клику вызывается `updateServiceWorker()` → активация нового SW и перезагрузка страницы.

---

## 4. Установка приложения (Add to Home Screen)

### Назначение

На поддерживаемых браузерах (Chrome/Edge на Android, десктоп) пользователь может установить PWA на главный экран через баннер в приложении.

### Реализация

- **Хук:** [src/shared/lib/hooks/use-install-prompt.ts](../src/shared/lib/hooks/use-install-prompt.ts):
  - сохраняет событие `beforeinstallprompt` в state;
  - возвращает `installPrompt`, `isInstallable`, `isStandalone`, `install()`;
  - не считает приложение «устанавливаемым», если уже запущено в standalone (или iOS `navigator.standalone`).
- **Компонент:** [src/shared/ui/install-prompt-banner/InstallPromptBanner.tsx](../src/shared/ui/install-prompt-banner/InstallPromptBanner.tsx):
  - показ только при `isInstallable && !isStandalone && !dismissed`;
  - при закрытии баннера значение `pwa-install-banner-dismissed` пишется в `localStorage`, чтобы не показывать баннер снова;
  - кнопка «Установить приложение» вызывает `install()` (нативный диалог установки).
- **Тексты:** `install_app`, `install_app_description`, `close` в [texts.ts](../src/shared/config/texts.ts).
- **Типы:** `BeforeInstallPromptEvent` и расширение `WindowEventMap` в [vite-env.d.ts](../src/vite-env.d.ts).
- **Размещение:** баннер в [AppShell.tsx](../src/app/AppShell.tsx) (нижняя часть экрана).

### Ограничения

- Событие `beforeinstallprompt` не поддерживается в iOS Safari; там установка только через «Поделиться» → «На экран Домой».
- В standalone-режиме баннер не показывается.

---

## 5. Push-уведомления

### Назначение

- Подписка пользователя на push через Web Push API.
- В кастомном SW — приём push-событий и показ уведомлений, обработка клика по уведомлению (фокус/открытие окна).

### Конфигурация

- **VAPID:** публичный ключ задаётся в `.env`:
  - переменная: `VITE_VAPID_PUBLIC_KEY`;
  - генерация пары: `npx web-push generate-vapid-keys`;
  - в репозитории хранить только публичный ключ; приватный — на сервере для отправки push.
- **Конфиг в приложении:** [src/shared/config/push.ts](../src/shared/config/push.ts) экспортирует `VAPID_PUBLIC_KEY` из `import.meta.env.VITE_VAPID_PUBLIC_KEY`.

### Service Worker (push и клик)

В [src/sw.ts](../src/sw.ts):

- **push:** при получении события читается `event.data.json()`. Ожидаемые поля: `title`, `body`, `tag`. Вызывается `self.registration.showNotification(title, options)`.
- **notificationclick:** закрытие уведомления, поиск открытого окна приложения или открытие `self.location.origin + "/"`.

Формат payload для отправки с сервера (пример):

```json
{
  "title": "Заголовок",
  "body": "Текст уведомления",
  "tag": "optional-tag"
}
```

### Клиентская подписка

- **Хук:** [src/shared/lib/hooks/use-push-subscription.ts](../src/shared/lib/hooks/use-push-subscription.ts):
  - проверка поддержки: Service Worker, PushManager, Notification, наличие `VAPID_PUBLIC_KEY`;
  - запрос разрешения через `Notification.requestPermission()`;
  - подписка: `registration.pushManager.subscribe({ applicationServerKey, userVisibleOnly: true })`;
  - возвращает `isSupported`, `permission`, `subscription`, `subscribe()`, `error`.
- **Компонент:** [src/shared/ui/notifications-prompt/NotificationsPrompt.tsx](../src/shared/ui/notifications-prompt/NotificationsPrompt.tsx):
  - при неподдерживаемом окружении — текст «Уведомления не поддерживаются в этом браузере»;
  - при отказе в разрешении — «Уведомления отключены»;
  - при уже выданном разрешении/подписке — «Уведомления включены»;
  - иначе — кнопка «Включить уведомления», по нажатию вызывается `subscribe()`.
- **Тексты:** `notifications_enable`, `notifications_disabled`, `notifications_enabled`, `notifications_not_supported` в [texts.ts](../src/shared/config/texts.ts).
- **Размещение:** блок с «Включить уведомления» в боковом меню [AppMenu.tsx](../src/widgets/app-menu/AppMenu.tsx).

### Отправка push с бэкенда

Текущая реализация — только клиент: подписка и показ уведомлений в SW. Чтобы реально отправлять push:

1. На сервере (Node.js, Strapi и т.п.) использовать библиотеку `web-push` (или аналог).
2. Сохранять подписку (объект `PushSubscription`: endpoint, keys) после вызова `subscribe()` на клиенте (отправка на свой API).
3. При необходимости отправить уведомление — вызывать API Web Push с приватным VAPID и сохранённой подпиской.

Без `VITE_VAPID_PUBLIC_KEY` в `.env` хук считает push неподдерживаемым и компонент показывает «Уведомления не поддерживаются».

---

## Сводка файлов

| Фича | Основные файлы |
|------|----------------|
| SW и кэш | [vite.config.ts](../vite.config.ts), [src/sw.ts](../src/sw.ts) |
| Офлайн UI | [use-online-status.ts](../src/shared/lib/hooks/use-online-status.ts), [OfflineBanner](../src/shared/ui/offline-banner/OfflineBanner.tsx), [texts.ts](../src/shared/config/texts.ts) |
| Обновление | [UpdatePrompt.tsx](../src/shared/ui/update-prompt/UpdatePrompt.tsx), [vite-env.d.ts](../src/vite-env.d.ts) (virtual module) |
| Установка | [use-install-prompt.ts](../src/shared/lib/hooks/use-install-prompt.ts), [InstallPromptBanner.tsx](../src/shared/ui/install-prompt-banner/InstallPromptBanner.tsx), [vite-env.d.ts](../src/vite-env.d.ts) (BeforeInstallPromptEvent) |
| Push | [src/sw.ts](../src/sw.ts) (push/notificationclick), [push.ts](../src/shared/config/push.ts), [use-push-subscription.ts](../src/shared/lib/hooks/use-push-subscription.ts), [NotificationsPrompt.tsx](../src/shared/ui/notifications-prompt/NotificationsPrompt.tsx) |

Общие точки подключения в приложении: [AppShell.tsx](../src/app/AppShell.tsx) (баннеры, UpdatePrompt), [AppMenu.tsx](../src/widgets/app-menu/AppMenu.tsx) (NotificationsPrompt).
