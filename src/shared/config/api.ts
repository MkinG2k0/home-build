const STRAPI_API_URL =
  import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337/api";

const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || "";

export const getApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${STRAPI_API_URL}/${cleanEndpoint}`;
};

export const getApiHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  return headers;
};

export const API_ENDPOINTS = {
  residentialComplexes: "residential-complexes",
  videoBlogs: "video-blogs",
} as const;
