# Home Build (Эталон Инвест)

Мобильное и веб-приложение компании по недвижимости: каталог жилых комплексов, новости, видеоблог, контакты и информация о компании.

---

## Содержание

- [Стек и окружение](#стек-и-окружение)
- [Страницы и маршруты](#страницы-и-маршруты)
- [Функциональность по разделам](#функциональность-по-разделам)
- [PWA и офлайн](#pwa-и-офлайн)
- [Нативный запуск (Capacitor)](#нативный-запуск-capacitor)
- [Запуск и сборка](#запуск-и-сборка)
- [Конфигурация](#конфигурация)
- [Структура проекта](#структура-проекта)

---

## Стек и окружение

| Категория | Технологии |
|-----------|------------|
| **UI** | React 19, Ionic React, Tailwind CSS 4, class-variance-authority, Radix-подход |
| **Формы и валидация** | React Hook Form, Zod (@hookform/resolvers) |
| **Данные** | TanStack React Query (с персистентным кэшем), axios |
| **Бэкенд** | Strapi CMS (REST API) |
| **Сборка** | Vite 5, TypeScript 5.9 |
| **PWA** | vite-plugin-pwa, Workbox (injectManifest), кастомный Service Worker |
| **Мобильные платформы** | Capacitor 8 (Android, iOS) |
| **Аналитика** | Vercel Analytics, Vercel Speed Insights |

---

## Страницы и маршруты

| Путь | Страница | Описание |
|------|----------|----------|
| `/` | Главная | Слайдер, каталог, новости, видео, форма обратной связи |
| `/catalog` | Каталог | Сетка карточек жилых комплексов |
| `/catalog/:id` | Карточка комплекса | Фото, описание, адрес, цена |
| `/news` | Новости | Сетка карточек новостей |
| `/news/:id` | Новость | Полный текст с блоками Strapi (BlocksRenderer) |
| `/videos` | Видеоблог | Сетка видео, открытие в модальном окне |
| `/about` | О нас | Офис, адрес, телефоны, соцсети, команда |

Навигация: боковое меню (IonMenu), хедер с кнопкой меню.

---

## Функциональность по разделам

### Главная

- **Hero-слайдер** — баннеры из Strapi (Main Slider), автопрокрутка, пагинация, навигация (Swiper).
- **Блок жилых комплексов** — горизонтальный свайпер карточек с переходом в каталог.
- **Блок новостей** — превью последних новостей со ссылками на раздел и детальные страницы.
- **Видеосекция** — превью видеоблога со ссылкой на `/videos`.
- **Форма обратной связи** — имя, телефон, валидация (Zod), ссылка «позвонить»; отправка пока заглушка (TODO).

### Каталог

- Список жилых комплексов с API Strapi (`residential-complexes`).
- Карточка: изображение, название, описание, адрес, цена «от».
- Состояния: загрузка (LoadingState), ошибка с повтором (ErrorState).

### Новости

- Список новостей из Strapi с пагинацией/лимитом.
- Детальная страница: изображение, заголовок, описание, контент через `@strapi/blocks-react-renderer`, дата публикации.

### Видеоблог

- Сетка видео из Strapi (`video-blogs`).
- Клик по карточке открывает модальное окно (VideoModal) с просмотром видео.

### О нас

- Данные из Strapi: офис (about), сотрудники (employees), соцсети (social-networks).
- Блок: фото офиса, адрес, телефоны с подписями, описание.
- Иконки соцсетей и ссылки (через `getSocialIcon`).
- Команда: горизонтальный свайпер карточек сотрудников (TeamMemberCard).

### Общие UI-фишки

- **Pull-to-refresh** — на главной, каталоге, новостях, видеоблоге, «О нас» (PageWithRefresher).
- **FAB связи** — плавающая кнопка (CallFab): звонок и WhatsApp (настраиваемые номера).
- **Боковое меню** — пункты навигации + блок «Включить уведомления» (NotificationsPrompt).

---

## PWA и офлайн

Подробное описание — в [docs/pwa.md](docs/pwa.md).

| Фича | Кратко |
|------|--------|
| **Service Worker и кэш** | Кастомный SW ([src/sw.ts](src/sw.ts)), precache статики и маршрутов через Workbox. После первой загрузки приложение открывается из кэша. |
| **Офлайн-режим** | Баннер «Нет подключения к интернету» (OfflineBanner). При восстановлении сети — «Соединение восстановлено» на 3 сек. |
| **Обновление приложения** | Режим `registerType: "prompt"`. При новой версии можно показать блок «Доступна новая версия» и кнопку «Обновить» (UpdatePrompt; в AppShell закомментирован). |
| **Установка на устройство** | Баннер «Установить приложение» (InstallPromptBanner, BeforeInstallPromptEvent). В AppShell закомментирован. Скрытие через localStorage. |
| **Push-уведомления** | Подписка через Web Push API (хук usePushSubscription), VAPID-ключ в `.env`. В SW — приём push и показ уведомлений, обработка клика (фокус/открытие приложения). Блок в боковом меню (NotificationsPrompt). |

Тексты интерфейса PWA и общие строки — в [src/shared/config/texts.ts](src/shared/config/texts.ts).

---

## Нативный запуск (Capacitor)

Проект настроен под сборку под Android и iOS:

- `npm run build` — веб-сборка.
- `npm run build:all` — сборка + `cap copy` + `cap sync`.
- `npm run android` — запуск на Android.
- `npm run ios` — запуск на iOS.

Используются плагины: App, Geolocation, Haptics, Keyboard, Status Bar.

---

## Запуск и сборка

```bash
# Разработка (с хостом для доступа с телефона)
npm run dev

# Сборка и проверка типов
npm run build

# Превью собранной версии
npm run preview

# Юнит-тесты
npm run test.unit

# E2E (Cypress)
npm run test.e2e

# Линт
npm run lint
```

---

## Конфигурация

### Переменные окружения (.env)

| Переменная | Назначение |
|------------|------------|
| `VITE_STRAPI_API_URL` | URL API Strapi (по умолчанию `http://localhost:1337/api`) |
| `VITE_STRAPI_API_TOKEN` | Токен для защищённых эндпоинтов Strapi |
| `VITE_VAPID_PUBLIC_KEY` | Публичный VAPID-ключ для Web Push (без него push «не поддерживается») |

### API

- Базовый слой: [src/shared/config/api.ts](src/shared/config/api.ts) — `getApiUrl`, `getApiHeaders`, `API_ENDPOINTS`.
- Эндпоинты: about, employees, main-slider, news, residential-complexes, social-networks, video-blog. Хуки в `shared/lib/hooks` используют TanStack Query и при необходимости персистентный кэш.

---

## Структура проекта

Приложение организовано по **Feature-Sliced Design** (FSD):

- **app** — оболочка (AppShell, роутинг, провайдеры).
- **pages** — страницы маршрутов: home, catalog, news, videoblog, about.
- **widgets** — крупные блоки: app-header, app-menu, call-fab, contact-form, hero-swiper, complexes-swiper, home-news-section, video-section.
- **features** — (при появлении) сценарии и фичи.
- **entities** — (при появлении) сущности домена.
- **shared** — ui (компоненты), lib (хуки, утилиты, cn), api, config, model, data.

Используются barrel-файлы (`index.ts`) в lib, config, ui, model — импорт только через них. Стили: Tailwind с кастомными цветами из [tailwindColors.ts](src/shared/config/tailwindColors.ts) и HSL-переменными. Тексты выводятся через общий объект `TEXTS` (ключи snake_case); полноценная i18n может быть добавлена поверх.

---

## Документация

- [PWA: кэш, офлайн, обновление, установка, push](docs/pwa.md)
