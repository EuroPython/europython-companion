import { StyleSheet, View, Pressable } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { Image } from "expo-image";

import type { VenueImage } from "@data/venue";
import { radius, spacing } from "@theme";

type Props = {
  image: VenueImage;
  onPress: () => void;
  aspectRatio?: number;
};

// Tap-only preview — deliberately no pinch/pan gesture handler here, so a
// drag started on the image still scrolls the page. Zooming happens in
// VenueLightbox, opened on tap.
export default function VenueImageThumbnail({
  image,
  onPress,
  aspectRatio = 16 / 11,
}: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="imagebutton"
      accessibilityLabel={`${image.accessibilityLabel} Tap to zoom.`}
      style={styles.wrapper}
    >
      <View
        style={[styles.imageBox, { aspectRatio, backgroundColor: colors.surfaceVariant }]}
      >
        <Image
          source={image.source}
          style={StyleSheet.absoluteFill}
          contentFit="contain"
        />
        <View style={[styles.badge, { backgroundColor: colors.backdrop }]}>
          <Icon source="magnify-plus-outline" size={16} color={colors.onSurface} />
        </View>
      </View>
      {image.caption && (
        <Text
          variant="bodySmall"
          style={[styles.caption, { color: colors.onSurfaceVariant }]}
        >
          {image.caption}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.sm,
  },
  imageBox: {
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  badge: {
    position: "absolute",
    right: spacing.xs,
    bottom: spacing.xs,
    borderRadius: radius.pill,
    padding: spacing.xs,
  },
  caption: {
    marginTop: spacing.xs,
    textAlign: "center",
  },
});
