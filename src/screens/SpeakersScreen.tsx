import { useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import ScreenContainer from "@components/layout/ScreenContainer";
import SearchBar from "@components/inputs/SearchBar";
import OfflineNotice from "@components/status/OfflineNotice";
import DataBoundary from "@components/status/DataBoundary";
import SpeakerListItem from "@components/SpeakerListItem";
import { Speaker } from "@app-types/conference";
import { spacing } from "@theme";
import { useConferenceData } from "@store/conferenceData";
import { useAppNavigation } from "@hooks/useAppNavigation";

export default function SpeakersScreen() {
  const { data, loading, error } = useConferenceData();
  const [searchQuery, setSearchQuery] = useState("");
  const { openSpeaker } = useAppNavigation();

  const speakers: Speaker[] = useMemo(() => {
    if (!data) return [];
    let list = Object.values(data.speakersById);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => {
        const name = s.name.toLowerCase();
        const affiliation = (s.affiliation ?? "").toLowerCase();
        return name.includes(q) || affiliation.includes(q);
      });
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [data, searchQuery]);

  const isEmpty = data && speakers.length === 0;

  const headerContent = (
    <>
      <OfflineNotice />
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search speakers or affiliations"
      />
    </>
  );

  return (
    <ScreenContainer title="Speakers">
      <DataBoundary
        loading={loading && !data}
        loadingMessage="Loading speakers…"
        error={!data ? error : null}
        errorMessage="Unable to load speakers."
        header={headerContent}
        isEmpty={!!isEmpty}
        emptyMessage="No speakers found."
      >
        <FlatList
          data={speakers}
          keyExtractor={(item) => item.id}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <SpeakerListItem
              name={item.name}
              affiliation={item.affiliation}
              avatar={item.avatar}
              onPress={() => openSpeaker(item.id)}
            />
          )}
        />
      </DataBoundary>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  card: {
    marginBottom: spacing.xs,
  },
});
