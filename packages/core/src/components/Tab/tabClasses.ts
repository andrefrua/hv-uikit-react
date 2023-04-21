import { getClasses } from "@core/utils";

export interface HvTabClasses {
  root?: string;
  selected?: string;
  disabled?: string;
  focusVisible?: string;
}

const classKeys: string[] = ["root", "selected", "disabled", "focusVisible"];

const tabClasses = getClasses<HvTabClasses>(classKeys, "HvTab");

export default tabClasses;
