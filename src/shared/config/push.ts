/**
 * VAPID public key for Web Push (optional).
 * Set VITE_VAPID_PUBLIC_KEY in .env. Do not commit the private key.
 * Generate with: npx web-push generate-vapid-keys
 */
export const VAPID_PUBLIC_KEY =
  typeof import.meta.env !== "undefined" &&
  typeof import.meta.env.VITE_VAPID_PUBLIC_KEY === "string"
    ? import.meta.env.VITE_VAPID_PUBLIC_KEY
    : undefined;
