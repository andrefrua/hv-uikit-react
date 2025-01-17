import { getClasses } from "~/utils";

export type HvHeaderActionsClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

const headerActionsClasses = getClasses<HvHeaderActionsClasses>(
  classKeys,
  "HvHeader-Actions"
);

export default headerActionsClasses;
