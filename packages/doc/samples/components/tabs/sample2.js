import React from "react";
import HvTab from "@hv/uikit-react-core/dist/Tab";
import HvTabs from "@hv/uikit-react-core/dist/Tabs";

function Sample2() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <HvTabs variant="fullWidth" value={value} onChange={handleChange}>
      <HvTab label="Clicable tab"></HvTab>
      <HvTab label="Clicable tab"></HvTab>
      <HvTab label="Clicable tab"></HvTab>
    </HvTabs>
  );
}


export default <Sample2/>