import { getClasses } from "~/utils";

export interface HvBannerClasses {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the component root class when the component is closed. */
  rootClosed?: string;
  /** Styles applied to the component when define as top. */
  anchorOriginTopCenter?: string;
  /** Styles applied to the component when define as bottom. */
  anchorOriginBottomCenter?: string;
}

const classKeys: string[] = [
  "root",
  "rootClosed",
  "anchorOriginTopCenter",
  "anchorOriginBottomCenter",
];

const bannerClasses = getClasses<HvBannerClasses>(classKeys, "HvBanner");

export default bannerClasses;
