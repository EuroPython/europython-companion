import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  CONFERENCE_YEARS,
  DEFAULT_CONFERENCE_YEAR,
  API_BASE,
  SCHEMA_VERSION,
} from "@config/conference";
import { DATA_REFRESH_INTERVAL_MS, FETCH_TIMEOUT_MS } from "@config/constants";
import { RawSessions, RawSpeakers, RawSchedule } from "@app-types/raw";
import { ConferenceData, Session, Speaker } from "@app-types/conference";

import { isConferenceData, isRecord } from "./guards";
import {
  buildDays,
  normalizeConferencePayload,
  normalizeSession,
  normalizeSpeaker,
} from "./conferenceTransform";

type CachedConferencePayload =
  | {
      data: ConferenceData;
      fetchedAt?: string | null;
    }
  | ConferenceData;

type LoadConferenceResult = {
  data: ConferenceData;
  fromCache: boolean;
  fetchedAt: string | null;
  resolvedYear: number;
};

function buildBaseUrl(year: number) {
  return `${API_BASE}/ep${year}/releases/current`;
}

const conferenceCacheKey = (year: number) =>
  `ep${year}:conferenceData:v${SCHEMA_VERSION}`;

// Purge cache keys from previous schema versions
async function purgeOldCacheKeys() {
  const keysToRemove: string[] = [];
  for (let v = SCHEMA_VERSION - 1; v >= 0; v--) {
    for (const year of CONFERENCE_YEARS) {
      keysToRemove.push(`ep${year}:conferenceData:v${v}`);
    }
  }
  await Promise.all(keysToRemove.map((key) => AsyncStorage.removeItem(key)));
}

// Purge cache keys for other years (except the default year) to save space
async function purgeOtherYearsCacheKeys(year: number) {
  await Promise.all(
    CONFERENCE_YEARS.filter((y) => y !== year && y !== DEFAULT_CONFERENCE_YEAR).map((y) =>
      AsyncStorage.removeItem(conferenceCacheKey(y)),
    ),
  );
}

async function fetchJson<T>(baseUrl: string, path: string): Promise<T> {
  const url = `${baseUrl}/${path}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function readCachedConferenceData(cacheKey: string): Promise<{
  data: ConferenceData;
  fetchedAt: string | null;
} | null> {
  const cached = await AsyncStorage.getItem(cacheKey);
  if (!cached) return null;
  try {
    const parsed = JSON.parse(cached) as unknown;
    const dataCandidate =
      isRecord(parsed) && "data" in parsed ? (parsed as { data?: unknown }).data : parsed;
    if (!isConferenceData(dataCandidate)) {
      await AsyncStorage.removeItem(cacheKey);
      return null;
    }
    const fetchedAtValue = isRecord(parsed)
      ? ((parsed as { fetchedAt?: unknown; fetched_at?: unknown }).fetchedAt ??
        (parsed as { fetchedAt?: unknown; fetched_at?: unknown }).fetched_at)
      : null;
    const fetchedAt = typeof fetchedAtValue === "string" ? fetchedAtValue : null;
    return { data: dataCandidate, fetchedAt };
  } catch {
    await AsyncStorage.removeItem(cacheKey);
    return null;
  }
}

/**
 * Read cached conference data (if any) without touching the network.
 * Used to seed the UI instantly on cold start while a background
 * refresh (loadConferenceDataWithMeta) revalidates.
 */
export async function loadCachedConferenceData(year: number) {
  return readCachedConferenceData(conferenceCacheKey(year));
}

async function loadFromNetwork(year: number): Promise<ConferenceData> {
  const baseUrl = buildBaseUrl(year);
  const [rawSessions, rawSpeakers, rawSchedule] = await Promise.all([
    fetchJson<RawSessions>(baseUrl, "sessions.json"),
    fetchJson<RawSpeakers>(baseUrl, "speakers.json"),
    fetchJson<RawSchedule>(baseUrl, "schedule.json"),
  ]);

  const {
    sessions: sessionsPayload,
    speakers: speakersPayload,
    schedule,
  } = normalizeConferencePayload(rawSessions, rawSpeakers, rawSchedule);

  const speakersById: Record<string, Speaker> = {};
  for (const [code, raw] of Object.entries(speakersPayload)) {
    speakersById[code] = normalizeSpeaker(raw);
  }

  let sessionsById: Record<string, Session> = {};
  for (const [code, raw] of Object.entries(sessionsPayload)) {
    sessionsById[code] = normalizeSession(raw, speakersById);
  }

  const built = buildDays(sessionsById, schedule);
  sessionsById = built.sessionsById;

  return {
    days: built.days,
    sessionsById,
    speakersById,
  };
}

/**
 * Load conference data with offline caching.
 * - If a fresh (< DATA_REFRESH_INTERVAL_MS) cached copy exists and forceRefresh
 *   isn't set, serve it without hitting the network.
 * - Otherwise try network first.
 * - If the network fails, fall back to any cached ConferenceData in AsyncStorage.
 */
export async function loadConferenceDataWithMeta(
  year: number,
  opts?: { forceRefresh?: boolean },
): Promise<LoadConferenceResult> {
  const cacheKey = conferenceCacheKey(year);
  const cached = await readCachedConferenceData(cacheKey);

  if (!opts?.forceRefresh && cached?.fetchedAt) {
    const age = Date.now() - Date.parse(cached.fetchedAt);
    if (age >= 0 && age < DATA_REFRESH_INTERVAL_MS) {
      return {
        data: cached.data,
        fromCache: false,
        fetchedAt: cached.fetchedAt,
        resolvedYear: year,
      };
    }
  }

  try {
    const data = await loadFromNetwork(year);
    const fetchedAt = new Date().toISOString();
    try {
      const payload = JSON.stringify({
        data,
        fetchedAt,
      } satisfies CachedConferencePayload);
      try {
        await AsyncStorage.setItem(cacheKey, payload);
      } catch {
        await Promise.all([purgeOldCacheKeys(), purgeOtherYearsCacheKeys(year)]);
        await AsyncStorage.setItem(cacheKey, payload);
      }
    } catch (cacheErr) {
      console.warn(
        `Failed to cache conference data for ${year}; offline fallback unavailable`,
        cacheErr,
      );
    }
    return {
      data,
      fromCache: false,
      fetchedAt,
      resolvedYear: year,
    };
  } catch (err) {
    if (cached) {
      return {
        data: cached.data,
        fromCache: true,
        fetchedAt: cached.fetchedAt,
        resolvedYear: year,
      };
    }
    throw err;
  }
}
