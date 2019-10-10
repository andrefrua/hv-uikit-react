/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import AssetInventoryListView, {
  HvListViewRow,
  HvListViewCell
} from "@hv/uikit-react-core/dist/AssetInventory/ListView";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Level1 from "@hv/uikit-react-icons/dist/DawnTheme/Level1.sema10.S";
import Level2 from "@hv/uikit-react-icons/dist/DawnTheme/Level2.sema11.S";
import Level3 from "@hv/uikit-react-icons/dist/DawnTheme/Level3.sema12.S";
import Level4 from "@hv/uikit-react-icons/dist/DawnTheme/Level4.sema13.S";
import Level5 from "@hv/uikit-react-icons/dist/DawnTheme/Level5.sema14.S";

const values = [
  {
    id: "1",
    status: 3,
    event: {
      description: "Risk of downtime on Truck 12",
      timestamp: "just now",
      schedule: "fix 3rd shift"
    },
    probability: "88%",
    timeHorizon: "23h",
    relatedAssets: "Track A, Load 1 Brake"
  },
  {
    id: "2",
    status: 5,
    event: {
      description: "Track severe breakdown",
      timestamp: "2 minutes ago",
      schedule: "fix now"
    },
    probability: "92%",
    timeHorizon: "8h",
    relatedAssets: "Track A, Zone 15 Brake"
  },
  {
    id: "3",
    status: 1,
    event: {
      description: "Risk of downtime associated",
      timestamp: "2 hours ago",
      schedule: "fix 3rd shift"
    },
    probability: "90%",
    timeHorizon: "20h",
    relatedAssets: "Track B, Load 2 Brake"
  }
];

const Row = ({classes, status, value}) => {

  const { Icon } = status;

  return (
  <HvListViewRow checkboxValue={value.id}>

    <HvListViewCell semantic={status.sema}>
      <Icon className={classes.icon}/> 
    </HvListViewCell>

    <HvListViewCell>
    <div style={{ display: "inline-flex"}}>
      <HvTypography variant="highlightText">
          {value.event.description}
        </HvTypography>
        <HvTypography className={classes.timestamp} variant="infoText">
          {value.event.timestamp}
        </HvTypography>
        <HvTypography style={{ paddingTop: "2px"}} variant="infoText">{value.event.schedule}</HvTypography>
    </div>
    </HvListViewCell>

    <HvListViewCell>
      <HvTypography variant="normalText">{value.probability}</HvTypography>
    </HvListViewCell>

    <HvListViewCell>
      <HvTypography variant="normalText">{value.timeHorizon}</HvTypography>
    </HvListViewCell>

    <HvListViewCell>
      <HvTypography variant="normalText">
        {value.relatedAssets}
      </HvTypography>
    </HvListViewCell>

  </HvListViewRow>
)}

const styles = theme => ({
  timestamp: {
    padding: `2px ${theme.hv.spacing.xs}px 0 ${theme.hv.spacing.xs}px`,
    marginRight: "10px",
    borderRight: `solid 2px ${theme.hv.palette.atmosphere.atmo5}`
  },
  icon: {
    display: "block"
  }
})

const StyledRow = withStyles(styles, { withTheme: true })(Row);

const rowRenderer = (value) => {
  
  const status = {
    Icon: null,
    sema: "sema1"
  }
  ;
  switch (value.status) {
    default:
    case 1:
      status.Icon = Level1;
      status.sema = "sema10";
      break;
    case 2:
      status.Icon = Level2;
      status.sema = "sema11";
      break;
    case 3:
      status.Icon = Level3;
      status.sema = "sema12";
      break;
    case 4:
      status.Icon = Level4;
      status.sema = "sema13";
      break;
    case 5:
      status.Icon = Level5;
      status.sema = "sema14";
      break;
  }

  return (
    <StyledRow
      status={status}
      value={value}
    />
  );
};

const configuration = {
  onSelection: event => {alert("this " + event.target.value)},
  isSelectable: false,
  columnConfiguration: [
    {
      title: "Status",
      style: {
        paddingLeft: "8px",
        width: "52px"
      },
      align: "left"
    },
    {
      title: "Event",
      style: {
       width: "370px"
      },
      align: "left"
    },
    {
      title: "Probability",
      style: {
        width: "93px"
      },
      align: "right"
    },
    {
      title: "Time horizon",
      style: {
        width: "108px"
      },
      align: "right"
    },
    {
      title: "Related Assets",
      style: {
        width: "195px",
        paddingLeft: "30px"
      },
      align: "left"
    }
  ],
  actions: [
    { id: "1", label: "Dismiss", disabled: false },
    { id: "2", label: "Accept", disabled: false },
    { id: "3", label: "Decline", disabled: false },
    { id: "4", label: "Eject", disabled: false },
  ],
  maxVisibleActions: 2,
  actionsCallback:(id, action) => {alert("You have pressed" + id + "with action" + action.label)}
}

export default (
  <AssetInventoryListView
    values={values}
    renderer={rowRenderer}
    viewConfiguration={configuration}
  />
);
