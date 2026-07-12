import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

import { spacing } from "@theme";
import SessionListItem from "@components/schedule/SessionListItem";
import BreakListItem from "@components/schedule/BreakListItem";
import { ConferenceData, ScheduleItem } from "@app-types/conference";
import { UPCOMING_REFRESH_INTERVAL_MS } from "@config/constants";
import { useFavorites } from "@store/favorites";
import { useAppNavigation } from "@hooks/useAppNavigation";
import { isBreak, sortScheduleItems } from "@utils/schedule";
import { isUpcomingSession } from "@utils/time";
import useEffectiveTimeZone from "@hooks/useEffectiveTimeZone";
import useSpeakerAvatars from "@hooks/useSpeakerAvatars";

type Props = {
  data: ConferenceData | null;
  limit?: number;
  favoritesOnly?: boolean;
};

export default function UpcomingList({ data, limit = 4, favoritesOnly = false }: Props) {
  const { openSession, goToAgendaTab } = useAppNavigation();
  const { favorites, toggleFavorite } = useFavorites();
  const { timeZone, conferenceYear } = useEffectiveTimeZone();
  const { colors } = useTheme();
  const [now, setNow] = useState(() => Date.now());
  const speakerAvatars = useSpeakerAvatars();

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), UPCOMING_REFRESH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const items = useMemo(() => {
    if (!data) return [];
    const events: ScheduleItem[] = data.days.flatMap((day) => day.events ?? []);
    const filtered = events.filter((item) => {
      if (!isUpcomingSession(item.start, now)) return false;
      if (!favoritesOnly) return true;
      if (isBreak(item)) return true;
      return favorites.has(item.id);
    });
    return sortScheduleItems(filtered, conferenceYear).slice(0, limit);
  }, [data, favoritesOnly, favorites, limit, now, conferenceYear]);

  const header = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: -spacing.md,
        marginBottom: spacing.sm,
      }}
    >
      <Text variant="titleMedium">Coming up next</Text>
      <Button mode="text" compact onPress={goToAgendaTab}>
        Full agenda
      </Button>
    </View>
  );

  const helperNote = favoritesOnly && (
    <Text
      variant="bodySmall"
      style={{ color: colors.onSurfaceVariant, marginTop: spacing.xs }}
    >
      Star sessions in the schedule to see them here.
    </Text>
  );

  if (items.length === 0) {
    return (
      <Card mode="elevated" style={{ marginTop: spacing.xs }}>
        <Card.Content>
          {header}
          <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
            {favoritesOnly
              ? "No upcoming favourites."
              : "No upcoming sessions or breaks."}
          </Text>
          {helperNote}
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card mode="elevated" style={{ marginTop: spacing.xs }}>
      <Card.Content>
        {header}
        <View style={{ gap: spacing.sm }}>
          {items.map((item) =>
            isBreak(item) ? (
              <BreakListItem key={item.id} slot={item} timeZone={timeZone} />
            ) : (
              <SessionListItem
                key={item.slotId ?? item.id}
                session={item}
                isFavorite={favorites.has(item.id)}
                onPress={openSession}
                timeZone={timeZone}
                onToggleFavorite={toggleFavorite}
                speakerAvatars={speakerAvatars}
              />
            ),
          )}
        </View>
        {helperNote}
      </Card.Content>
    </Card>
  );
}
