import { getClasses } from "~/utils";

export type HvListContainerClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

const listContainerClasses = getClasses<HvListContainerClasses>(
  classKeys,
  "HvListContainer"
);

export default listContainerClasses;
