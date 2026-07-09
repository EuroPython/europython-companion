import { BreakSlot, ScheduleItem, Session } from "@app-types/conference";
import { MAX_DATE_ISO } from "@config/constants";
import { getPreferredRoomOrder } from "@config/conference";
import { formatSessionStartLabel } from "./time";

/**
 * Check whether a session type string represents a keynote.
 */
export const isKeynoteSessionType = (sessionType: string | null | undefined) =>
  (sessionType ?? "").toLowerCase().includes("keynote");

export function isBreak(item: ScheduleItem): item is BreakSlot {
  return (item as BreakSlot).eventType === "break";
}

export function isSession(item: ScheduleItem): item is Session {
  return (item as Session).eventType === "session";
}

/**
 * Comparator for sorting sessions (or schedule items) by start time, then room/title.
 */
export type SortableScheduleItem = Pick<ScheduleItem, "start" | "title"> & {
  room?: string | null;
  eventType?: "break" | "session";
};

/**
 * Rank a room by its position in a preferred order list (exact, case-insensitive
 * match). Unmatched rooms all share the lowest rank, so they fall back to
 * alphabetical ordering.
 */
function roomPreferenceRank(room: string, preferredRoomOrder: string[]) {
  const index = preferredRoomOrder.findIndex(
    (preferred) => preferred.toLowerCase() === room,
  );
  return index === -1 ? preferredRoomOrder.length : index;
}

export function compareSessionsByStart(
  a: SortableScheduleItem,
  b: SortableScheduleItem,
  preferredRoomOrder: string[] = [],
) {
  const startDiff = new Date(a.start).getTime() - new Date(b.start).getTime();
  if (startDiff !== 0) return startDiff;
  const aIsBreak = a.eventType === "break";
  const bIsBreak = b.eventType === "break";
  if (aIsBreak !== bIsBreak) return aIsBreak ? -1 : 1;
  const aRoom = aIsBreak ? "" : (a.room ?? "").toLowerCase();
  const bRoom = bIsBreak ? "" : (b.room ?? "").toLowerCase();
  if (aRoom !== bRoom) {
    const rankDiff =
      roomPreferenceRank(aRoom, preferredRoomOrder) -
      roomPreferenceRank(bRoom, preferredRoomOrder);
    return rankDiff !== 0 ? rankDiff : aRoom.localeCompare(bRoom);
  }
  return (a.title ?? "").localeCompare(b.title ?? "");
}

/**
 * Sort schedule items by start time, applying the conference year's preferred
 * room order as the tiebreaker.
 */
export function sortScheduleItems<T extends SortableScheduleItem>(
  items: T[],
  conferenceYear: number,
): T[] {
  const preferredRoomOrder = getPreferredRoomOrder(conferenceYear);
  return [...items].sort((a, b) => compareSessionsByStart(a, b, preferredRoomOrder));
}

/**
 * Group sorted schedule items by start label for SectionList rendering.
 */
export function groupBySessionStartLabel(items: ScheduleItem[], timeZone?: string) {
  const groups: { title: string; data: ScheduleItem[] }[] = [];
  items.forEach((item) => {
    const label = formatSessionStartLabel(item.start, timeZone);
    const last = groups[groups.length - 1];
    if (last && last.title === label) {
      last.data.push(item);
    } else {
      groups.push({ title: label, data: [item] });
    }
  });
  return groups;
}

type SortableStartInput = {
  title?: string | null;
  room?: string | null;
  eventType?: SortableScheduleItem["eventType"];
  start?: string | Date | number | null;
  triggerDate?: Date | null;
  relativeMs?: number | null;
  now?: number;
};

const normalizeIso = (value: string | Date | number | null | undefined) => {
  if (value == null) return null;
  if (value instanceof Date) {
    const ms = value.getTime();
    return Number.isNaN(ms) ? null : value.toISOString();
  }
  if (typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }
  if (typeof value === "string") {
    const ms = Date.parse(value);
    return Number.isNaN(ms) ? null : value;
  }
  return null;
};

/**
 * Convert loosely-typed inputs into a sortable shape for time-based lists.
 */
export function toSortableStartItem(input: SortableStartInput): SortableScheduleItem {
  const now = input.now ?? Date.now();
  const startCandidate =
    input.start ??
    input.triggerDate ??
    (typeof input.relativeMs === "number" ? now + input.relativeMs : null);
  const startIso = normalizeIso(startCandidate) ?? MAX_DATE_ISO;

  return {
    start: startIso,
    title: input.title ?? "",
    room: input.room ?? null,
    eventType: input.eventType,
  };
}
