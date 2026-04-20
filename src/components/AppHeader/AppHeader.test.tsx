import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppHeader } from "./AppHeader";

describe("AppHeader", () => {
  it("renders the brand title and logo", () => {
    render(<AppHeader />);

    expect(screen.getByText("Home Vision")).toBeInTheDocument();

    const logo = screen.getByAltText("Home Vision logo");
    expect(logo).toBeInTheDocument();
  });
});
