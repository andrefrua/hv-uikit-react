import styled from "@emotion/styled";
import { FixedSizeList } from "react-window";
import {
  HvCheckBox,
  HvLink,
  HvListItem,
  HvRadio,
  checkBoxClasses,
  radioClasses,
  listItemClasses,
} from "components";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "utils/transientOptions";
import { DropRightXS } from "@hitachivantara/uikit-icons";

export const StyledFixedSizeList = styled(FixedSizeList)({
  marginBottom: 5,
});

export const StyledSelectAllCheckBox = styled(HvCheckBox)({
  width: "100%",
  margin: "0 0 2px 0",

  position: "relative",
  zIndex: 0,

  // prevent the focus ring to be hidden by sibling hover background
  "&:focus-within": {
    zIndex: 1,
  },
  // IE fallback code (using focus-within-polyfill)
  "&.focus-within": {
    zIndex: 1,
  },
});

export const StyledMultiSelectCheckBox = styled(HvCheckBox)({
  [`& .${checkBoxClasses.root}`]: {
    width: "100%",
    zIndex: 0,
  },
  [`& .${checkBoxClasses.container}`]: {
    "&:hover": {
      backgroundColor: "transparent",
    },

    "&:focus-within": {
      backgroundColor: "transparent",
      outline: "none",
      boxShadow: "none",
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within": {
      backgroundColor: "transparent",
      outline: "none",
      boxShadow: "none",
    },
  },
  [`& .${checkBoxClasses.label}`]: {
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export const StyledLink = styled(HvLink)({
  color: theme.colors.acce1,
  fontSize: "12px",
  letterSpacing: "0.02em",
  lineHeight: "16px",
  fontWeight: 400,
  textDecoration: "none",

  "&:focus": {
    boxShadow: "unset !important",
  },
});

export const StyledSingleSelectRadio = styled(HvRadio)({
  [`& .${radioClasses.root}`]: {
    width: "100%",
    zIndex: 0,
  },
  [`& .${radioClasses.container}`]: {
    "&:hover": {
      backgroundColor: "transparent",
    },

    "&:focus-within": {
      backgroundColor: "transparent",
      outline: "none",
      boxShadow: "none",
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within": {
      backgroundColor: "transparent",
      outline: "none",
      boxShadow: "none",
    },
  },
  [`& .${radioClasses.label}`]: {
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export const StyledListItem = styled(
  HvListItem,
  transientOptions
)(({ $applySelected }: { $applySelected: boolean }) => ({
  [`& .${listItemClasses.selected}`]: {
    ...($applySelected && {
      "&:not(:hover):not(.HvIsFocused):not(:focus-within)": {
        backgroundColor: "transparent",
      },
      "&:not(:hover):not(.HvIsFocused):not(.focus-within)": {
        backgroundColor: "transparent",
      },
    }),
  },
}));

export const StyledDropRightXS = styled(DropRightXS)({
  width: "32px",
  height: "32px",
  marginLeft: "auto",
});
