import { useMemo, useState } from "react";
import { Alert, Linking, StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

import ScreenContainer from "@components/layout/ScreenContainer";
import { radius, spacing } from "@theme";
import { useSettings, getConferenceMeta } from "@store/settings";
import { hapticLightImpact, hapticSelection, hapticSuccess } from "@utils/haptics";
import { requestNotificationPermissionWithFeedback } from "@utils/notifications";
import { DISCORD_LINK, onboardingSlides } from "@data/onboarding";

type SlideAction = () => Promise<void> | void;

export default function OnboardingScreen() {
  const { colors } = useTheme();
  const { conferenceYear, setOnboardingSeen, setNotificationsEnabled } = useSettings();
  const meta = getConferenceMeta(conferenceYear);

  const actionMap: Record<string, SlideAction> = useMemo(
    () => ({
      requestNotifications: async () => {
        const { granted } = await requestNotificationPermissionWithFeedback();
        await setNotificationsEnabled(granted);
      },
      promptDiscord: () =>
        Alert.alert(
          "Join the EuroPython Discord?",
          "Meet other attendees, ask questions, and get help.",
          [
            { text: "Not now", style: "cancel" },
            { text: "Join Discord", onPress: () => Linking.openURL(DISCORD_LINK) },
          ],
        ),
    }),
    [setNotificationsEnabled],
  );

  const slides = useMemo(
    () =>
      onboardingSlides.map((slide) => ({
        ...slide,
        title: slide.key === "welcome" ? `Welcome to ${meta.title}` : slide.title,
        action: slide.action ? actionMap[slide.action] : undefined,
      })),
    [actionMap, meta.title],
  );

  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  const handleNext = async () => {
    hapticLightImpact();
    if (slide.action) {
      await slide.action();
    }

    if (isLast) {
      await setOnboardingSeen();
      hapticSuccess();
      return;
    }

    setIndex((i) => Math.min(i + 1, slides.length - 1));
  };

  const handleSkip = () => {
    hapticSelection();
    void setOnboardingSeen();
  };

  return (
    <ScreenContainer title={meta.title} subtitle={meta.subtitle}>
      <View style={styles.wrapper}>
        <Card mode="elevated" style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.slideTitle}>
              {slide.title}
            </Text>
            <Text
              variant="bodyMedium"
              style={[styles.slideBody, { color: colors.onSurfaceVariant }]}
            >
              {slide.body}
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.progressRow}>
          {slides.map((_, i) => (
            <View
              key={slides[i].key}
              style={[
                styles.dot,
                {
                  backgroundColor: i === index ? colors.primary : colors.outlineVariant,
                  opacity: i === index ? 1 : 0.5,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          <Button mode="text" onPress={handleSkip}>
            Skip
          </Button>
          <Button mode="contained" onPress={handleNext}>
            {isLast ? "Get started" : "Next"}
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: spacing.md,
    justifyContent: "center",
    gap: spacing.lg,
  },
  card: {
    borderRadius: radius.xl,
  },
  slideTitle: {
    marginBottom: spacing.sm,
    fontWeight: "bold",
  },
  slideBody: {
    lineHeight: 22,
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  actionButton: {
    borderRadius: radius.pill,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: radius.sm,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
