import { useEffect, useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

import ScreenContainer from "@components/layout/ScreenContainer";
import PaddedScrollView from "@components/layout/PaddedScrollView";
import DataBoundary from "@components/status/DataBoundary";
import { normalizeTrigger } from "@utils/notifications";
import { compareSessionsByStart, toSortableStartItem } from "@utils/schedule";
import { formatMinutesFromMs } from "@utils/format";
import { formatSessionStartLabel } from "@utils/time";
import { radius, spacing } from "@theme";

type ScheduledItem = {
  id: string;
  title: string;
  body?: string | null;
  triggerDate?: Date | null;
  relativeMs?: number | null;
};

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const [items, setItems] = useState<ScheduledItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      const now = Date.now();
      const mapped: ScheduledItem[] = scheduled.map((entry) => {
        const content = entry.content ?? {};
        const { date: triggerDate, relativeMs } = normalizeTrigger(
          entry.trigger as Notifications.NotificationTriggerInput,
        );
        return {
          id: entry.identifier,
          title: content.title ?? "Notification",
          body: content.body,
          triggerDate: triggerDate && !isNaN(triggerDate.getTime()) ? triggerDate : null,
          relativeMs,
        };
      });
      const sorted = [...mapped].sort((a, b) =>
        compareSessionsByStart(
          toSortableStartItem({
            title: a.title,
            triggerDate: a.triggerDate,
            relativeMs: a.relativeMs,
            now,
          }),
          toSortableStartItem({
            title: b.title,
            triggerDate: b.triggerDate,
            relativeMs: b.relativeMs,
            now,
          }),
        ),
      );
      setItems(sorted);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  return (
    <ScreenContainer title="Scheduled notifications">
      <PaddedScrollView contentContainerStyle={styles.content}>
        <DataBoundary
          loading={loading}
          loadingMessage="Loading…"
          isEmpty={items.length === 0}
          emptyMessage="No scheduled notifications."
        >
          {items.map((item) => (
            <Card key={item.id} mode="outlined" style={styles.card}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.title}>
                  {item.title}
                </Text>
                {item.body ? (
                  <Text
                    variant="bodySmall"
                    style={{ color: colors.onSurfaceVariant, marginBottom: spacing.xs }}
                  >
                    {item.body}
                  </Text>
                ) : null}
                {item.triggerDate ? (
                  <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                    Scheduled for{" "}
                    {formatSessionStartLabel(item.triggerDate.toISOString())}
                  </Text>
                ) : item.relativeMs ? (
                  <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                    Scheduled in ~{formatMinutesFromMs(item.relativeMs)} minutes
                  </Text>
                ) : (
                  <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                    Scheduled (time unavailable)
                  </Text>
                )}
              </Card.Content>
            </Card>
          ))}
        </DataBoundary>
      </PaddedScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  card: {
    borderRadius: radius.xl,
  },
  title: {
    marginBottom: spacing.xs / 2,
  },
});
