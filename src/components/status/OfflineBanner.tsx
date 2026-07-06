import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { radius, spacing } from "@theme";

type Props = {
  visible: boolean;
  message?: string;
};

export default function OfflineBanner({
  visible,
  message = "Showing cached data (offline). Pull to refresh when you are back online.",
}: Props) {
  const { colors } = useTheme();
  if (!visible) return null;

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: colors.surfaceVariant,
          borderColor: colors.outlineVariant,
        },
      ]}
    >
      <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
  },
});
