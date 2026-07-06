import { useCallback, useMemo, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

import { Session } from "@app-types/conference";
import { spacing } from "@theme";
import MarkdownBody from "@components/MarkdownBody";
import OfflineNotice from "@components/status/OfflineNotice";
import ScreenContainer from "@components/layout/ScreenContainer";
import FavoriteToggleButton from "@components/schedule/FavoriteToggleButton";
import PaddedScrollView from "@components/layout/PaddedScrollView";
import DetailActionRow from "@components/DetailActionRow";
import StateMessage from "@components/status/StateMessage";
import { useConferenceData } from "@store/conferenceData";
import { useFavorites } from "@store/favorites";
import { formatSessionSubtitle } from "@utils/format";
import { useAppTheme } from "@hooks/useAppTheme";
import { useSettings } from "@store/settings";
import { useAppNavigation } from "@hooks/useAppNavigation";
import SpeakerListItem from "@components/SpeakerListItem";
import { shareLink } from "@utils/share";
import { useCalendarSync } from "@hooks/useCalendarSync";
import { isSessionInCalendar } from "@utils/calendar";
import useEffectiveTimeZone from "@hooks/useEffectiveTimeZone";

export default function SessionDetailScreen({ route }: any) {
  const { colors } = useTheme();
  const { sessionId } = route.params;
  const { data, loading, error } = useConferenceData();
  const {
    isFavorite: isFavoriteId,
    toggleFavorite,
    loading: favoritesLoading,
  } = useFavorites();
  const { palette } = useAppTheme();
  const { notificationLeadMinutes } = useSettings();
  const { conferenceYear, timeZone } = useEffectiveTimeZone();
  const [inCalendar, setInCalendar] = useState(false);
  const { openSpeaker } = useAppNavigation();
  const {
    confirmAddSession,
    confirmRemoveSession,
    busy: calendarBusy,
  } = useCalendarSync();

  const session: Session | null = useMemo(
    () => data?.sessionsById[sessionId] ?? null,
    [data, sessionId],
  );

  const favorite = isFavoriteId(sessionId);

  const handleToggleFavorite = useCallback(async () => {
    await toggleFavorite(sessionId);
  }, [sessionId, toggleFavorite]);

  const handleCalendarAction = useCallback(() => {
    if (!session) return;
    if (inCalendar) {
      confirmRemoveSession(session, conferenceYear, {
        leadMinutes: notificationLeadMinutes,
        onComplete: (result) => {
          if ("removed" in result && result.removed) {
            setInCalendar(false);
          }
        },
      });
      return;
    }
    confirmAddSession(session, conferenceYear, {
      leadMinutes: notificationLeadMinutes,
      onComplete: (result) => {
        if ("added" in result && result.added) {
          setInCalendar(true);
        }
      },
    });
  }, [
    session,
    inCalendar,
    confirmRemoveSession,
    confirmAddSession,
    conferenceYear,
    notificationLeadMinutes,
  ]);

  const handleShare = useCallback(async () => {
    if (!session) return;
    await shareLink({
      title: session.title,
      url: session.websiteUrl,
      failureMessage: "Could not share this session.",
    });
  }, [session]);

  const headerActions = [
    {
      key: "share",
      icon: "share-variant",
      onPress: handleShare,
      iconColor: colors.onSurfaceVariant,
      containerColor: colors.surfaceVariant,
    },
    {
      key: "favorite",
      render: () => (
        <FavoriteToggleButton
          isFavorite={favorite}
          onToggle={handleToggleFavorite}
          favoriteColor={palette.favorite}
          defaultColor={colors.onSurfaceVariant}
          containerColor={colors.surfaceVariant}
        />
      ),
    },
    {
      key: "calendar",
      icon: inCalendar ? "calendar-check" : "calendar-plus",
      onPress: handleCalendarAction,
      disabled: calendarBusy,
      iconColor: inCalendar ? colors.primary : colors.onSurfaceVariant,
      containerColor: colors.surfaceVariant,
    },
  ];

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!session) return;
      const exists = await isSessionInCalendar(session.id, conferenceYear);
      if (mounted) {
        setInCalendar(exists);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [session, conferenceYear]);

  if ((loading || favoritesLoading) && !session) {
    return (
      <ScreenContainer title="Session details">
        <StateMessage title="Loading session..." loading />
      </ScreenContainer>
    );
  }

  if (!session) {
    return (
      <ScreenContainer title="Session details">
        <StateMessage title="Session not found." subtitle={error?.message} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer title="Session details">
      <PaddedScrollView contentContainerStyle={styles.content}>
        <OfflineNotice />
        <Card mode="elevated">
          <View style={styles.headerWrapper}>
            <Card.Title
              title={session.title}
              titleNumberOfLines={4}
              titleStyle={{ fontWeight: "bold", maxWidth: "90%" }}
              style={{ marginTop: spacing.md }}
              titleVariant="titleLarge"
            />
            <DetailActionRow actions={headerActions} style={styles.headerActions} />
          </View>
          <Card.Content style={styles.cardContent}>
            <Text
              variant="bodySmall"
              style={[
                styles.sessionInfo,
                { marginTop: spacing.xs, marginBottom: spacing.sm },
              ]}
            >
              {formatSessionSubtitle(session, timeZone)}
            </Text>
            {session.track && (
              <Text variant="bodySmall" style={styles.sessionInfo}>
                Track: {session.track}
              </Text>
            )}
            {session.level && (
              <Text variant="bodySmall" style={styles.sessionInfo}>
                Level: {session.level}
              </Text>
            )}
            {session.sessionType && (
              <Text variant="bodySmall" style={styles.sessionInfo}>
                Type: {session.sessionType}
              </Text>
            )}

            {session.abstract && (
              <View style={{ marginTop: spacing.lg }}>
                <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                  Abstract
                </Text>
                <MarkdownBody>{session.abstract}</MarkdownBody>
              </View>
            )}

            {session.speakers.length > 0 && (
              <View style={{ marginTop: spacing.md }}>
                <Text
                  variant="titleMedium"
                  style={{ marginBottom: spacing.sm, fontWeight: "bold" }}
                >
                  Speakers
                </Text>
                {session.speakers.map((sp) => {
                  const avatar = data?.speakersById[sp.id]?.avatar ?? null;
                  return (
                    <SpeakerListItem
                      key={sp.id}
                      name={sp.name}
                      affiliation={sp.affiliation}
                      avatar={avatar}
                      onPress={() => openSpeaker(sp.id)}
                    />
                  );
                })}
              </View>
            )}
          </Card.Content>
        </Card>
      </PaddedScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
  },
  cardContent: {
    paddingRight: spacing.xl,
  },
  sessionInfo: {
    textTransform: "capitalize",
    maxWidth: "90%",
  },
  speakerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  speakerAvatar: {
    marginRight: spacing.xs / 2,
  },
  headerWrapper: {
    position: "relative",
    paddingRight: spacing.lg,
  },
  headerActions: {
    position: "absolute",
    right: spacing.xs,
    top: spacing.xs,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: spacing.xs,
    zIndex: 2,
  },
});
