import { useCallback, useState } from "react";
import { Alert } from "react-native";

import {
  addSessionToCalendar,
  getCalendarIdForYear,
  removeSessionFromCalendar,
  CALENDAR_PERMISSION_ERROR,
} from "@utils/calendar";
import { Session } from "@app-types/conference";
import { DEFAULT_NOTIFICATION_LEAD_MINUTES } from "@config/constants";
import { hapticLightImpact, hapticSuccess, hapticWarning } from "@utils/haptics";

type AddResult = { added: boolean; message: string; permissionDenied?: boolean };
type RemoveResult = { removed: boolean; message: string };
type BulkResult = { added: number; skipped: number; failed: number };

type SingleOptions = {
  leadMinutes?: number;
  onComplete?: (result: AddResult | RemoveResult) => void;
};

type BulkOptions = {
  leadMinutes?: number;
  onComplete?: (result: BulkResult) => void;
};

export function useCalendarSync() {
  const [busy, setBusy] = useState(false);

  const addSession = useCallback(
    async (
      session: Session,
      year: number,
      leadMinutes = DEFAULT_NOTIFICATION_LEAD_MINUTES,
    ): Promise<AddResult> => {
      const result = await addSessionToCalendar(session, year, undefined, leadMinutes);
      if (result.permissionDenied) {
        return result;
      }
      if (result.added) {
        hapticSuccess();
      } else {
        hapticWarning();
      }
      Alert.alert(
        result.added ? "Added to calendar" : "Unable to add to calendar",
        result.message,
      );
      return result;
    },
    [],
  );

  const removeSession = useCallback(
    async (session: Session, year: number): Promise<RemoveResult> => {
      const result = await removeSessionFromCalendar(session.id, year);
      if (result.removed) {
        hapticSuccess();
      } else {
        hapticWarning();
      }
      Alert.alert(
        result.removed ? "Removed from calendar" : "Unable to remove",
        result.message,
      );
      return result;
    },
    [],
  );

  const confirmAddSession = useCallback(
    (session: Session, year: number, opts?: SingleOptions) => {
      const lead = opts?.leadMinutes ?? DEFAULT_NOTIFICATION_LEAD_MINUTES;
      Alert.alert(
        "Add to calendar?",
        `We'll add this session to your calendar with a ${lead}-minute reminder.`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Add",
            onPress: async () => {
              hapticLightImpact();
              setBusy(true);
              try {
                const result = await addSession(session, year, lead);
                opts?.onComplete?.(result);
              } finally {
                setBusy(false);
              }
            },
          },
        ],
      );
    },
    [addSession],
  );

  const confirmRemoveSession = useCallback(
    (session: Session, year: number, opts?: SingleOptions) => {
      Alert.alert(
        "Remove from calendar?",
        "This will delete the event for this session.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: async () => {
              hapticLightImpact();
              setBusy(true);
              try {
                const result = await removeSession(session, year);
                opts?.onComplete?.(result);
              } finally {
                setBusy(false);
              }
            },
          },
        ],
      );
    },
    [removeSession],
  );

  const confirmAddAllSessions = useCallback(
    (sessions: Session[], year: number, opts?: BulkOptions) => {
      if (sessions.length === 0) {
        Alert.alert("No favourites to add");
        return;
      }
      const lead = opts?.leadMinutes ?? DEFAULT_NOTIFICATION_LEAD_MINUTES;
      Alert.alert(
        "Add all favourites?",
        `We'll add all starred sessions to your calendar with a ${lead}-minute reminder.`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Add",
            onPress: async () => {
              hapticLightImpact();
              setBusy(true);
              let calendarId: string | null = null;
              try {
                calendarId = await getCalendarIdForYear(year);
              } catch (err) {
                const message =
                  err instanceof Error ? err.message : "Could not access calendar.";
                if (message !== CALENDAR_PERMISSION_ERROR) {
                  hapticWarning();
                  Alert.alert("Calendar unavailable", message);
                }
                setBusy(false);
                return;
              }

              let added = 0;
              let skipped = 0;
              let failed = 0;
              for (const session of sessions) {
                const result = await addSessionToCalendar(
                  session,
                  year,
                  calendarId ?? undefined,
                  lead,
                );
                if (result.added) {
                  added += 1;
                } else if (result.message?.includes("already")) {
                  skipped += 1;
                } else {
                  failed += 1;
                }
              }

              if (added > 0) {
                hapticSuccess();
              } else {
                hapticWarning();
              }

              Alert.alert(
                "Calendar sync",
                `Added: ${added}\nSkipped (already added): ${skipped}\nFailed: ${failed}`,
              );
              opts?.onComplete?.({ added, skipped, failed });
              setBusy(false);
            },
          },
        ],
      );
    },
    [],
  );

  return {
    busy,
    confirmAddSession,
    confirmRemoveSession,
    confirmAddAllSessions,
  };
}
