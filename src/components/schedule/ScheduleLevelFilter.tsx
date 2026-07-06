import { ScrollView, StyleSheet, View } from "react-native";
import { Chip, Text, useTheme } from "react-native-paper";
import { spacing } from "@theme";

type Props = {
  levelOptions: string[];
  selectedLevel: string | "all";
  onChangeLevel: (level: string | "all") => void;
};

const capitalizeWords = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

export default function ScheduleLevelFilter({
  levelOptions,
  selectedLevel,
  onChangeLevel,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.filterBlock}>
      <View style={styles.filterHeaderRow}>
        <Text
          variant="bodySmall"
          style={[styles.filterLabel, { color: colors.onSurfaceVariant }]}
        >
          Level
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {levelOptions.map((level) => {
          const isSelected = selectedLevel === level;
          return (
            <Chip
              key={level}
              selected={isSelected}
              onPress={() => onChangeLevel(isSelected ? "all" : level)}
              style={[
                styles.chip,
                isSelected && { backgroundColor: colors.secondaryContainer },
              ]}
              textStyle={isSelected ? { color: colors.onSecondaryContainer } : undefined}
              mode="outlined"
            >
              {capitalizeWords(level)}
            </Chip>
          );
        })}
      </ScrollView>
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
  chipRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    marginRight: spacing.xs,
  },
});
