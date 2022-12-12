import { HvBox, HvButton, HvTypography } from "@hitachivantara/uikit-core";
import { Draw } from "@hitachivantara/uikit-icons";
import { ButtonConfigurator } from "../../components/ButtonConfigurator";

export const Buttons = () => {
  return (
    <>
      <ButtonConfigurator />
      <HvBox sx={{ display: "flex", gap: 20 }}>
        <HvButton
          variant="primary"
          onClick={() => alert("This can be triggered")}
          startIcon={<Draw />}
        >
          Primary
        </HvButton>
        <HvButton variant="primarySubtle" startIcon={<Draw />}>
          Primary Subtle
        </HvButton>
        <HvButton variant="primaryGhost" startIcon={<Draw />}>
          Primary Ghost
        </HvButton>
        <HvButton variant="secondary" startIcon={<Draw />}>
          Secondary Subtle
        </HvButton>
        <HvButton variant="secondaryGhost" startIcon={<Draw />}>
          Secondary Ghost
        </HvButton>
      </HvBox>
      <HvBox sx={{ display: "flex", gap: 20 }}>
        <HvButton disabled variant="primary" startIcon={<Draw />}>
          Primary
        </HvButton>
        <HvButton disabled variant="primarySubtle" startIcon={<Draw />}>
          Primary Subtle
        </HvButton>
        <HvButton disabled variant="primaryGhost" startIcon={<Draw />}>
          Primary Ghost
        </HvButton>
        <HvButton
          disabled
          overrideIconColors={false}
          variant="secondary"
          startIcon={<Draw />}
        >
          Secondary Subtle
        </HvButton>
        <HvButton
          disabled
          overrideIconColors={false}
          variant="secondaryGhost"
          startIcon={<Draw />}
        >
          Secondary Ghost
        </HvButton>
      </HvBox>
      <HvBox
        sx={{ display: "flex", gap: 20, backgroundColor: "#D3E3F6", p: 4 }}
      >
        <HvTypography variant="title1">Semantic</HvTypography>
        <HvButton variant="semantic" startIcon={<Draw />}>
          Primary
        </HvButton>
      </HvBox>
    </>
  );
};

if (process.env.NODE_ENV !== "production") {
  Buttons.displayName = "Buttons";
}