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
import BarchartControl from "@hv/uikit-react-lab/dist/Barchart/BarchartControl";

const trace1 = {
  x: ["Group one", "Group two", "Group three"],
  y: [2300, 1000, 8500],
  name: "Sales Target",
  type: "bar",
  hoverinfo: "none"
};

const trace2 = {
  x: ["Group one", "Group two", "Group three"],
  y: [6000, 3900, 1000],
  name: "Sales Per Rep",
  type: "bar",
  hoverinfo: "none"
};

const trace3 = {
  x: ["Group one", "Group two", "Group three"],
  y: [3700, 7500, 1100],
  name: "Monthly Sales",
  type: "bar",
  hoverinfo: "none"
};

const trace4 = {
  x: ["Group one", "Group two", "Group three"],
  y: [2100, 8500, 3000],
  name: "Target",
  type: "bar",
  hoverinfo: "none"
};

const trace5 = {
  x: ["Group one", "Group two", "Group three"],
  y: [500, 8000, 9500],
  name: "Cash",
  type: "bar",
  hoverinfo: "none"
};

const data = [trace1, trace2, trace3, trace4, trace5];
const layout = {
  margin: {
    l: 50,
    r: 0,
    b: 50,
    t: 0,
    pad: 0
  },
  barmode: "group",
  bargap: 0.25,
  bargroupgap: 0.25,
  legend: {
    x: 1,
    y: 4,
    orientation: "h",
    xanchor: "right"
  },
  xaxis: {
    title: {
      text: "Axis description",
      x: 0,
      y: 0,
      xref: "paper",
      yref: "paper"
    },
    ticks: "outside",
    ticklen: 1
  },
  yaxis: {
    title: {
      text: "Thousands of Dollars ($)"
    },
    ticks: "outside",
    ticklen: 1,
    dtick: 2000,
    mirror: "allticks",
    side: "left"
  }
};

export default (
  <BarchartControl
    title="Grouped Vertical Bar Chart"
    subtitle="Sales performance (YTD)"
    data={data}
    layout={layout}
  />
);