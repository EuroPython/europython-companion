import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Chip, Text, useTheme } from "react-native-paper";
import { radius, spacing } from "@theme";

type Props = {
  trackOptions: string[];
  selectedTrack: string | "all";
  dropdownOpen: boolean;
  onToggleDropdown: () => void;
  onSelectTrack: (track: string | "all") => void;
};

export default function ScheduleTrackFilter({
  trackOptions,
  selectedTrack,
  dropdownOpen,
  onToggleDropdown,
  onSelectTrack,
}: Props) {
  const { colors } = useTheme();
  const currentTrackLabel = selectedTrack === "all" ? "All tracks" : selectedTrack;

  return (
    <View style={styles.filterBlock}>
      <View style={styles.filterHeaderRow}>
        <Text
          variant="bodySmall"
          style={[styles.filterLabel, { color: colors.onSurfaceVariant }]}
        >
          Track
        </Text>
      </View>
      <View style={styles.trackRow}>
        <Chip
          mode="outlined"
          icon="tag"
          selected={selectedTrack !== "all"}
          onPress={onToggleDropdown}
          style={styles.trackChip}
          textStyle={styles.trackChipText}
        >
          {currentTrackLabel}
        </Chip>
      </View>
      {dropdownOpen && (
        <View
          style={[
            styles.trackDropdown,
            {
              borderColor: colors.outlineVariant,
              backgroundColor: colors.surface,
              shadowColor: colors.onSurface,
            },
          ]}
        >
          <ScrollView
            style={{ maxHeight: 240 }}
            nestedScrollEnabled
            showsVerticalScrollIndicator={true}
          >
            <Pressable style={styles.trackOption} onPress={() => onSelectTrack("all")}>
              <Text variant="bodySmall">All tracks</Text>
            </Pressable>
            {trackOptions.map((track) => (
              <Pressable
                key={track}
                style={styles.trackOption}
                onPress={() => onSelectTrack(track)}
              >
                <Text variant="bodySmall">{track}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  filterBlock: {
    marginBottom: spacing.xs,
  },
  filterHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  filterLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  trackRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  trackChip: {
    flex: 1,
    maxWidth: "100%",
  },
  trackChipText: {
    width: "85%",
    textAlign: "center",
  },
  trackDropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderRadius: radius.lg,
    alignSelf: "stretch",
    shadowOpacity: 0.08,
    shadowRadius: radius.sm,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  trackOption: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
});
