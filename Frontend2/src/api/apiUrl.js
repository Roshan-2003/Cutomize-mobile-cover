const configuredApiUrl =
  import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "") || "http://localhost:5000";

export const API_BASE_URL = configuredApiUrl.endsWith("/api")
  ? configuredApiUrl
  : `${configuredApiUrl}/api`;

export const API_ORIGIN = API_BASE_URL.replace(/\/api$/, "");