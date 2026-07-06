import { useRef } from "react";
import { StyleSheet, View, Linking } from "react-native";
import { Button } from "react-native-paper";
import { WebView } from "react-native-webview";

import ScreenContainer from "@components/layout/ScreenContainer";
import { radius, spacing } from "@theme";
import useAppNavigation from "@hooks/useAppNavigation";
import { COC_URL } from "@data/coc";

export default function CoCScreen() {
  const { openCoCContacts } = useAppNavigation();
  const hasLoadedOnce = useRef(false);

  const openOnline = () => Linking.openURL(COC_URL);

  return (
    <ScreenContainer title="Code of Conduct">
      <View style={styles.container}>
        <View style={styles.actionsRow}>
          <Button
            mode="outlined"
            onPress={() => openCoCContacts()}
            style={{ marginRight: spacing.sm }}
          >
            View CoC contacts
          </Button>
          <Button mode="contained" onPress={openOnline}>
            Open on the browser
          </Button>
        </View>
        <WebView
          source={{ uri: COC_URL }}
          startInLoadingState
          style={styles.webview}
          injectedJavaScript={`
            (function() {
              const hide = () => {
                const header = document.querySelector('header');
                const nav = document.querySelector('.gh-head');
                if (header) header.style.display = 'none';
                if (nav) nav.style.display = 'none';
                document.body.style.paddingTop = '0px';
              };
              hide();
              const observer = new MutationObserver(hide);
              observer.observe(document.documentElement, { childList: true, subtree: true });
            })();
            true;
          `}
          onShouldStartLoadWithRequest={(req) => {
            if (!hasLoadedOnce.current && req.url.startsWith(COC_URL)) {
              hasLoadedOnce.current = true;
              return true;
            }
            return false;
          }}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  actionsRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  webview: {
    flex: 1,
    borderRadius: radius.xl,
    overflow: "hidden",
  },
});
