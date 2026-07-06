import { Card, Avatar } from "react-native-paper";

type Props = {
  name: string;
  affiliation?: string | null;
  avatar?: string | null;
  onPress: () => void;
};

export default function SpeakerListItem({ name, affiliation, avatar, onPress }: Props) {
  return (
    <Card mode="outlined" onPress={onPress} style={{ marginBottom: 4 }}>
      <Card.Title
        title={name}
        subtitle={affiliation ?? undefined}
        titleStyle={{ fontWeight: "bold" }}
        subtitleStyle={{ marginTop: -6 }}
        left={(props) =>
          avatar ? (
            <Avatar.Image {...props} size={40} source={{ uri: avatar }} />
          ) : (
            <Avatar.Text {...props} size={40} label={name.slice(0, 2).toUpperCase()} />
          )
        }
      />
    </Card>
  );
}
