import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { Link } from "./Link";

describe("Link", () => {
  it("should render correctly", () => {
    const { container } = render(<Link>text</Link>);
    expect(container).toBeDefined();
  });
});
