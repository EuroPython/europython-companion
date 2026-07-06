import { View, StyleSheet } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

import { radius, spacing } from "@theme";

type Props = {
  title: string;
  description: string;
  onPressSchedule: () => void;
  onPressSpeakers: () => void;
};

export default function HomeHeroCard({
  title,
  description,
  onPressSchedule,
  onPressSpeakers,
}: Props) {
  const { colors } = useTheme();
  return (
    <Card
      mode="elevated"
      style={[
        styles.card,
        {
          backgroundColor: colors.surfaceVariant,
        },
      ]}
    >
      <Card.Content>
        <Text variant="titleLarge" style={{ marginBottom: spacing.xs }}>
          {title}
        </Text>
        <Text variant="bodyMedium" style={{ marginBottom: spacing.lg }}>
          {description}
        </Text>
        <View style={styles.buttonsRow}>
          <Button mode="contained" onPress={onPressSchedule}>
            View schedule
          </Button>
          <Button mode="outlined" onPress={onPressSpeakers}>
            Speakers
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: radius.xl,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});
