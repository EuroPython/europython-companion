import { Linking, StyleSheet, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { spacing } from "@theme";

export type SocialLink = { key: string; icon: string; url?: string | null };

type Props = {
  links: SocialLink[];
};

export default function SocialLinksRow({ links }: Props) {
  const { colors } = useTheme();
  if (!links.length) return null;

  return (
    <View style={styles.row}>
      {links.map((link) => (
        <IconButton
          key={link.key}
          icon={link.icon}
          size={24}
          iconColor={colors.primary}
          containerColor={colors.surfaceVariant}
          onPress={() => {
            if (link.url) {
              Linking.openURL(link.url);
            }
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: spacing.sm,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
