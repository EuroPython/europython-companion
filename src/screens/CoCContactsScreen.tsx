import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import ScreenContainer from "@components/layout/ScreenContainer";
import PaddedScrollView from "@components/layout/PaddedScrollView";
import ContactCard, { Contact } from "@components/ContactCard";
import { radius, spacing } from "@theme";
import { loadJsonData } from "@utils/storage";

const contacts: Contact[] = loadJsonData(() => require("@data/coc_contacts.json"), []);

export default function CoCContactsScreen() {
  const { colors } = useTheme();

  return (
    <ScreenContainer title="CoC Contacts">
      <PaddedScrollView contentContainerStyle={styles.wrapper}>
        <ContactCard
          primary
          contact={{ name: "Primary contact", email: "coc@europython.eu" }}
          style={{ backgroundColor: colors.surfaceVariant }}
        />

        {contacts.map((c) => (
          <ContactCard key={c.email ?? c.name} contact={c} />
        ))}
      </PaddedScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  card: {
    borderRadius: radius.xl,
  },
});
