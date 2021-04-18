import { render, screen } from "@testing-library/react";
import Time from "./Time";

const value = {
  slotStartTime: "10:00",
  slotId: 900,
};
const onSelectSlot = () => {};

test("renders given time slot", () => {
  render(<Time {...{ value, onSelectSlot, selected: false }} />);
  expect(screen.getByText(/10:00/i)).toBeInTheDocument();
});
