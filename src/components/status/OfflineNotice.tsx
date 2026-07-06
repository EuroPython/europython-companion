import OfflineBanner from "./OfflineBanner";
import { useConferenceData } from "@store/conferenceData";
import { formatFetchedAt } from "@utils/time";

type Props = {
  message?: string;
};

export default function OfflineNotice({ message }: Props) {
  const { fromCache, isOffline, fetchedAt, lastFetchFailed } = useConferenceData();
  const visible = fromCache || isOffline || lastFetchFailed;
  if (!visible) return null;

  const formattedTime = formatFetchedAt(fetchedAt);

  const defaultText = lastFetchFailed
    ? "Latest refresh failed. Showing what we have."
    : fromCache || isOffline
      ? "Showing cached data. Latest updates may be missing."
      : "Latest updates may be missing.";

  const text = message ?? defaultText;

  const combined =
    formattedTime !== "Unknown" && (fromCache || lastFetchFailed || isOffline)
      ? `${text} Last updated ${formattedTime}.`
      : text;

  return <OfflineBanner visible message={combined} />;
}
