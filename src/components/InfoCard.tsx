import { StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

import { radius, spacing } from "@theme";

type Action = {
  label: string;
  onPress: () => void;
};

type Props = {
  title: string;
  lines: string[];
  actions?: Action[];
};

export default function InfoCard({ title, lines, actions = [] }: Props) {
  const { colors } = useTheme();
  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        {lines.map((line) => (
          <Text key={line} variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
            {line}
          </Text>
        ))}
        {actions.length > 0 && (
          <View style={styles.actionsRow}>
            {actions.map((action) => (
              <Button
                key={action.label}
                mode="text"
                compact
                onPress={action.onPress}
                style={{ alignSelf: "flex-start" }}
              >
                {action.label}
              </Button>
            ))}
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    marginBottom: spacing.md,
  },
  title: {
    marginBottom: spacing.xs,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
});
