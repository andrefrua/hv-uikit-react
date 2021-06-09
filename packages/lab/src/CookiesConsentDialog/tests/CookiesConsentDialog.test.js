/* eslint-env jest */

import React from "react";

import { render } from "testing-utils";

import { HvCookiesConsentDialog } from "../..";

import { Main } from "../stories/CookiesConsentDialog.stories";

describe("CookiesConsentDialog", () => {
  describe("sample snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general", () => {
    it("renders the component as expected", () => {
      const { getByRole } = render(<HvCookiesConsentDialog open />);

      const container = getByRole("dialog");

      expect(container).toBeInTheDocument();
    });
  });
});
