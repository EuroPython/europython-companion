import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme, Icon } from "react-native-paper";

import { BreakSlot } from "@app-types/conference";
import { radius, spacing } from "@theme";
import { formatSessionTimeRange } from "@utils/format";

type Props = {
  slot: BreakSlot;
  timeZone?: string;
};

export default function BreakListItem({ slot, timeZone }: Props) {
  const { colors } = useTheme();
  const { timePart } = formatSessionTimeRange(
    { start: slot.start, end: slot.end },
    timeZone,
  );

  return (
    <Card
      mode="contained"
      style={[
        styles.card,
        {
          backgroundColor: colors.secondaryContainer,
        },
      ]}
    >
      <Card.Content style={styles.content}>
        <View
          style={[
            styles.iconBlock,
            {
              backgroundColor: colors.surface,
            },
          ]}
        >
          <Icon source="coffee" size={22} color={colors.onSecondaryContainer} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            variant="titleMedium"
            style={{ fontWeight: "bold", color: colors.onSecondaryContainer }}
          >
            {slot.title || "Break"}
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.onSecondaryContainer }}>
            {timePart}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
    borderRadius: radius.xl,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  iconBlock: {
    width: 36,
    height: 36,
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
  },
});
