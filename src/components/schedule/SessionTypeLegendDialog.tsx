import { StyleSheet, View } from "react-native";
import { Dialog, Portal, Text, Button, useTheme } from "react-native-paper";

import { radius, spacing } from "@theme";
import { useSessionTypeLegendEntries } from "@utils/sessionTypes";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export default function SessionTypeLegendDialog({ visible, onDismiss }: Props) {
  const { colors } = useTheme();
  const entries = useSessionTypeLegendEntries();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Session type legend</Dialog.Title>
        <Dialog.Content>
          {entries.map((entry) => (
            <View key={entry.label} style={styles.row}>
              <View
                style={[
                  styles.swatch,
                  {
                    backgroundColor: entry.color,
                    borderColor: colors.outline,
                  },
                ]}
              />
              <Text variant="bodyMedium" style={{ color: colors.onSurface }}>
                {entry.label}
              </Text>
            </View>
          ))}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  swatch: {
    width: 18,
    height: 18,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
