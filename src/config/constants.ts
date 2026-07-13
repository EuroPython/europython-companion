export const DEFAULT_NOTIFICATION_LEAD_MINUTES = 10;
export const NOTIFICATION_LEAD_OPTIONS = [5, 10, 15, 30] as const;
export const MAX_SCHEDULED_NOTIFICATIONS = 180;

export const MAX_DATE_ISO = new Date(8640000000000000).toISOString();
export const DATE_ISO_LOCALE = "en-CA"; // so it's YYYY-MM-DD

export const UPCOMING_REFRESH_INTERVAL_MS = 60_000;

export const DATA_REFRESH_INTERVAL_MS = 10 * 60_000;

export const FETCH_TIMEOUT_MS = 12_000;
