import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import HomeHeroCard from "@components/home/HomeHeroCard";
import OfflineNotice from "@components/status/OfflineNotice";
import ScreenContainer from "@components/layout/ScreenContainer";
import UpcomingList from "@components/home/UpcomingList";
import PaddedScrollView from "@components/layout/PaddedScrollView";
import NeedToKnowList from "@components/home/NeedToKnowList";
import { spacing } from "@theme";
import { useConferenceData } from "@store/conferenceData";
import { getConferenceMeta, useSettings } from "@store/settings";
import { useAppNavigation } from "@hooks/useAppNavigation";

export default function HomeScreen() {
  const { conferenceYear } = useSettings();
  const meta = getConferenceMeta(conferenceYear);
  const { data } = useConferenceData();
  const { goToScheduleTab, goToSpeakersTab } = useAppNavigation();

  return (
    <ScreenContainer title="Home">
      <PaddedScrollView contentContainerStyle={styles.content} contentPadding={0}>
        <OfflineNotice />

        <HomeHeroCard
          title={meta.title}
          description={meta.subtitle}
          onPressSchedule={goToScheduleTab}
          onPressSpeakers={goToSpeakersTab}
        />

        {data ? (
          <View style={styles.section}>
            <UpcomingList data={data} favoritesOnly={true} limit={4} />
          </View>
        ) : null}

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Need to know
          </Text>
          <NeedToKnowList />
        </View>
      </PaddedScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.lg,
  },
  section: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
});
