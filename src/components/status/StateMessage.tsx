import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { spacing } from "@theme";

type Props = {
  title: string;
  subtitle?: string;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function StateMessage({ title, subtitle, loading, style }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.center, style]}>
      {loading ? <ActivityIndicator /> : null}
      <Text style={{ marginTop: loading ? spacing.xs : 0, textAlign: "center" }}>
        {title}
      </Text>
      {subtitle ? (
        <Text
          variant="bodySmall"
          style={{
            color: colors.onSurfaceVariant,
            marginTop: spacing.xs,
            textAlign: "center",
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
});
