/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import DropZoneWithStyles from "..";

let wrapper;

const DEFAULT_LABELS = {
  progressConjunction: "of",
  dropzoneLabel: "My Label",
  sizeWarningLabel: "Max. file size:",
  dragText: "Drag and drop or ",
  selectFilesText: "Select files",
  dropFilesText: "Drop files here",
  fileSizeError: "The file exceeds the maximum upload size",
  fileTypeError: "File type not allowed for upload",
  removeFileButtonLabel: "Remove File"
};

const fileList = [
  {
    name: "Screenshot 2019-12-05 at 17.15.43.png",
    size: 141,
    type: "image/png"
  },
  {
    name: "Screenshot 2019-12-05 at 12.03.13.png",
    size: 875,
    type: "image/png"
  }
];

const onClickCallback = jest.fn();

const setupComponent = (props = {}) =>
  mount(
    <HvProvider>
      <DropZoneWithStyles {...props} />
    </HvProvider>
  );

const compProps = {
  fileList,
  onFilesAdded: onClickCallback,
  onFileRemoved: onClickCallback,
  labels: DEFAULT_LABELS,
  acceptedFiles: [],
  maxFileSize: 1,
  onDragEnter: onClickCallback,
  onDragLeave: onClickCallback,
  onDropCapture: onClickCallback
};

describe("Dropzone withStyles", () => {
  beforeEach(() => {
    wrapper = setupComponent(compProps);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correctly when disabled", () => {
    wrapper = setupComponent({
      ...compProps,
      disabled: true,
      multiple: false
    });
    expect(wrapper).toMatchSnapshot();
  });
});
