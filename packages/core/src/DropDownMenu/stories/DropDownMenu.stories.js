import React, { useState } from "react";
import { Calendar, Plane, User } from "@hv/uikit-react-icons/dist";
import { wait, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { HvButton, HvDropDownMenu } from "../..";

/* eslint-disable react/prop-types */

export default {
  title: "Components/Dropdown Menu",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvDropDownMenu } from '@hv/uikit-react-core/dist'"
  },
  component: HvDropDownMenu,
  decorators: [
    storyFn => <div style={{ display: "flex", justifyContent: "center" }}>{storyFn()}</div>
  ]
};

export const Main = () => (
  <HvDropDownMenu
    onClick={(e, item) => console.log(item.label)}
    dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
  />
);

export const Positioning = () => {
  const [position, setPosition] = useState("right");
  return (
    <HvDropDownMenu
      placement={position}
      keepOpened
      onClick={(e, item) => setPosition(item.value)}
      dataList={[
        { label: "Left", value: "left" },
        { label: "Right", value: "right" }
      ]}
    />
  );
};

Positioning.story = {
  parameters: {
    docs: {
      storyDescription: "DropDownMenu with configurable positioning in the dropdown"
    }
  }
};

export const WithIconsAndActions = () => {
  const iconSelectedColor = Icon => ({ isSelected }) => (
    <Icon color={isSelected ? "atmo1" : undefined} />
  );

  return (
    <HvDropDownMenu
      id="dropdownmenu-with-icons-and-actions"
      placement="right"
      onClick={(e, item) => console.log(item.label)}
      aria-label="dropdownMenu-3"
      dataList={[
        { label: "Label 1", iconCallback: iconSelectedColor(User) },
        { label: "Label 2", iconCallback: iconSelectedColor(Calendar) },
        { label: "Label 3", iconCallback: iconSelectedColor(Plane) }
      ]}
    />
  );
};

WithIconsAndActions.story = {
  parameters: {
    docs: {
      storyDescription:
        "DropDownMenu with Icons and Actions. Icons should be colored accordingly when selected"
    },
    pa11y: {
      actions: [
        // open menu before testing
        "click element #dropdownmenu-with-icons-and-actions-icon-button",
        "wait for element #dropdownmenu-with-icons-and-actions-list to be visible"
      ]
    }
  }
};

export const Disabled = () => (
  <HvDropDownMenu
    disabled
    id="dropMenu"
    onClick={(e, item) => console.log(item.label)}
    disablePortal={false}
    aria-label="dropdownMenu-4"
    dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
  />
);

export const DisabledItems = () => (
  <HvDropDownMenu
    id="dpmDisabledItems"
    aria-label="dropdownMenu-DisabledItems"
    dataList={[{ label: "Label 1" }, { label: "Label 2", disabled: true }, { label: "Label 3" }]}
  />
);

export const Controlled = () => {
  const ControlledDropdownMenu = () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <HvButton
          category="ghost"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Click
        </HvButton>
        <HvDropDownMenu
          id="dropMenu"
          expanded={open}
          onClick={(e, item) => console.log(item.label)}
          disablePortal={false}
          aria-label="dropdownMenu-1"
          keepOpened={false}
          dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
        />
      </>
    );
  };

  return <ControlledDropdownMenu />;
};

Controlled.story = {
  parameters: {
    docs: {
      storyDescription: "DropDownMenu toggle opening controlled by an external button"
    }
  }
};

export const KeyboardNavigation = () => (
  <>
    <HvButton id="button1">button1</HvButton>
    <HvDropDownMenu
      id="dpmKeepOpenedFalse"
      dataList={[{ label: "Label 1" }, { label: "Label 2", disabled: true }, { label: "Label 3" }]}
      onClick={(e, item) => console.log(item.label)}
      keepOpened={false}
    />
    <HvButton id="button2">button2</HvButton>
  </>
);

KeyboardNavigation.story = {
  parameters: {
    docs: {
      disable: true
    }
  }
};

export const A11YClosed = () => (
  <HvDropDownMenu
    id="dropdownmenu-closed"
    onClick={(e, item) => console.log(item.label)}
    dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
  />
);

A11YClosed.story = {
  parameters: {
    docs: {
      disable: true
    }
  }
};

export const A11YOpen = () => (
  <HvDropDownMenu
    id="dropdownmenu-open"
    onClick={(e, item) => console.log(item.label)}
    dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
  />
);

A11YOpen.story = {
  parameters: {
    docs: {
      disable: true
    },
    pa11y: {
      actions: [
        // open menu before testing
        "click element #dropdownmenu-open-icon-button",
        "wait for element #dropdownmenu-open-list to be visible"
      ]
    }
  }
};

// __________________________________
// Extended applitools test scenarios

// test scenario, With Icons And Actions opened
export const IconsOpened = () => WithIconsAndActions();

IconsOpened.story = {
  parameters: {
    docs: {
      disable: true
    },
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("button", { name: /dropdownmenu-3/i }));
        return wait(() => screen.getByText("Label 3"));
      }
    }
  }
};

// test scenario, Disabled Items opened
export const DisabledItemsOpened = () => DisabledItems();

DisabledItemsOpened.story = {
  parameters: {
    docs: {
      disable: true
    },
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("button", { name: /dropdownmenu-disableditems/i }))
        return wait(() => screen.getByText("Label 3"))
      }
    }
  }
};
