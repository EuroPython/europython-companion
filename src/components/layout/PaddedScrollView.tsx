import { ScrollView, ScrollViewProps } from "react-native";

import { spacing } from "@theme";

type Props = ScrollViewProps & {
  contentPadding?: number;
};

export default function PaddedScrollView({
  children,
  contentPadding = spacing.md,
  contentContainerStyle,
  ...rest
}: Props) {
  return (
    <ScrollView
      {...rest}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        {
          padding: contentPadding,
          paddingBottom: spacing.lg,
        },
        contentContainerStyle,
      ]}
    >
      {children}
    </ScrollView>
  );
}
