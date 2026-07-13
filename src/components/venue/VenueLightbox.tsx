import { useEffect, useState } from "react";
import { BackHandler, StyleSheet, useWindowDimensions, View } from "react-native";
import { IconButton, Portal, Text, useTheme } from "react-native-paper";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Gallery, fitContainer } from "react-native-zoom-toolkit";

import type { VenueImage } from "@data/venue";
import { radius, spacing } from "@theme";

type Props = {
  images: VenueImage[];
  index: number;
  onClose: () => void;
};

// Dimensions come from VenueImage's known width/height rather than a runtime
// resolve — react-native-zoom-toolkit's useImageResolution goes through RN's
// Image.resolveAssetSource for bundled assets, which doesn't reliably return
// results for these webp assets on native.
function GalleryImage({ image }: { image: VenueImage }) {
  const { width, height } = useWindowDimensions();
  const size = fitContainer(image.width / image.height, { width, height });

  return (
    <Image
      source={image.source}
      style={size}
      contentFit="contain"
      accessible
      accessibilityLabel={image.accessibilityLabel}
      accessibilityRole="image"
    />
  );
}

// Full-screen pinch-to-zoom, swipe-between lightbox for venue images. This is
// the ONLY place pinch/pan gestures live — inline thumbnails are tap-only so
// the page can always scroll (see VenueImageThumbnail).
export default function VenueLightbox({ images, index, onClose }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(index);
  const active = images[activeIndex];

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [onClose]);

  // Anchor the caption just below the actual rendered image (Gallery centers
  // it vertically), clamped so it never gets pushed past the safe area.
  const imageSize = fitContainer(active.width / active.height, { width, height });
  const captionTop = Math.min(
    (height - imageSize.height) / 2 + imageSize.height + spacing.sm,
    height - insets.bottom - 48,
  );

  return (
    <Portal>
      <View style={[styles.container, { backgroundColor: colors.backdrop }]}>
        <Gallery
          data={images}
          initialIndex={index}
          keyExtractor={(image) => image.caption}
          renderItem={(image) => <GalleryImage image={image} />}
          onIndexChange={setActiveIndex}
          onTap={onClose}
        />
        <IconButton
          icon="close"
          mode="contained-tonal"
          style={[styles.closeButton, { top: insets.top + spacing.sm }]}
          onPress={onClose}
          accessibilityLabel="Close"
        />
        {active?.caption && (
          <View
            style={[
              styles.captionBar,
              { top: captionTop, backgroundColor: colors.elevation.level3 },
            ]}
          >
            <Text
              variant="bodyMedium"
              style={{ color: colors.onSurface, textAlign: "center" }}
            >
              {active.caption}
            </Text>
          </View>
        )}
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    right: spacing.sm,
  },
  captionBar: {
    position: "absolute",
    alignSelf: "center",
    maxWidth: "85%",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
});
