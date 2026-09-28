const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");

if (!configuredApiUrl) {
  throw new Error("VITE_API_URL must be configured in the Frontend2 root .env file.");
}

export const API_BASE_URL = configuredApiUrl.endsWith("/api")
  ? configuredApiUrl
  : `${configuredApiUrl}/api`;

export const API_ORIGIN = API_BASE_URL.replace(/\/api$/, "");