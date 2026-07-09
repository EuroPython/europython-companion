export const CONFERENCE_YEARS = [2026, 2025, 2024, 2023, 2022];
export const DEFAULT_CONFERENCE_YEAR = Math.max(...CONFERENCE_YEARS);

export type ConferenceMeta = {
  title: string;
  subtitle: string;
  timeZone: string;
  /**
   * Best-effort room display order for that year's schedule. Matched by exact
   * name (case-insensitive) against incoming room names; unmatched rooms fall
   * back to the default (alphabetical) order after the preferred ones. Safe
   * to leave empty or to list names that no longer match.
   */
  preferredRoomOrder?: string[];
};

export const CONFERENCE_META: Record<number, ConferenceMeta> = {
  2026: {
    title: "EuroPython 2026",
    subtitle: "Kraków · July 13-19",
    timeZone: "Europe/Warsaw",
  },
  2025: {
    title: "EuroPython 2025",
    subtitle: "Prague · July 14-20",
    timeZone: "Europe/Prague",
  },
  2024: {
    title: "EuroPython 2024",
    subtitle: "Prague · July 8-14",
    timeZone: "Europe/Prague",
  },
  2023: {
    title: "EuroPython 2023",
    subtitle: "Prague · July 17-23",
    timeZone: "Europe/Prague",
  },
  2022: {
    title: "EuroPython 2022",
    subtitle: "Dublin · July 11-17",
    timeZone: "Europe/Dublin",
  },
};

export const getConferenceMeta = (year: number) => CONFERENCE_META[year]!;

export const getPreferredRoomOrder = (year: number) =>
  CONFERENCE_META[year]?.preferredRoomOrder ?? [];

export const API_BASE = "https://static.europython.eu/programme";
export const SCHEMA_VERSION = 3;
export const WIFI_INFO_URL = "https://ep2026.europython.eu/17b6ec54daf5cb58-wifi.json";
