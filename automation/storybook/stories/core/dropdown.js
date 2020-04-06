import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import Dropdown1 from "../../../../packages/doc/samples/components/dropdown/dropdown1";
import Dropdown2 from "../../../../packages/doc/samples/components/dropdown/dropdown2";
import Dropdown4 from "../../../../packages/doc/samples/components/dropdown/dropdown4";
import Dropdown5 from "../../../../packages/doc/samples/components/dropdown/dropdown5";
import Dropdown6 from "../../../../packages/doc/samples/components/dropdown/dropdown6";
import Dropdown7 from "../../../../packages/doc/samples/components/dropdown/dropdown7";
import Dropdown8 from "../../../../packages/doc/samples/components/dropdown/dropdown8";
import Dropdown9 from "../../../../packages/doc/samples/components/dropdown/dropdown9";
import Dropdown10 from "../../../../packages/doc/samples/components/dropdown/dropdown10";
import Dropdown11 from "../../../../packages/doc/samples/components/dropdown/dropdown11";
import Dropdown12 from "../../../../packages/doc/samples/components/dropdown/dropdown12";
// sample scenarios
const samples = {};

samples.Dropdown1 = Dropdown1;
samples.Dropdown2 = Dropdown2;
samples.Dropdown4 = Dropdown4;
samples.Dropdown5 = Dropdown5;
samples.Dropdown6 = Dropdown6;
samples.Dropdown7 = Dropdown7;
samples.Dropdown8 = Dropdown8;
samples.Dropdown9 = Dropdown9;
samples.Dropdown10 = Dropdown10;
samples.Dropdown11 = Dropdown11;
samples.Dropdown12 = Dropdown12;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreDropdown", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);
