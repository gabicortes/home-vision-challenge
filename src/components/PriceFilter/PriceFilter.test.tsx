import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PriceFilter } from "./PriceFilter";

describe("PriceFilter", () => {
  it("keeps clear button disabled when both fields are empty", () => {
    render(
      <PriceFilter
        minPriceInput=""
        maxPriceInput=""
        onMinPriceChange={vi.fn()}
        onMaxPriceChange={vi.fn()}
        onClear={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Clear" })).toBeDisabled();
  });

  it("calls handlers when typing and clearing", async () => {
    const user = userEvent.setup();
    const onMinPriceChange = vi.fn();
    const onMaxPriceChange = vi.fn();
    const onClear = vi.fn();

    render(
      <PriceFilter
        minPriceInput="100"
        maxPriceInput="200"
        onMinPriceChange={onMinPriceChange}
        onMaxPriceChange={onMaxPriceChange}
        onClear={onClear}
      />,
    );

    await user.type(screen.getByLabelText("Min price"), "5");
    await user.type(screen.getByLabelText("Max price"), "9");
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(onMinPriceChange).toHaveBeenCalled();
    expect(onMaxPriceChange).toHaveBeenCalled();
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
