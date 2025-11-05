const apiBaseUrl = (typeof globalThis !== 'undefined' && (globalThis as any).__env?.API_BASE_URL) || 'http://localhost:3001';

export const environment = {
  production: true,
  apiBaseUrl
};
