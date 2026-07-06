import { StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";

import { spacing } from "@theme";

type Option<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
};

export function ChipPicker<T>({ options, value, onChange, disabled }: Props<T>) {
  return (
    <View style={styles.row}>
      {options.map((opt) => (
        <Chip
          key={String(opt.value)}
          selected={opt.value === value}
          onPress={() => onChange(opt.value)}
          disabled={disabled}
          style={styles.chip}
        >
          {opt.label}
        </Chip>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  chip: {
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
});

export default ChipPicker;
