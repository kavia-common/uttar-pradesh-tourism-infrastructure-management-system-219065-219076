const apiBaseUrl = (typeof globalThis !== 'undefined' && (globalThis as any).__env?.API_BASE_URL) || 'http://localhost:3001';

export const environment = {
  production: false,
  // Backend API base URL; can be overridden at runtime via window.__env if present
  apiBaseUrl
};
