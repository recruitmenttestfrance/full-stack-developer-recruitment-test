import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Calendar Title", () => {
  render(<App />);
  const textElement = screen.getByText(/Calendar/i);
  expect(textElement).toBeInTheDocument();
});
