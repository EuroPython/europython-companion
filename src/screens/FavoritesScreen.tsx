import { useMemo, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import ScreenContainer from "@components/layout/ScreenContainer";
import SessionList from "@components/schedule/SessionList";
import SessionTypeLegendDialog from "@components/schedule/SessionTypeLegendDialog";
import StateMessage from "@components/status/StateMessage";
import OfflineNotice from "@components/status/OfflineNotice";
import DataBoundary from "@components/status/DataBoundary";
import { Session } from "@app-types/conference";
import { spacing } from "@theme";
import { useConferenceData } from "@store/conferenceData";
import { useFavorites } from "@store/favorites";
import { useSettings } from "@store/settings";
import { useAppNavigation } from "@hooks/useAppNavigation";
import { useCalendarSync } from "@hooks/useCalendarSync";
import useEffectiveTimeZone from "@hooks/useEffectiveTimeZone";

export default function FavoritesScreen() {
  const { data, loading, refreshing, refreshIfStale, error } = useConferenceData();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const { notificationLeadMinutes } = useSettings();
  const { conferenceYear, timeZone } = useEffectiveTimeZone();
  const { openSession } = useAppNavigation();
  const { confirmAddAllSessions, busy: calendarBusy } = useCalendarSync();
  const [legendVisible, setLegendVisible] = useState(false);

  const sessionsForList: Session[] = useMemo(() => {
    if (!data) return [];
    const all = Object.values(data.sessionsById);
    return all.filter((s) => favorites.has(s.id));
  }, [data, favorites]);

  const handleAddAllToCalendar = useCallback(() => {
    if (!data) return;
    confirmAddAllSessions(sessionsForList, conferenceYear, {
      leadMinutes: notificationLeadMinutes,
    });
  }, [
    data,
    confirmAddAllSessions,
    sessionsForList,
    conferenceYear,
    notificationLeadMinutes,
  ]);

  const isEmpty = data && sessionsForList.length === 0;

  return (
    <ScreenContainer
      title="My agenda"
      infoButton={{
        onPress: () => setLegendVisible(true),
        accessibilityLabel: "Show session type legend",
      }}
    >
      <OfflineNotice />
      <DataBoundary
        loading={(loading || favoritesLoading) && !data}
        loadingMessage="Loading your agenda…"
        error={!data ? error : null}
        errorMessage="Unable to load agenda."
        isEmpty={!!isEmpty}
        renderEmpty={() => (
          <StateMessage
            title="You have not starred any sessions yet."
            subtitle="Browse the schedule and tap the star icon on a session to add it to your agenda."
          />
        )}
      >
        <View style={styles.actionsRow}>
          <Button
            mode="contained-tonal"
            icon="calendar-multiselect"
            onPress={handleAddAllToCalendar}
            loading={calendarBusy}
            disabled={calendarBusy}
          >
            Add all to calendar
          </Button>
        </View>
        <SessionList
          sessions={sessionsForList}
          refreshing={refreshing}
          onRefresh={refreshIfStale}
          timeZone={timeZone}
          onSelect={openSession}
          emptyMessage="No starred sessions yet."
        />
      </DataBoundary>
      <SessionTypeLegendDialog
        visible={legendVisible}
        onDismiss={() => setLegendVisible(false)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  actionsRow: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
});
