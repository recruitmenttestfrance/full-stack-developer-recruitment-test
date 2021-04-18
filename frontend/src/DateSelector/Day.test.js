import { render, screen } from "@testing-library/react";
import Day from "./Day";

const date = "2021-04-16";
const onClick = () => {};

test("renders given date", () => {
  render(<Day {...{ date, selected: false, onClick }} />);
  expect(screen.getByText(/16/i)).toBeInTheDocument();
});
