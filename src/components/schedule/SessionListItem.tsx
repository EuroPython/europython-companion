import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { Session } from "@app-types/conference";
import { spacing } from "@theme";
import { formatSessionSubtitle } from "@utils/format";
import { useAppTheme } from "@hooks/useAppTheme";
import { getSessionTypeAccent } from "@utils/sessionTypes";
import FavoriteToggleButton from "./FavoriteToggleButton";
import SpeakerAvatar from "../SpeakerAvatar";

type Props = {
  session: Session;
  isFavorite: boolean;
  onPress: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  timeZone?: string;
  speakerAvatars?: Record<string, string | null | undefined>;
};

const nameOrUnknown = (name?: string) => name || "Unknown speaker";

function SessionListItem({
  session,
  isFavorite,
  onPress,
  onToggleFavorite,
  timeZone,
  speakerAvatars,
}: Props) {
  const { colors } = useTheme();
  const { palette } = useAppTheme();
  const starColor = isFavorite ? palette.favorite : colors.onSurfaceVariant;
  const accentColor = getSessionTypeAccent(session.sessionType, colors.outline);

  return (
    <Card
      style={[
        styles.card,
        {
          borderLeftWidth: 4,
          borderLeftColor: accentColor,
        },
      ]}
      mode="outlined"
      onPress={() => onPress(session.id)}
    >
      <Card.Title
        title={session.title}
        titleNumberOfLines={2}
        subtitle={formatSessionSubtitle(session, timeZone)}
        titleStyle={{ fontWeight: "bold", marginTop: spacing.sm }}
        subtitleStyle={{ color: colors.onSurfaceVariant, marginBottom: spacing.md }}
        right={(props) =>
          onToggleFavorite ? (
            <FavoriteToggleButton
              {...props}
              isFavorite={isFavorite}
              onToggle={() => onToggleFavorite(session.id)}
              favoriteColor={starColor}
              defaultColor={colors.onSurfaceVariant}
              accessibilityLabel={
                isFavorite ? "Remove from favourites" : "Add to favourites"
              }
              style={{ marginRight: spacing.xs }}
            />
          ) : isFavorite ? (
            <Text
              {...props}
              style={{
                marginRight: spacing.sm,
                color: palette.favorite,
              }}
            >
              ★
            </Text>
          ) : null
        }
      />
      {session.speakers.length > 0 && (
        <Card.Content>
          <View style={styles.speakersRow}>
            {session.speakers.map((sp) => {
              const avatarUri = speakerAvatars?.[sp.id];
              return (
                <View key={sp.id} style={styles.speakerItem}>
                  <SpeakerAvatar
                    name={nameOrUnknown(sp.name)}
                    avatarUri={avatarUri as string | null | undefined}
                    size={20}
                    style={styles.speakerAvatar}
                  />
                  <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                    {nameOrUnknown(sp.name)}
                  </Text>
                </View>
              );
            })}
          </View>
        </Card.Content>
      )}
    </Card>
  );
}

export default React.memo(SessionListItem);

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
    borderLeftWidth: 4,
  },
  speakersRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -spacing.xs,
    gap: spacing.xs,
    paddingRight: spacing.xs,
    flexWrap: "wrap",
    overflow: "hidden",
  },
  speakerAvatar: {
    marginRight: spacing.xs / 2,
  },
  speakerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs / 2,
    flexShrink: 1,
  },
});
