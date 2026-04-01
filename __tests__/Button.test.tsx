import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../src/components/_Button";

describe("Button Component", () => {
  it("renders button with correct label", () => {
    render(<Button label="Click Me" onClick={() => {}} />);

    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("custom-button");
  });

  it("calls onClick handler when clicked", () => {
    // use 'vi' instead of 'jest'
    const handleClick = vi.fn();

    render(<Button label="Click Me" onClick={handleClick} />);

    const button = screen.getByText("Click Me");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
