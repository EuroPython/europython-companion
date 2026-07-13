import { useState } from "react";
import { StyleSheet, View, Linking } from "react-native";
import { Button, Chip, Icon, Text, useTheme } from "react-native-paper";

import ScreenContainer from "@components/layout/ScreenContainer";
import PaddedScrollView from "@components/layout/PaddedScrollView";
import VenueImageThumbnail from "@components/venue/VenueImageThumbnail";
import VenueLightbox from "@components/venue/VenueLightbox";
import {
  venueFloors,
  venueEntrances,
  quietRoomImages,
  accessibilityItems,
  ACCESSIBILITY_EMAIL,
  MULTI_FLOOR_ROOMS_NOTE,
  type VenueImage,
} from "@data/venue";
import { radius, spacing } from "@theme";

type LightboxState = { images: VenueImage[]; index: number } | null;

export default function VenueMapScreen() {
  const { colors } = useTheme();
  const [activeFloor, setActiveFloor] = useState(venueFloors[0].id);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const floor = venueFloors.find((f) => f.id === activeFloor) ?? venueFloors[0];
  const floorPlans = venueFloors.map((f) => f.plan);

  return (
    <ScreenContainer title="Venue map" subtitle="ICE Kraków Congress Centre">
      <PaddedScrollView>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Getting in
        </Text>
        <Text
          variant="bodySmall"
          style={[styles.sectionBlurb, { color: colors.onSurfaceVariant }]}
        >
          Marii Konopnickiej 17, Kraków. Four lifts in the foyer reach every level and the
          underground car park. Accessible toilets are available on every floor.
        </Text>
        <View style={styles.entranceRow}>
          {venueEntrances.map((image, i) => (
            <View key={image.caption} style={styles.entranceItem}>
              <VenueImageThumbnail
                image={image}
                aspectRatio={1}
                onPress={() => setLightbox({ images: venueEntrances, index: i })}
              />
            </View>
          ))}
        </View>

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Floor plans
        </Text>
        <PaddedScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentPadding={0}
        >
          <View style={styles.chipRow}>
            {venueFloors.map((f) => (
              <Chip
                key={f.id}
                selected={f.id === activeFloor}
                onPress={() => setActiveFloor(f.id)}
                mode={f.id === activeFloor ? "flat" : "outlined"}
              >
                {f.level}
              </Chip>
            ))}
          </View>
        </PaddedScrollView>

        <Text
          variant="bodySmall"
          style={[styles.sectionBlurb, { color: colors.onSurfaceVariant }]}
        >
          {MULTI_FLOOR_ROOMS_NOTE}
        </Text>
        <Text
          variant="bodySmall"
          style={[styles.sectionBlurb, { color: colors.onSurfaceVariant }]}
        >
          {floor.blurb}
        </Text>
        <VenueImageThumbnail
          image={floor.plan}
          aspectRatio={2573 / 1819}
          onPress={() =>
            setLightbox({
              images: floorPlans,
              index: venueFloors.findIndex((f) => f.id === activeFloor),
            })
          }
        />
        <View style={styles.roomList}>
          {floor.rooms.map((room) => (
            <View key={room} style={styles.roomRow}>
              <Icon source="circle-small" size={20} color={colors.onSurfaceVariant} />
              <Text
                variant="bodyMedium"
                style={{ color: colors.onSurfaceVariant, flex: 1 }}
              >
                {room}
              </Text>
            </View>
          ))}
        </View>

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Accessibility & wellbeing
        </Text>
        {accessibilityItems.map((item) => (
          <View key={item.title} style={styles.a11yRow}>
            <View
              style={[styles.a11yIcon, { backgroundColor: colors.secondaryContainer }]}
            >
              <Icon source={item.icon} size={22} color={colors.onSecondaryContainer} />
            </View>
            <View style={styles.a11yText}>
              <Text variant="bodyMedium" style={{ fontWeight: "600" }}>
                {item.title}
              </Text>
              <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
                {item.text}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.quietRoomRow}>
          {quietRoomImages.map((image, i) => (
            <View key={image.caption} style={styles.entranceItem}>
              <VenueImageThumbnail
                image={image}
                aspectRatio={1}
                onPress={() => setLightbox({ images: quietRoomImages, index: i })}
              />
            </View>
          ))}
        </View>

        <Button
          mode="contained-tonal"
          icon="email-outline"
          style={styles.emailButton}
          onPress={() => Linking.openURL(`mailto:${ACCESSIBILITY_EMAIL}`)}
        >
          Email accessibility team
        </Button>
      </PaddedScrollView>

      {lightbox && (
        <VenueLightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  sectionBlurb: {
    marginBottom: spacing.sm,
  },
  chipRow: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  entranceRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  entranceItem: {
    flex: 1,
  },
  quietRoomRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  roomList: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  roomRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.xs,
  },
  a11yRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  a11yIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  a11yText: {
    flex: 1,
  },
  emailButton: {
    marginTop: spacing.sm,
    alignSelf: "flex-start",
  },
});
