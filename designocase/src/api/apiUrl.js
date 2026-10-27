const configuredApiUrl =
  import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "") ||
  (import.meta.env.PROD
    ? "https://cutomize-mobile-cover-f42y.vercel.app"
    : "http://localhost:5000");

export const API_BASE_URL = configuredApiUrl.endsWith("/api")
  ? configuredApiUrl
  : `${configuredApiUrl}/api`;

export const API_ORIGIN = API_BASE_URL.replace(/\/api$/, "");