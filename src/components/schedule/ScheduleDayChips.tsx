import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  findNodeHandle,
  UIManager,
  Platform,
} from "react-native";
import { Chip, useTheme } from "react-native-paper";
import { spacing } from "@theme";

export type DayOption = {
  value: string;
  label: string;
};

type Props = {
  dayOptions: DayOption[];
  selectedDay: string | null;
  onChangeDay: (day: string) => void;
};

export default function ScheduleDayChips({
  dayOptions,
  selectedDay,
  onChangeDay,
}: Props) {
  const { colors } = useTheme();

  const dayScrollRef = useRef<ScrollView | null>(null);
  const chipHandles = useRef<Record<string, number | null>>({});
  const chipLayouts = useRef<Record<string, { x: number; width: number }>>({});
  const [scrollWidth, setScrollWidth] = useState<number | null>(null);

  const getNodeHandle = (node: any) => {
    if (Platform.OS === "web") return null;
    try {
      return findNodeHandle(node);
    } catch {
      return null;
    }
  };

  const scrollToSelected = () => {
    if (!selectedDay) return;
    if (Platform.OS === "web") {
      const layout = chipLayouts.current[selectedDay];
      if (!layout) return;
      const viewportWidth = scrollWidth ?? Dimensions.get("window").width;
      const targetX = Math.max(0, layout.x - (viewportWidth - layout.width) / 2);
      requestAnimationFrame(() => {
        dayScrollRef.current?.scrollTo({ x: targetX, animated: true });
      });
      return;
    }

    const chipHandle = chipHandles.current[selectedDay];
    const scrollHandle = getNodeHandle(dayScrollRef.current);
    if (!chipHandle || !scrollHandle) return;

    UIManager.measureLayout(
      chipHandle,
      scrollHandle,
      () => {},
      (x, _y, width) => {
        const viewportWidth = scrollWidth ?? Dimensions.get("window").width;
        const targetX = Math.max(0, x - (viewportWidth - width) / 2);
        requestAnimationFrame(() => {
          dayScrollRef.current?.scrollTo({ x: targetX, animated: true });
        });
      },
    );
  };

  useEffect(() => {
    scrollToSelected();
  }, [selectedDay, dayOptions.length, scrollWidth]);

  useEffect(() => {
    if (!selectedDay) return;
    const timer = setTimeout(scrollToSelected, 120);
    return () => clearTimeout(timer);
  }, [selectedDay, dayOptions.length, scrollWidth]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipRow}
      ref={dayScrollRef}
      onLayout={(event) => {
        setScrollWidth(event.nativeEvent.layout.width);
      }}
    >
      {dayOptions.map((day) => {
        const isSelected = selectedDay === day.value;
        return (
          <View
            key={day.value}
            ref={(node) => {
              if (Platform.OS !== "web") {
                const handle = getNodeHandle(node);
                chipHandles.current[day.value] = handle;
                if (handle && selectedDay === day.value) {
                  requestAnimationFrame(scrollToSelected);
                }
              }
            }}
            onLayout={(event) => {
              const { x, width } = event.nativeEvent.layout;
              chipLayouts.current[day.value] = { x, width };
              if (Platform.OS === "web" && selectedDay === day.value) {
                requestAnimationFrame(scrollToSelected);
              }
            }}
          >
            <Chip
              selected={isSelected}
              onPress={() => onChangeDay(day.value)}
              style={[
                styles.chip,
                isSelected && { backgroundColor: colors.secondaryContainer },
              ]}
              textStyle={isSelected ? { color: colors.onSecondaryContainer } : undefined}
              mode="outlined"
            >
              {day.label}
            </Chip>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    marginRight: spacing.xs,
  },
});
