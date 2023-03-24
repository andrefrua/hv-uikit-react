import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

export const styles = {
  closed: css({
    width: 30,
    height: "100vh",
    boxShadow: `-10px 0px 10px 1px rgba(65,65,65,0.12)`,
    backgroundColor: theme.colors.atmo3,
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: theme.zIndices.popover,
  }),
  root: css({
    backgroundColor: theme.colors.atmo3,
    right: 0,
    display: "flex",
    width: 390,
    height: "100vh",
    flexDirection: "column",
    gap: theme.space.sm,
    position: "fixed",
    borderRight: `1px solid ${theme.colors.atmo5}`,
    padding: theme.space.sm,
    overflowY: "scroll",
    zIndex: theme.zIndices.overlay,
    boxShadow: `-10px 0px 10px 1px rgba(65,65,65,0.12)`,
  }),
  label: css({
    ...theme.typography.sectionTitle,
    textTransform: "uppercase",
  }),
  code: css({
    width: "100%",
    height: 260,
    fontFamily: "Courier New",
    fontSize: "12px",
    border: `1px solid ${theme.colors.acce4}`,
  }),
  themeName: css({
    display: "flex",
    gap: 10,
    alignItems: "center",
  }),
  themeNameInput: css({
    width: "100%",
  }),
  themeBase: css({
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
  }),
};