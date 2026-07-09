import { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";

import { Speaker, Session } from "@app-types/conference";
import { spacing } from "@theme";
import MarkdownBody from "@components/MarkdownBody";
import OfflineNotice from "@components/status/OfflineNotice";
import ScreenContainer from "@components/layout/ScreenContainer";
import PaddedScrollView from "@components/layout/PaddedScrollView";
import SessionListItem from "@components/schedule/SessionListItem";
import SpeakerAvatar from "@components/SpeakerAvatar";
import SocialLinksRow from "@components/SocialLinksRow";
import StateMessage from "@components/status/StateMessage";
import { useConferenceData } from "@store/conferenceData";
import { shareLink } from "@utils/share";
import { useFavorites } from "@store/favorites";
import { useAppNavigation } from "@hooks/useAppNavigation";
import useSpeakerAvatars from "@hooks/useSpeakerAvatars";
import { compareSessionsByStart } from "@utils/schedule";
import useEffectiveTimeZone from "@hooks/useEffectiveTimeZone";

export default function SpeakerDetailScreen({ route }: any) {
  const { colors } = useTheme();
  const { speakerId } = route.params;
  const { data, loading, error } = useConferenceData();
  const { timeZone } = useEffectiveTimeZone();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { openSession } = useAppNavigation();

  const speaker: Speaker | null = useMemo(
    () => data?.speakersById[speakerId] ?? null,
    [data, speakerId],
  );
  const speakerAvatars = useSpeakerAvatars();

  const sessions: Session[] = useMemo(() => {
    if (!data || !speaker) return [];
    const speakerSessions = Object.values(data.sessionsById).filter((s) =>
      s.speakers.some((sp) => sp.id === speaker.id),
    );
    return speakerSessions.sort(compareSessionsByStart);
  }, [data, speaker]);

  const handleShare = useCallback(async () => {
    if (!speaker) return;
    await shareLink({
      title: speaker.name,
      url: speaker.websiteUrl,
      failureMessage: "Could not share this speaker.",
    });
  }, [speaker]);

  if (loading && !speaker) {
    return (
      <ScreenContainer title="Speaker details">
        <StateMessage title="Loading speaker..." loading />
      </ScreenContainer>
    );
  }

  if (!speaker) {
    return (
      <ScreenContainer title="Speaker details">
        <StateMessage title="Speaker not found." subtitle={error?.message} />
      </ScreenContainer>
    );
  }

  const socialLinks = [
    { key: "website", icon: "web", url: speaker.websiteUrl },
    { key: "homepage", icon: "home", url: speaker.homepage },
    { key: "linkedin", icon: "linkedin", url: speaker.linkedinUrl },
    { key: "git", icon: "github", url: speaker.gitUrl },
    { key: "twitter", icon: "twitter", url: speaker.twitterUrl },
    { key: "mastodon", icon: "mastodon", url: speaker.mastodonUrl },
    { key: "bluesky", icon: "butterfly", url: speaker.blueskyUrl },
  ].filter((l) => !!l.url);

  return (
    <ScreenContainer title="Speaker details">
      <PaddedScrollView contentContainerStyle={styles.content}>
        <OfflineNotice />
        <Card mode="elevated">
          <Card.Content style={styles.cardContent}>
            <View style={styles.shareCorner}>
              <IconButton
                icon="share-variant"
                onPress={handleShare}
                iconColor={colors.onSurfaceVariant}
                containerColor={colors.surfaceVariant}
              />
            </View>
            <View style={styles.avatarContainer}>
              <SpeakerAvatar name={speaker.name} avatarUri={speaker.avatar} size={120} />
            </View>

            <Text
              variant="titleLarge"
              style={{ textAlign: "center", marginTop: spacing.sm }}
            >
              {speaker.name}
            </Text>

            {speaker.affiliation && (
              <Text
                variant="bodySmall"
                style={{
                  marginTop: spacing.xs,
                  color: colors.onSurfaceVariant,
                  textAlign: "center",
                }}
              >
                {speaker.affiliation}
              </Text>
            )}

            <SocialLinksRow links={socialLinks} />

            {speaker.biography && (
              <View style={{ marginTop: spacing.lg }}>
                <Text
                  variant="titleMedium"
                  style={{ marginBottom: spacing.xs, fontWeight: "bold" }}
                >
                  Bio
                </Text>
                <MarkdownBody>{speaker.biography}</MarkdownBody>
              </View>
            )}

            <View style={{ marginTop: spacing.lg }}>
              <Text
                variant="titleMedium"
                style={{ marginBottom: spacing.xs, fontWeight: "bold" }}
              >
                Sessions
              </Text>
              {sessions.length === 0 ? (
                <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                  No sessions for this speaker found in the schedule.
                </Text>
              ) : (
                sessions.map((s) => (
                  <SessionListItem
                    key={s.id}
                    session={s}
                    isFavorite={isFavorite(s.id)}
                    onPress={openSession}
                    onToggleFavorite={toggleFavorite}
                    timeZone={timeZone}
                    speakerAvatars={speakerAvatars}
                  />
                ))
              )}
            </View>
          </Card.Content>
        </Card>
      </PaddedScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    position: "relative",
    paddingTop: spacing.md,
  },
  content: {
    padding: spacing.md,
  },
  avatarContainer: {
    marginTop: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  shareCorner: {
    position: "absolute",
    right: spacing.xs,
    top: spacing.xs,
    zIndex: 2,
  },
});
