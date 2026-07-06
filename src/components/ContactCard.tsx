import { Linking, StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { radius, spacing } from "@theme";

export type Contact = {
  name: string;
  email?: string;
  telegram?: string;
  discord?: string;
};

type Props = {
  contact: Contact;
  primary?: boolean;
  style?: object;
};

export default function ContactCard({ contact, primary = false, style }: Props) {
  const { colors } = useTheme();
  const telegramHandle = contact.telegram
    ? contact.telegram.replace(/^@/, "")
    : undefined;

  return (
    <Card mode={primary ? "elevated" : "outlined"} style={[styles.card, style]}>
      <Card.Content>
        <Text variant={primary ? "titleMedium" : "titleSmall"}>{contact.name}</Text>
        {contact.email ? (
          <Text
            variant="bodySmall"
            style={[
              styles.link,
              { color: colors.primary, paddingVertical: 6, fontSize: 16 },
            ]}
            onPress={() => Linking.openURL(`mailto:${contact.email}`)}
          >
            {contact.email}
          </Text>
        ) : null}
        {telegramHandle ? (
          <Text
            variant="bodySmall"
            style={[styles.link, { color: colors.primary }]}
            onPress={() => Linking.openURL(`https://t.me/${telegramHandle}`)}
          >
            Telegram: @{telegramHandle}
          </Text>
        ) : null}
        {contact.discord ? (
          <Text
            variant="bodySmall"
            style={{ color: colors.onSurfaceVariant, paddingVertical: 6 }}
          >
            Discord: {contact.discord}
          </Text>
        ) : null}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    marginBottom: spacing.xs,
  },
  link: {
    marginTop: spacing.xs,
  },
});
