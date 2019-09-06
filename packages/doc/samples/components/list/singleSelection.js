import React from "react";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  {
    label: "Share"
  },
  {
    label: "Edit"
  },
  {
    label: "Remove"
  },
  {
    label: "Delete"
  },
  {
    label: "Updateaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
];

export default (
  <div style={{ width: 200 }}>
    <List values={data} selectDefault hasTooltips />
  </div>
);