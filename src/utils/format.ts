import { Session } from "@app-types/conference";

/**
 * Return a user-friendly room label with a fallback.
 */
export const getRoomLabel = (session: Session) =>
  session.rooms.length > 1 ? "Plenary" : (session.room ?? session.rooms[0] ?? "Room TBA");

type TimeRangeInput = Pick<Session, "start" | "end">;

/**
 * Produce date and time labels for a session start/end in a time zone.
 */
export const formatSessionTimeRange = (session: TimeRangeInput, timeZone?: string) => {
  const start = new Date(session.start);
  const end = new Date(session.end);

  const datePart = start.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone,
  });
  const timePart = `${start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  })} - ${end.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  })}`;

  return { datePart, timePart };
};

/**
 * Build a subtitle string combining room, date, and time range.
 */
export const formatSessionSubtitle = (session: Session, timeZone?: string) => {
  const room = getRoomLabel(session);
  const { datePart, timePart } = formatSessionTimeRange(session, timeZone);
  return `${room} · ${datePart} · ${timePart}`;
};

/**
 * Format a relative milliseconds value as "Xd Yh Zm" (omitting zero units).
 */
export const formatDurationFromMs = (ms: number) => {
  const totalMinutes = Math.round(ms / 60_000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  const parts = [
    days && `${days}d`,
    hours && `${hours}h`,
    (minutes || (!days && !hours)) && `${minutes}m`,
  ].filter(Boolean);

  return parts.join(" ");
};

/**
 * Create initials from a name (up to two parts), defaulting to '?'.
 */
export const initialsFromName = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "?";
