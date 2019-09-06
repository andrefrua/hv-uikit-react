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
import { mount } from "enzyme";
import HvProvider from "@hv/uikit-react-core/dist/Provider";
import TimeIcon from "@hv/uikit-react-icons/dist/Time.S";
import { ClickAwayListener } from "@material-ui/core";
import TimePickerWithStyles from "../index";
import TimePicker from "../TimePicker";
import Popper from "../../DatePickerDS/Popper";
import { PeriodPickerOptions, TimeFormat } from "../enums";
import * as converters from "../timePickerConverter";
import * as formatters from "../timePickerFormatter";
import Typography from "../../../../core/dist/Typography/Typography";
import UnitTimePicker from "../UnitTimePicker";
import PeriodPicker from "../PeriodPicker";

jest.mock("../timePickerConverter", () => ({
  getTimeWithFormat24: jest.fn(() => "mockGetTimeWithFormat24"),
  getHoursForTimeFormat: hours => hours
}));

jest.mock("../timePickerFormatter", () => ({
  padTime: () => "mockPadTime",
  getFormattedTime: () => "mockGetFormattedTime",
  getTimeFormatForLocale: () => "mockGetTimeFormatForLocale"
}));

describe("TimePicker", () => {
  let wrapper;
  let timePickerComponent;
  let timePickerInstance;
  let mockOnChange;
  const defaultSelectedTime = {
    hours: 10,
    minutes: 20,
    seconds: 30,
    period: PeriodPickerOptions.PM
  };
  const mockTitle = "mockTitle";

  beforeEach(async () => {
    mockOnChange = jest.fn();
    wrapper = mount(
      <HvProvider>
        <TimePickerWithStyles
          hours={defaultSelectedTime.hours}
          minutes={defaultSelectedTime.minutes}
          seconds={defaultSelectedTime.seconds}
          period={defaultSelectedTime.period}
          onChange={mockOnChange}
          labels={{
            title: mockTitle
          }}
        />
      </HvProvider>
    );
    timePickerComponent = wrapper.find(TimePicker);
    timePickerInstance = timePickerComponent.instance();
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("handleTimePopperClickAway - should cancel the time selection", () => {
    const spy = jest.spyOn(timePickerInstance, "cancelTimeSelection");
    timePickerInstance.handleTimePopperClickAway();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("handleTimeIconClick - should set the state accordingly", () => {
    const mockEvent = {
      currentTarget: {
        parentElement: "mockParentElement"
      }
    };
    timePickerComponent.setState({ timePopperOpen: false });
    const spy = jest.spyOn(timePickerInstance, "setTimePopperState");
    timePickerInstance.handleTimeIconClick(mockEvent);
    expect(spy).toHaveBeenCalledWith("mockParentElement", true);
  });

  it("cancelTimeSelection - should set the state accordingly", () => {
    const spy = jest.spyOn(timePickerInstance, "setTimePopperState");
    timePickerInstance.cancelTimeSelection();
    expect(spy).toHaveBeenCalledWith(null, false);
  });

  it("handleHoursChange - should set the selectedTime in the state with the newest hours", () => {
    const spy = jest.spyOn(timePickerInstance, "onSelectedTimeChange");
    timePickerInstance.handleHoursChange(11);
    expect(spy).toHaveBeenCalledWith({
      ...defaultSelectedTime,
      hours: 11
    });
  });

  it("handleMinutesChange - should set the selectedTime in the state with the newest minutes", () => {
    const spy = jest.spyOn(timePickerInstance, "onSelectedTimeChange");
    timePickerInstance.handleMinutesChange(21);
    expect(spy).toHaveBeenCalledWith({
      ...defaultSelectedTime,
      minutes: 21
    });
  });

  it("handleSecondsChange - should set the selectedTime in the state with the newest seconds", () => {
    const spy = jest.spyOn(timePickerInstance, "onSelectedTimeChange");
    timePickerInstance.handleSecondsChange(31);
    expect(spy).toHaveBeenCalledWith({
      ...defaultSelectedTime,
      seconds: 31
    });
  });

  it("handleChangePeriod - should set the selectedTime in the state with the newest period", () => {
    const spy = jest.spyOn(timePickerInstance, "onSelectedTimeChange");
    timePickerInstance.handleChangePeriod(PeriodPickerOptions.AM);
    expect(spy).toHaveBeenCalledWith({
      ...defaultSelectedTime,
      period: PeriodPickerOptions.AM
    });
  });

  it("setTimePopperState - should change the time popper state (anchor and open props)", () => {
    const mockAnchor = "mockAnchor";
    const mockOpen = "mockOpen";
    timePickerInstance.setTimePopperState(mockAnchor, mockOpen);
    expect(timePickerInstance.state.timePopperAnchor).toBe(mockAnchor);
    expect(timePickerInstance.state.timePopperOpen).toBe(mockOpen);
  });

  it("setTimePopperPlacement - should change the time popper state (placement prop)", () => {
    const mockPlacement = "mockPlacement";
    timePickerComponent.setState({ timePopperPlacement: "default" });
    wrapper.update();
    timePickerInstance.setTimePopperPlacement(mockPlacement);
    expect(timePickerInstance.state.timePopperPlacement).toBe(mockPlacement);
  });

  it("onSelectedTimeChange - should change the selectedTime in the state", () => {
    const mockSelectedTime = {
      hours: 11,
      minutes: 21,
      seconds: 31,
      period: PeriodPickerOptions.AM
    };
    timePickerInstance.onSelectedTimeChange(mockSelectedTime);
    expect(timePickerInstance.state.selectedTime).toEqual(mockSelectedTime);
  });

  it("onSelectedTimeChange - should call onChange callback with the selected time in 24h format", () => {
    const mockSelectedTime = "mockSelectedTime";
    const mockTimeFormat = "mockTimeFormat";
    timePickerComponent.setState({ timeFormat: mockTimeFormat });
    timePickerInstance.onSelectedTimeChange(mockSelectedTime);
    expect(converters.getTimeWithFormat24).toHaveBeenCalledWith(
      mockSelectedTime,
      mockTimeFormat
    );
    expect(mockOnChange).toHaveBeenCalledWith("mockGetTimeWithFormat24");
  });

  it("getTimeFormat - should return timeFormat prop if defined", () => {
    const mockTimeFormat = "mockTimeFormat";
    const wrapperTimeFormat = mount(
      <HvProvider>
        <TimePickerWithStyles timeFormat={mockTimeFormat} />
      </HvProvider>
    );
    const instanceTimeFormat = wrapperTimeFormat.find(TimePicker).instance();
    expect(instanceTimeFormat.getTimeFormat()).toBe(mockTimeFormat);
  });

  it("getTimeFormat - should return the result from getFormatTimeLocale when there is no timeFormat prop defined", () => {
    const result = formatters.getTimeFormatForLocale();
    expect(timePickerInstance.getTimeFormat()).toBe(
      result
    );
  });

  it("isPopperBelowParent - should return true if the popper placement is bottom", () => {
    timePickerComponent.setState({ timePopperPlacement: "bottom-something" });
    expect(timePickerInstance.isPopperBelowParent()).toBe(true);
  });

  it("isPopperBelowParent - should return false if the popper placement isn't bottom", () => {
    timePickerComponent.setState({ timePopperPlacement: "something" });
    expect(timePickerInstance.isPopperBelowParent()).toBe(false);
  });

  it("renderLabel - should render the label", () => {
    const Label = timePickerInstance.renderLabel;
    const LabelWrapper = mount(
      <HvProvider>
        <Label />
      </HvProvider>
    );
    expect(LabelWrapper.find(Typography)).toHaveLength(1);
    expect(LabelWrapper.find(Typography).at(0).text()).toBe(mockTitle);
  });

  it("renderInput - should render the input", () => {
    const Input = timePickerInstance.renderInput;
    const InputWrapper = mount(
      <HvProvider>
        <Input />
      </HvProvider>
    );
    expect(InputWrapper.find("input")).toHaveLength(1);
    expect(InputWrapper.find(TimeIcon)).toHaveLength(1);
  });

  it("renderPopper - should render the popper", () => {
    timePickerComponent.setState({
      timePopperOpen: true,
      timePopperAnchor: null
    });
    const spyRenderContent = jest.spyOn(timePickerInstance, "renderTimePopperContent");
    const PopperComp = timePickerInstance.renderPopper;
    const PopperWrapper = mount(
      <HvProvider>
        <PopperComp />
      </HvProvider>
    );
    expect(PopperWrapper.find(Popper)).toHaveLength(1);
    expect(spyRenderContent).toHaveBeenCalledTimes(1);
  });

  it("renderTimePopperContent - should render the UnitTimePickers and PeriodPicker", () => {
    timePickerComponent.setState({ timeFormat: TimeFormat.H12 });
    const PopperContent = timePickerInstance.renderTimePopperContent;
    const PopperContentWrapper = mount(
      <HvProvider>
        <PopperContent />
      </HvProvider>
    );
    expect(PopperContentWrapper.find(UnitTimePicker)).toHaveLength(3);
    expect(PopperContentWrapper.find(PeriodPicker)).toHaveLength(1);
  });

  it("renderTimePopperContent - should render the UnitTimePickers but not the PeriodPicker", () => {
    timePickerComponent.setState({ timeFormat: TimeFormat.H24 });
    const PopperContent = timePickerInstance.renderTimePopperContent;
    const PopperContentWrapper = mount(
      <HvProvider>
        <PopperContent />
      </HvProvider>
    );
    expect(PopperContentWrapper.find(UnitTimePicker)).toHaveLength(3);
    expect(PopperContentWrapper.find(PeriodPicker)).toHaveLength(0);
  });

  it("render - should render the input and the popper", () => {
    const spyInput = jest.spyOn(timePickerInstance, "renderInput");
    const spyPopper = jest.spyOn(timePickerInstance, "renderPopper");
    timePickerInstance.forceUpdate();
    expect(wrapper.find(ClickAwayListener)).toHaveLength(1);
    expect(spyInput).toHaveBeenCalledTimes(1);
    expect(spyPopper).toHaveBeenCalledTimes(1);
  });
});