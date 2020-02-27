import React from "react";
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";

import Map from "@hv/uikit-react-icons/dist/Generic/Map";
import LocationPin from "@hv/uikit-react-icons/dist/Generic/LocationPin";

const buttonsDefinitions = [
  { id: "map", value: "Map", icon: <Map />, selected: true },
  { id: "satellite", value: "Satellite", icon: <LocationPin /> }
];

export default (
  <div style={{ width: "120px" }}>
    <MultiButton buttons={buttonsDefinitions} vertical type={"mixed"} />
  </div>
);
