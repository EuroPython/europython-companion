import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle, StyleProp, Pressable } from "react-native";
import { useTheme, Text, IconButton, Icon } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing } from "@theme";
import { useSettings } from "@store/settings";
import { DEFAULT_CONFERENCE_YEAR } from "@config/conference";
import useAppNavigation from "@hooks/useAppNavigation";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  title?: string;
  subtitle?: string;
  variant?: "default" | "hero";
  headerRight?: ReactNode;
  infoButton?: {
    onPress: () => void;
    accessibilityLabel?: string;
    icon?: string;
  };
};

export default function ScreenContainer({
  children,
  style,
  title,
  subtitle,
  headerRight,
  infoButton,
}: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { conferenceYear } = useSettings();
  const isLatest = conferenceYear === DEFAULT_CONFERENCE_YEAR;
  const { navigation, goToSettingsTab } = useAppNavigation();
  const navState = navigation?.getState?.();
  const parentState = navigation?.getParent?.()?.getState?.();
  const isStack = navState?.type === "stack";
  const stackDepth = isStack ? (navState.index ?? 0) : 0;
  const isTabRoot = parentState?.type === "tab" && stackDepth === 0;
  const showBack = !isTabRoot && (stackDepth > 0 || (navigation?.canGoBack?.() ?? false));

  return (
    <View
      style={[
        styles.root,
        {
          paddingTop: insets.top,
          backgroundColor: colors.background,
        },
        style,
      ]}
    >
      {!isLatest && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go to settings to switch the conference year"
          onPress={goToSettingsTab}
          style={({ pressed }) => [
            styles.versionBanner,
            {
              backgroundColor: colors.errorContainer,
              borderColor: colors.error,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <View style={styles.versionBannerContent}>
            <Icon source="alert-circle" size={26} color={colors.onErrorContainer} />
            <View style={{ flex: 1 }}>
              <Text
                variant="titleSmall"
                style={{
                  color: colors.onErrorContainer,
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                You are viewing old data
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onErrorContainer }}>
                EuroPython {conferenceYear} is selected. Latest is{" "}
                {DEFAULT_CONFERENCE_YEAR}. Switch years in Settings.
              </Text>
            </View>
          </View>
        </Pressable>
      )}
      {title && (
        <View style={[styles.headerRow]}>
          {showBack ? (
            <IconButton
              icon="arrow-left"
              size={22}
              onPress={() => navigation.goBack()}
              accessibilityLabel="Go back"
              style={[styles.backButton, { backgroundColor: colors.background }]}
            />
          ) : null}
          <View style={styles.headerTextBlock}>
            <Text variant="titleLarge" style={[styles.headerTitle]}>
              {title}
            </Text>
            {subtitle ? (
              <Text variant="bodyMedium" style={[styles.headerSubtitle]}>
                {subtitle}
              </Text>
            ) : null}
          </View>
          {infoButton ? (
            <IconButton
              icon={infoButton.icon ?? "information-outline"}
              size={22}
              onPress={infoButton.onPress}
              accessibilityLabel={
                infoButton.accessibilityLabel ?? "Show more information"
              }
              style={[styles.infoButton, { backgroundColor: colors.background }]}
            />
          ) : null}
          {!infoButton && headerRight ? (
            <View style={styles.headerRight}>{headerRight}</View>
          ) : null}
        </View>
      )}

      <View style={[styles.content]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  backButton: {
    marginLeft: -spacing.xs,
    marginRight: spacing.sm,
  },
  headerTextBlock: {
    flexShrink: 1,
    flex: 1,
    paddingRight: spacing.sm,
  },
  headerTitle: {
    fontWeight: "bold",
  },
  headerSubtitle: {
    marginTop: 2,
    opacity: 0.85,
  },
  headerRight: {
    marginLeft: "auto",
  },
  infoButton: {
    marginLeft: spacing.xs,
  },
  content: {
    flex: 1,
  },
  versionBanner: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 2,
  },
  versionBannerContent: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: spacing.sm,
  },
});
