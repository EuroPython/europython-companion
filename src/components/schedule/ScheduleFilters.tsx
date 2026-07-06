import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { radius, spacing } from "@theme";
import { hapticSelection } from "@utils/haptics";
import ScheduleDayChips, { DayOption } from "./ScheduleDayChips";
import ScheduleTrackFilter from "./ScheduleTrackFilter";
import ScheduleLevelFilter from "./ScheduleLevelFilter";

export type { DayOption };

type Props = {
  dayOptions: DayOption[];
  selectedDay: string | null;
  onChangeDay: (day: string) => void;

  trackOptions: string[];
  selectedTrack: string | "all";
  onChangeTrack: (track: string | "all") => void;

  levelOptions: string[];
  selectedLevel: string | "all";
  onChangeLevel: (level: string | "all") => void;

  anyFilterActive: boolean;
  onClearFilters: () => void;
};

export default function ScheduleFilters({
  dayOptions,
  selectedDay,
  onChangeDay,
  trackOptions,
  selectedTrack,
  onChangeTrack,
  levelOptions,
  selectedLevel,
  onChangeLevel,
  anyFilterActive,
  onClearFilters,
}: Props) {
  const { colors } = useTheme();

  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [trackDropdownOpen, setTrackDropdownOpen] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.outlineVariant,
        },
      ]}
    >
      <View style={styles.filterBlock}>
        <ScheduleDayChips
          dayOptions={dayOptions}
          selectedDay={selectedDay}
          onChangeDay={(day) => {
            onChangeDay(day);
            setTrackDropdownOpen(false);
          }}
        />

        <View style={styles.filtersToggleRow}>
          <Button
            mode="text"
            icon={filtersExpanded ? "chevron-up" : "tune"}
            onPress={() => {
              hapticSelection();
              setFiltersExpanded((prev) => !prev);
              setTrackDropdownOpen(false);
            }}
            contentStyle={styles.filtersToggleButtonContent}
            labelStyle={styles.filtersToggleButtonLabel}
            compact
          >
            {filtersExpanded ? "Hide filters" : "Show filters"}
          </Button>
        </View>
      </View>

      {filtersExpanded && (
        <>
          {trackOptions.length > 0 && (
            <ScheduleTrackFilter
              trackOptions={trackOptions}
              selectedTrack={selectedTrack}
              dropdownOpen={trackDropdownOpen}
              onToggleDropdown={() => setTrackDropdownOpen((open) => !open)}
              onSelectTrack={(track) => {
                onChangeTrack(track);
                setTrackDropdownOpen(false);
              }}
            />
          )}

          {levelOptions.length > 0 && (
            <ScheduleLevelFilter
              levelOptions={levelOptions}
              selectedLevel={selectedLevel}
              onChangeLevel={onChangeLevel}
            />
          )}

          <View style={styles.clearRow}>
            <Text
              variant="bodySmall"
              style={{
                color: anyFilterActive ? colors.primary : colors.onSurfaceVariant,
              }}
              onPress={anyFilterActive ? onClearFilters : undefined}
            >
              Clear filters
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.sm,
    marginBottom: spacing.sm,
    borderRadius: radius.xl,
    borderWidth: 1,
  },
  filterBlock: {
    marginBottom: spacing.xs,
  },
  filtersToggleRow: {
    marginTop: spacing.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  filtersToggleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  filtersToggleButtonLabel: {
    textAlign: "center",
  },
  clearRow: {
    alignItems: "flex-end",
    marginTop: spacing.xs,
  },
});
