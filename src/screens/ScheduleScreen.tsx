import { useEffect, useMemo, useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

import { ScheduleItem } from "@app-types/conference";
import { spacing } from "@theme";
import SearchBar from "@components/inputs/SearchBar";
import ScheduleFilters, { DayOption } from "@components/schedule/ScheduleFilters";
import ScreenContainer from "@components/layout/ScreenContainer";
import SessionList from "@components/schedule/SessionList";
import OfflineNotice from "@components/status/OfflineNotice";
import DataBoundary from "@components/status/DataBoundary";
import { useConferenceData } from "@store/conferenceData";
import { useAppNavigation } from "@hooks/useAppNavigation";
import { compareSessionsByStart, isBreak } from "@utils/schedule";
import { formatConferenceDayLabel, formatDateISO } from "@utils/time";
import useEffectiveTimeZone from "@hooks/useEffectiveTimeZone";
import SessionTypeLegendDialog from "@components/schedule/SessionTypeLegendDialog";

export default function ScheduleScreen() {
  const { colors } = useTheme();
  const { data, loading, refreshing, refresh, error } = useConferenceData();
  const [searchQuery, setSearchQuery] = useState("");
  const [legendVisible, setLegendVisible] = useState(false);

  const { conferenceYear, timeZone } = useEffectiveTimeZone();
  const { openSession } = useAppNavigation();

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<string | "all">("all");

  const todayDateString = useMemo(
    () => formatDateISO(new Date(), timeZone ?? undefined),
    [timeZone],
  );

  const bestDay = useMemo(() => {
    if (!data || data.days.length === 0) return null;
    const hasToday = data.days.find((d) => d.date === todayDateString);
    if (hasToday) return hasToday.date;
    return data.days[0].date;
  }, [data?.days, todayDateString]);

  useEffect(() => {
    if (!bestDay) return;
    if (!selectedDay) {
      setSelectedDay(bestDay);
    }
  }, [bestDay, selectedDay]);

  useFocusEffect(
    useCallback(() => {
      if (!bestDay) return;
      if (!selectedDay) {
        setSelectedDay(bestDay);
      }
    }, [bestDay, selectedDay]),
  );

  useEffect(() => {
    setSelectedDay(null);
    setSelectedTrack("all");
    setSelectedLevel("all");
    setSearchQuery("");
  }, [conferenceYear]);

  const dayOptions: DayOption[] = useMemo(() => {
    if (!data) return [];
    return data.days.map((day) => ({
      value: day.date,
      label: formatConferenceDayLabel(day.date, timeZone ?? undefined),
    }));
  }, [data, timeZone]);

  const trackOptions: string[] = useMemo(() => {
    if (!data) return [];
    const tracks = new Set<string>();
    Object.values(data.sessionsById).forEach((s) => {
      if (s.track && s.track.trim().length > 0) {
        tracks.add(s.track);
      }
    });
    return Array.from(tracks).sort();
  }, [data]);

  const levelOptions: string[] = useMemo(() => {
    if (!data) return [];
    const levels = new Set<string>();
    Object.values(data.sessionsById).forEach((s) => {
      if (s.level && s.level.trim().length > 0) {
        levels.add(s.level);
      }
    });
    const arr = Array.from(levels);
    const desiredOrder = ["beginner", "intermediate", "advanced"];
    return arr.sort((a, b) => {
      const al = a.toLowerCase();
      const bl = b.toLowerCase();
      const ia = desiredOrder.indexOf(al);
      const ib = desiredOrder.indexOf(bl);
      if (ia !== -1 || ib !== -1) {
        if (ia === -1) return 1;
        if (ib === -1) return -1;
        return ia - ib;
      }
      return a.localeCompare(b);
    });
  }, [data]);

  const effectiveDay = selectedDay ?? bestDay;

  const itemsForList: ScheduleItem[] = useMemo(() => {
    if (!data) return [];

    if (!effectiveDay) return [];

    const day = data.days.find((d) => d.date === effectiveDay);
    if (!day) return [];

    let baseItems: ScheduleItem[] =
      day.events && day.events.length > 0
        ? day.events
        : Object.values(data.sessionsById).filter((s) => day.sessionIds.includes(s.id));

    if (selectedTrack !== "all") {
      baseItems = baseItems.filter((item) => {
        if (isBreak(item)) return true;
        return (item.track ?? "").trim() === selectedTrack;
      });
    }

    if (selectedLevel !== "all") {
      baseItems = baseItems.filter((item) => {
        if (isBreak(item)) return true;
        return (item.level ?? "").trim() === selectedLevel;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      baseItems = baseItems.filter((item) => {
        if (isBreak(item)) {
          const title = item.title.toLowerCase();
          const rooms = (item.rooms ?? []).join(" ").toLowerCase();
          return title.includes(q) || rooms.includes(q);
        }

        const title = item.title.toLowerCase();
        const track = (item.track ?? "").toLowerCase();
        const room = (item.room ?? "").toLowerCase();
        const speakers = item.speakers.map((sp) => sp.name.toLowerCase()).join(" ");

        return (
          title.includes(q) ||
          track.includes(q) ||
          room.includes(q) ||
          speakers.includes(q)
        );
      });
    }

    const sortedItems = [...baseItems];
    sortedItems.sort(compareSessionsByStart);
    return sortedItems;
  }, [data, effectiveDay, selectedTrack, selectedLevel, searchQuery]);

  const anyFilterActive = selectedTrack !== "all" || selectedLevel !== "all";

  const currentDayLabel =
    effectiveDay && dayOptions.find((d) => d.value === effectiveDay)?.label;

  const handleClearFilters = () => {
    setSelectedTrack("all");
    setSelectedLevel("all");
  };

  const headerContent = (
    <>
      <OfflineNotice />
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search sessions, tracks, rooms, speakers"
      />

      <View style={styles.headerSummary}>
        <Text
          variant="bodySmall"
          style={{ color: colors.onSurfaceVariant }}
          numberOfLines={1}
        >
          {currentDayLabel
            ? `Showing sessions for ${currentDayLabel}`
            : "Showing sessions"}
        </Text>
      </View>

      <ScheduleFilters
        dayOptions={dayOptions}
        selectedDay={effectiveDay}
        onChangeDay={setSelectedDay}
        trackOptions={trackOptions}
        selectedTrack={selectedTrack}
        onChangeTrack={setSelectedTrack}
        levelOptions={levelOptions}
        selectedLevel={selectedLevel}
        onChangeLevel={setSelectedLevel}
        anyFilterActive={anyFilterActive}
        onClearFilters={handleClearFilters}
      />
    </>
  );

  return (
    <ScreenContainer
      title="Schedule"
      infoButton={{
        onPress: () => setLegendVisible(true),
        accessibilityLabel: "Show session type legend",
      }}
    >
      <DataBoundary
        loading={loading && !data}
        loadingMessage="Loading schedule..."
        error={!data ? error : null}
        errorMessage="Unable to load schedule."
        header={headerContent}
        isEmpty={itemsForList.length === 0}
        emptyMessage="No sessions or breaks match your filters."
      >
        <SessionList
          sessions={itemsForList}
          refreshing={refreshing}
          onRefresh={refresh}
          timeZone={timeZone}
          onSelect={openSession}
          emptyMessage="No sessions or breaks match your filters."
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
  headerSummary: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
});
