import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import Markdown, { MarkdownIt } from "react-native-markdown-display";
import { useTheme } from "react-native-paper";
import { MD3Theme } from "react-native-paper";
import { radius } from "@theme";

type Props = {
  children: string | null | undefined;
};

const MarkdownBody: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const markdownItInstance = useMemo(
    () =>
      MarkdownIt({
        linkify: true,
      }),
    [],
  );

  if (!children || children.trim().length === 0) {
    return null;
  }

  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Markdown markdownit={markdownItInstance} style={styles}>
      {children}
    </Markdown>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    body: {
      fontSize: 14,
      lineHeight: 20,
      color: theme.colors.onSurface,
    },
    heading1: {
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 12,
      marginBottom: 6,
      color: theme.colors.onSurface,
    },
    heading2: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 4,
      color: theme.colors.onSurface,
    },
    heading3: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 8,
      marginBottom: 4,
      color: theme.colors.onSurface,
    },
    paragraph: {
      marginTop: 4,
      marginBottom: 4,
    },
    bullet_list: {
      paddingLeft: 16,
      marginVertical: 4,
    },
    ordered_list: {
      paddingLeft: 16,
      marginVertical: 4,
    },
    bullet_list_icon: {
      color: theme.colors.onSurfaceVariant,
      fontWeight: "900",
      marginRight: 8,
    },
    list_item: {
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    list_item_text: {
      flex: 1,
      fontSize: 14,
      lineHeight: 20,
      color: theme.colors.onSurface,
    },
    link: {
      color: theme.colors.primary,
      textDecorationLine: "underline",
    },
    code_inline: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: radius.sm,
      paddingHorizontal: 4,
      paddingVertical: 1,
      fontFamily: "monospace",
    },
    code_block: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: radius.md,
      padding: 8,
      fontFamily: "monospace",
      marginVertical: 6,
    },
    fence: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: radius.md,
      padding: 8,
      fontFamily: "monospace",
      marginVertical: 6,
    },
    strong: {
      fontWeight: "bold",
    },
    em: {
      fontStyle: "italic",
    },
    blockquote: {
      backgroundColor: theme.colors.surfaceVariant,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
      paddingLeft: 8,
      marginVertical: 6,
    },
  });

export default MarkdownBody;
