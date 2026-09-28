import { API_BASE_URL } from "./apiUrl";

export const apiRequest = async (path, options = {}) => {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`, options);
  } catch {
    throw new Error("Unable to reach the API. Check the backend deployment and VITE_API_URL.");
  }

  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || `API request failed (HTTP ${response.status}).`);
  }

  if (!data) {
    throw new Error(`The API returned an invalid response (HTTP ${response.status}).`);
  }

  return data;
};