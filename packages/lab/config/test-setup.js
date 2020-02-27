/* eslint-disable import/no-extraneous-dependencies */

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Had to add this due a problem when running unit tests on component that have Popper.Js being used.
if (global.document)
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document
    }
  });

configure({ adapter: new Adapter() });
