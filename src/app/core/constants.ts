export const APP_NAME = 'Mi Sitio Web';

export const ROUTES = {
  HOME: '/home',
  ABOUT: '/about',
  LOGIN: '/login',
  DEFAULT: '/home'
} as const;

export const AUTH = {
  DEMO_EMAIL: 'test@example.com',
  DEMO_PASSWORD: 'password123',
  TOKEN_KEY: 'auth_token',
  USER_KEY: 'auth_user',
  TOKEN_EXPIRY_MS: 3600000
} as const;

export const API = {
  TIMEOUT_MS: 30000,
  RETRY_ATTEMPTS: 3
} as const;

export const UI = {
  TOAST_DURATION_MS: 3000,
  DEBOUNCE_MS: 300,
  ANIMATION_DURATION_MS: 200
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50]
} as const;
