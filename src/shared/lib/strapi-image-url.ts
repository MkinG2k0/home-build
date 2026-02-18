const STRAPI_API_URL =
  import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337/api";

/**
 * Получает базовый URL Strapi без пути /api
 */
const getStrapiBaseUrl = (): string => {
  const apiUrl = STRAPI_API_URL.replace(/\/api$/, "");
  return apiUrl;
};

/**
 * Преобразует относительный URL изображения в полный URL
 * @param url - Относительный или абсолютный URL изображения
 * @returns Полный URL изображения
 */
export const getStrapiImageUrl = (url: string | null | undefined): string => {
  if (!url) return "";
  
  // Если URL уже полный (начинается с http:// или https://), возвращаем как есть
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  
  // Если URL относительный, добавляем базовый URL Strapi
  const baseUrl = getStrapiBaseUrl();
  const cleanUrl = url.startsWith("/") ? url : `/${url}`;
  return `${baseUrl}${cleanUrl}`;
};
