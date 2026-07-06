import { StyleProp, ViewStyle } from "react-native";
import { Avatar } from "react-native-paper";

import { initialsFromName } from "@utils/format";

type Props = {
  name: string;
  avatarUri?: string | null;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export default function SpeakerAvatar({ name, avatarUri, size = 24, style }: Props) {
  const initials = initialsFromName(name || "Unknown").slice(0, 2);

  if (avatarUri) {
    return <Avatar.Image size={size} source={{ uri: avatarUri }} style={style} />;
  }

  return <Avatar.Text size={size} label={initials} style={style} />;
}
