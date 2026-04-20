import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  const item = {
    id: 1,
    address: "123 Main St, Lisbon",
    homeowner: "Ada Lovelace",
    price: 350000,
    photoURL: "https://example.com/house.jpg",
  };

  it("renders listing details and maps link", () => {
    render(<Card item={item} index={0} />);

    expect(screen.getByText(item.address)).toBeInTheDocument();
    expect(screen.getByText(item.homeowner)).toBeInTheDocument();
    expect(screen.getByText("350.000")).toBeInTheDocument();

    const link = screen.getByRole("link", {
      name: `Open ${item.address} in Google Maps`,
    });
    expect(link).toHaveAttribute(
      "href",
      `https://www.google.com/maps?q=${encodeURIComponent(item.address)}`,
    );
  });

  it("uses eager loading for above-the-fold items", () => {
    render(<Card item={item} index={0} />);

    expect(screen.getByAltText(`House at ${item.address}`)).toHaveAttribute(
      "loading",
      "eager",
    );
  });

  it("uses lazy loading for lower items", () => {
    render(<Card item={item} index={5} />);

    expect(screen.getByAltText(`House at ${item.address}`)).toHaveAttribute(
      "loading",
      "lazy",
    );
  });
});
