import { View } from "react-native";

import InfoCard from "@components/InfoCard";
import { needToKnow } from "@data/homeInfo";
import useAppNavigation from "@hooks/useAppNavigation";
import { spacing } from "@theme";

export default function NeedToKnowList() {
  const navigationActions = useAppNavigation();

  const mapAction = (key: string, label: string) => {
    const handler = (navigationActions as Record<string, unknown>)[key];
    return typeof handler === "function"
      ? { label, onPress: handler as () => void }
      : null;
  };

  return (
    <View>
      {needToKnow.map((card) => {
        const actions = card.actions
          ?.map((action) => mapAction(action.key, action.label))
          .filter((a): a is { label: string; onPress: () => void } => !!a);

        return (
          <View key={card.title} style={{ marginBottom: -spacing.xs }}>
            <InfoCard title={card.title} lines={card.lines} actions={actions} />
          </View>
        );
      })}
    </View>
  );
}
