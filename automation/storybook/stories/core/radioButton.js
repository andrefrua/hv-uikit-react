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
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import RadioButtonDisabled from "../../../../packages/doc/samples/components/radioButton/radioButtonDisabled";
import RadioButtonLabel from "../../../../packages/doc/samples/components/radioButton/radioButtonLabel";
import RadioButtonLabelDisabled from "../../../../packages/doc/samples/components/radioButton/radioButtonLabelDisabled";
import RadioButtonOnChange from "../../../../packages/doc/samples/components/radioButton/radioButtonOnChange";
import RadioButtonOnChangeDisabled from "../../../../packages/doc/samples/components/radioButton/radioButtonOnChangeDisabled";
import RadioButtonSimple from "../../../../packages/doc/samples/components/radioButton/radioButtonSimple";
import RadioButtonState from "../../../../packages/doc/samples/components/radioButton/radioButtonState";

// sample scenarios
const samples = {};
samples.RadioButtonDisabled = RadioButtonDisabled;
samples.RadioButtonLabel = RadioButtonLabel;
samples.RadioButtonLabelDisabled = RadioButtonLabelDisabled;
samples.RadioButtonOnChange = RadioButtonOnChange;
samples.RadioButtonOnChangeDisabled = RadioButtonOnChangeDisabled;
samples.RadioButtonSimple = RadioButtonSimple;
samples.RadioButtonState = RadioButtonState;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreRadioButton", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);