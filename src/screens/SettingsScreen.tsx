import { useMemo } from "react";
import { Alert, Platform, Share, StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

import ScreenContainer from "@components/layout/ScreenContainer";
import ChipPicker from "@components/inputs/ChipPicker";
import SettingsSection from "@components/settings/SettingsSection";
import PaddedScrollView from "@components/layout/PaddedScrollView";
import { SettingsSwitchRow } from "@components/settings/SettingsRow";
import { radius, spacing } from "@theme";
import { useConferenceData } from "@store/conferenceData";
import { useFavorites } from "@store/favorites";
import {
  useSettings,
  getConferenceMeta,
  ThemeMode,
  TimeZonePreference,
} from "@store/settings";
import { NOTIFICATION_LEAD_OPTIONS } from "@config/constants";
import { hapticLightImpact, hapticSelection, hapticWarning } from "@utils/haptics";
import useAppNavigation from "@hooks/useAppNavigation";
import { formatFetchedAt, getLocalTimeZone } from "@utils/time";
import { requestNotificationPermissionWithFeedback } from "@utils/notifications";

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { openNotificationsList } = useAppNavigation();
  const {
    refresh,
    refreshing,
    fetchedAt,
    fromCache,
    isOffline,
    lastFetchFailed,
    data: conferenceData,
  } = useConferenceData();
  const { favorites, clearFavorites, year: favoritesYear } = useFavorites();
  const {
    conferenceYear,
    availableYears,
    setConferenceYear,
    themeMode,
    setThemeMode,
    timeZonePreference,
    setTimeZonePreference,
    notificationsEnabled,
    setNotificationsEnabled,
    breakNotificationsEnabled,
    setBreakNotificationsEnabled,
    notificationLeadMinutes,
    setNotificationLeadMinutes,
    hapticsEnabled,
    setHapticsEnabled,
    resetOnboardingSeen,
  } = useSettings();
  const meta = getConferenceMeta(conferenceYear);
  const effectiveTimeZone =
    timeZonePreference === "conference" ? meta.timeZone : getLocalTimeZone();

  const lastUpdated = useMemo(() => formatFetchedAt(fetchedAt), [fetchedAt]);

  const leadTimeOptions = NOTIFICATION_LEAD_OPTIONS;
  const yearOptions = availableYears.map((year) => ({
    label: String(year),
    value: year,
  }));
  const themeOptions = (["system", "light", "dark", "night"] as ThemeMode[]).map(
    (mode) => ({
      label:
        mode === "system"
          ? "System"
          : mode === "light"
            ? "Light"
            : mode === "dark"
              ? "Dark"
              : "Night",
      value: mode,
    }),
  );

  const handleYearChange = (year: number) => {
    if (year === conferenceYear) return;
    hapticSelection();
    setConferenceYear(year);
  };

  const handleThemeChange = (mode: ThemeMode) => {
    if (mode === themeMode) return;
    hapticSelection();
    setThemeMode(mode);
  };

  const handleLeadTimeChange = (minutes: number) => {
    if (minutes === notificationLeadMinutes) return;
    hapticSelection();
    setNotificationLeadMinutes(minutes);
  };

  const handleTimeZoneChange = (mode: TimeZonePreference) => {
    if (mode === timeZonePreference) return;
    hapticSelection();
    Alert.alert(
      "Switch time zone?",
      mode === "local"
        ? "Session times will be shown in your local time zone. Are you sure?"
        : "Revert to the conference time zone?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Switch",
          style: "default",
          onPress: () => setTimeZonePreference(mode),
        },
      ],
    );
  };

  const handleExportFavorites = async () => {
    if (favorites.size === 0) {
      Alert.alert("No favourites to export");
      return;
    }
    const lines = Array.from(favorites).map((id) => {
      const session = conferenceData?.sessionsById[id];
      const title = session?.title ?? id;
      const url = session?.websiteUrl ?? session?.slug ?? "";
      return url ? `${title}: ${url}` : title;
    });
    const message = lines.join("\n\n");

    try {
      await Share.share({ message });
    } catch (err) {
      console.warn("Failed to share favourites", err);
      Alert.alert("Could not export favourites");
    }
  };

  const handleClearFavorites = () => {
    if (favorites.size === 0) {
      Alert.alert("No favourites to clear");
      return;
    }
    Alert.alert(
      "Clear favourites",
      "Remove all starred sessions?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => clearFavorites(),
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <ScreenContainer title="Settings">
      <PaddedScrollView contentPadding={0} contentContainerStyle={styles.scrollContent}>
        <SettingsSection title="Conference">
          <Text variant="bodyMedium" style={{ marginBottom: spacing.xs }}>
            Select year
          </Text>
          <ChipPicker
            options={yearOptions}
            value={conferenceYear}
            onChange={handleYearChange}
          />
          <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
            {meta.title} - {meta.subtitle}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: colors.onSurfaceVariant, marginTop: 4 }}
          >
            Last updated: {lastUpdated}
          </Text>
          {(fromCache || isOffline || lastFetchFailed) && (
            <Text
              variant="bodySmall"
              style={{ color: colors.onSurfaceVariant, marginTop: 2 }}
            >
              Status: {fromCache || isOffline ? "Cached" : "Error on refresh"}
            </Text>
          )}
          <Button
            mode="contained"
            onPress={() => {
              hapticLightImpact();
              refresh();
            }}
            loading={refreshing}
            style={{ marginTop: spacing.sm }}
          >
            Refresh data
          </Button>
        </SettingsSection>

        <SettingsSection title="Theme">
          <ChipPicker
            options={themeOptions}
            value={themeMode}
            onChange={handleThemeChange}
          />
        </SettingsSection>

        <SettingsSection title="Favourites">
          <Text variant="bodyMedium">
            Saved sessions (year {favoritesYear ?? conferenceYear}): {favorites.size}
          </Text>
          <View style={styles.row}>
            <Button mode="text" onPress={handleExportFavorites}>
              Export favourites
            </Button>
            <Button mode="text" onPress={handleClearFavorites}>
              Clear favourites
            </Button>
          </View>
        </SettingsSection>

        <SettingsSection
          title="Notifications"
          card={false}
          action={
            <Button
              mode="text"
              onPress={openNotificationsList}
              compact
              disabled={!notificationsEnabled && !breakNotificationsEnabled}
            >
              View scheduled notifications
            </Button>
          }
        >
          <Card mode="elevated" style={[styles.card, { marginTop: spacing.md }]}>
            <Card.Content>
              <SettingsSwitchRow
                title="Upcoming session reminders"
                subtitle={`Receive a reminder ${notificationLeadMinutes} minutes before keynotes and any sessions you have favourited start.`}
                value={notificationsEnabled}
                disabled={Platform.OS === "web"}
                onValueChange={async (val) => {
                  if (!val) {
                    setNotificationsEnabled(false);
                    hapticLightImpact();
                    return;
                  }
                  setNotificationsEnabled(true); // optimistic; revert below on denial
                  const { granted } = await requestNotificationPermissionWithFeedback({});
                  if (!granted) {
                    setNotificationsEnabled(false);
                    hapticWarning();
                  }
                }}
              />
              <View style={{ marginTop: spacing.xs }}>
                <ChipPicker
                  options={leadTimeOptions.map((m) => ({
                    label: `${m} min before`,
                    value: m,
                  }))}
                  value={notificationLeadMinutes}
                  onChange={handleLeadTimeChange}
                  disabled={!notificationsEnabled}
                />
              </View>
            </Card.Content>
          </Card>
          <Card mode="elevated" style={[styles.card, { marginTop: spacing.md }]}>
            <Card.Content>
              <SettingsSwitchRow
                title="Break reminders"
                subtitle="Get notified when scheduled breaks start."
                value={breakNotificationsEnabled}
                disabled={Platform.OS === "web"}
                onValueChange={async (val) => {
                  if (!val) {
                    setBreakNotificationsEnabled(false);
                    hapticLightImpact();
                    return;
                  }
                  setBreakNotificationsEnabled(true); // optimistic; revert below on denial
                  const { granted } = await requestNotificationPermissionWithFeedback({});
                  if (!granted) {
                    setBreakNotificationsEnabled(false);
                    hapticWarning();
                  }
                }}
              />
            </Card.Content>
          </Card>
          <Card mode="elevated" style={[styles.card, { marginTop: spacing.md }]}>
            <Card.Content>
              <SettingsSwitchRow
                title="Push notifications"
                subtitle="Get notified about important conference updates and announcements."
                value={false}
                onValueChange={() => {}}
                disabled
              />
            </Card.Content>
          </Card>
        </SettingsSection>

        <SettingsSection title="Haptics">
          <SettingsSwitchRow
            title="Haptic feedback"
            subtitle="Haptic feedback for actions like refreshing, toggles, onboarding steps, and favourites/calendar. Some haptics may still occur if system-level."
            value={hapticsEnabled}
            disabled={Platform.OS === "web"}
            onValueChange={async (val) => {
              if (val) {
                hapticSelection();
              }
              await setHapticsEnabled(val);
            }}
          />
        </SettingsSection>

        <SettingsSection title="Time zone">
          <ChipPicker
            options={[
              {
                label: `Conference (${meta.timeZone})`,
                value: "conference" as TimeZonePreference,
              },
              { label: "Local device TZ", value: "local" as TimeZonePreference },
            ]}
            value={timeZonePreference}
            onChange={handleTimeZoneChange}
          />
          <Text
            variant="bodySmall"
            style={{ color: colors.onSurfaceVariant, marginTop: 4 }}
          >
            Currently showing times in: {effectiveTimeZone}
          </Text>
        </SettingsSection>

        <SettingsSection title="Onboarding">
          <Button mode="outlined" onPress={resetOnboardingSeen}>
            Restart onboarding experience
          </Button>
        </SettingsSection>

        <SettingsSection title="About">
          <Text variant="bodyMedium">EuroPython Companion</Text>
          <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
            Your companion app for EuroPython conferences. Plan your schedule, star
            favourite sessions, and stay updated with the latest information.
          </Text>
        </SettingsSection>
      </PaddedScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  card: {
    borderRadius: radius.xl,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
});
