import { useEffect, useMemo, useRef } from "react";
import { RefreshControl, SectionList, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { ScheduleItem, Session } from "@app-types/conference";
import { spacing } from "@theme";
import SessionListItem from "./SessionListItem";
import { useFavorites } from "@store/favorites";
import { hapticLightImpact, hapticSelection } from "@utils/haptics";
import {
  compareSessionsByStart,
  groupBySessionStartLabel,
  isBreak,
} from "@utils/schedule";
import useSpeakerAvatars from "@hooks/useSpeakerAvatars";
import BreakListItem from "./BreakListItem";
import StateMessage from "../status/StateMessage";

type Props = {
  sessions: ScheduleItem[];
  onSelect: (id: string) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  emptyMessage?: string;
  onToggleFavorite?: (id: string) => void;
  timeZone?: string;
};

export default function SessionList({
  sessions,
  onSelect,
  refreshing = false,
  onRefresh,
  emptyMessage = "No sessions to show.",
  onToggleFavorite,
  timeZone,
}: Props) {
  const { colors } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const wasRefreshing = useRef(refreshing);
  const speakerAvatars = useSpeakerAvatars();

  const sections = useMemo(() => {
    const sorted = [...sessions].sort(compareSessionsByStart);
    return groupBySessionStartLabel(sorted, timeZone);
  }, [sessions, timeZone]);

  useEffect(() => {
    if (!wasRefreshing.current && refreshing) {
      hapticSelection();
    } else if (wasRefreshing.current && !refreshing) {
      hapticLightImpact();
    }
    wasRefreshing.current = refreshing;
  }, [refreshing]);

  if (sessions.length === 0) {
    return <StateMessage title={emptyMessage} />;
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => (isBreak(item) ? item.id : (item.slotId ?? item.id))}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.listContent}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text variant="labelLarge" style={{ color: colors.onSurfaceVariant }}>
            {section.title}
          </Text>
        </View>
      )}
      renderItem={({ item }) =>
        isBreak(item) ? (
          <BreakListItem slot={item} timeZone={timeZone} />
        ) : (
          <SessionListItem
            session={item as Session}
            onPress={() => onSelect(item.id)}
            isFavorite={isFavorite(item.id)}
            timeZone={timeZone}
            speakerAvatars={speakerAvatars}
            onToggleFavorite={onToggleFavorite ?? toggleFavorite}
          />
        )
      }
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  sectionHeader: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  empty: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
});
