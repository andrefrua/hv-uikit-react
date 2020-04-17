import React, { useState } from "react";
import { withStyles } from "@material-ui/core/";
import { Unlock } from "@hv/uikit-react-icons/dist";
import {
  HvButton,
  HvInput,
  HvModal,
  HvModalActions,
  HvModalContent,
  HvModalTitle,
  HvTable,
  HvTextArea,
  HvTypography
} from "../..";

/* eslint-disable react/prop-types */

export default {
  title: "Components/Modal",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvModal } from '@hv/uikit-react-core/dist'"
  },
  component: HvModal,
  subcomponents: { HvModalTitle, HvModalContent, HvModalActions }
};

const SimpleModal = ({ buttonMessage, title, content, classes }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvButton id={buttonMessage} style={{ width: "120px" }} onClick={() => setOpen(true)}>
        {buttonMessage}
      </HvButton>
      <HvModal id="test" classes={classes} open={open} onClose={() => setOpen(false)}>
        {title}
        {content || (
          <HvModalContent>
            Switching to model view will clear all the fields in your visualization. You will need
            to re-select your fields.
          </HvModalContent>
        )}
        <HvModalActions>
          <HvButton id="switchAnyway" category="ghost">
            Apply
          </HvButton>
          <HvButton id="cancel" category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvModalActions>
      </HvModal>
    </div>
  );
};

export const Main = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvButton id="openModal" style={{ width: "120px" }} onClick={() => setOpen(true)}>
        Open Modal
      </HvButton>
      <HvModal id="test" open={open} onClose={() => setOpen(false)}>
        <HvModalTitle variant="warning">Switch model view?</HvModalTitle>
        <HvModalContent>
          Switching to model view will clear all the fields in your visualization. You will need to
          re-select your fields.
        </HvModalContent>
        <HvModalActions>
          <HvButton id="switchAnyway" category="ghost">
            Apply
          </HvButton>
          <HvButton id="cancel" category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvModalActions>
      </HvModal>
    </div>
  );
};

export const TextAndSemantic = () => (
  <>
    <SimpleModal
      buttonMessage="No Icon"
      title={<HvModalTitle showIcon={false}>Are you sure?</HvModalTitle>}
    />
    <p />
    <SimpleModal
      buttonMessage="Warning"
      title={<HvModalTitle variant="warning">Are you sure?</HvModalTitle>}
    />
    <p />
    <SimpleModal
      buttonMessage="Info"
      title={<HvModalTitle variant="info">Are you sure?</HvModalTitle>}
    />
    <p />
    <SimpleModal
      buttonMessage="Error"
      title={<HvModalTitle variant="error">Are you sure?</HvModalTitle>}
    />
  </>
);

TextAndSemantic.story = {
  parameters: {
    docs: {
      storyDescription:
        "The modal allow the definition of variants, that alters the presented icon."
    }
  }
};

export const CustomIcon = () => (
  <SimpleModal
    buttonMessage="Custom icon"
    title={<HvModalTitle customIcon={<Unlock iconSize="M" />}>Are you sure?</HvModalTitle>}
  />
);

CustomIcon.story = {
  parameters: {
    docs: {
      storyDescription:
        "The standard icon can be replaced by a custom or just removed. The firstFocusable is set to the Switch Away button."
    }
  }
};

export const CustomContent = () => {
  const inputStyles = {
    root: {
      width: 555
    },
    label: {
      paddingTop: 0,
      paddingBottom: "10px",
      display: "block"
    },
    infoText: {
      paddingBottom: 20
    }
  };

  const textAreaStyles = {
    root: {
      paddingTop: 30,
      width: 555
    }
  };

  const contentStyles = {
    paper: {
      width: "100%"
    }
  };

  const InputWithStyles = withStyles(inputStyles)(HvInput);
  const TextAreaWithStyles = withStyles(textAreaStyles)(HvTextArea);
  const ModalWithStyles = withStyles(contentStyles)(SimpleModal);

  return (
    <>
      <ModalWithStyles
        buttonMessage="Table"
        title={
          <HvModalTitle>
            <div>
              <HvTypography variant="xxsTitle">LHR-HDIFS-03</HvTypography>
              <HvTypography variant="normalText">HDI</HvTypography>
            </div>
          </HvModalTitle>
        }
        content={
          <HvModalContent>
            <HvTable
              data={[
                { id: 1, customer: "Blauer See Auto, Co.", dealSize: "Small" },
                { id: 2, customer: "Blauer See Auto, Co.", dealSize: "Small" },
                { id: 3, customer: "Blauer See Auto, Co.", dealSize: "Medium" },
                { id: 4, customer: "Online Diecast Creation", dealSize: "Medium" },
                { id: 5, customer: "Vitachrome Inc.", dealSize: "Small" }
              ]}
              columns={[
                {
                  headerText: "Customer",
                  accessor: "customer",
                  cellType: "alpha-numeric",
                  sortable: false,
                  width: "150px"
                },
                {
                  headerText: "Dealsize",
                  accessor: "dealSize",
                  cellType: "alpha-numeric",
                  sortable: false,
                  width: "150px"
                }
              ]}
              showPagination={false}
            />
          </HvModalContent>
        }
      />
      <p />
      <SimpleModal
        buttonMessage="Inputs"
        title={<HvModalTitle showIcon={false}>Work Request</HvModalTitle>}
        content={
          <HvModalContent>
            <InputWithStyles
              labels={{
                placeholder: "Enter text",
                inputLabel: "Title"
              }}
              fullWidth
              showInfo={false}
            />
            <TextAreaWithStyles
              id="outlined-with-placeholder"
              labels={{
                placeholder: "Enter text",
                inputLabel: "Description"
              }}
              multiline
              rows={3}
            />
          </HvModalContent>
        }
      />
    </>
  );
};

CustomContent.story = {
  parameters: {
    docs: {
      storyDescription: "It is possible to insert any component in the modal."
    }
  }
};