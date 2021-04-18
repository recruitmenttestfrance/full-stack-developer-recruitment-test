import { render, screen } from "@testing-library/react";
import { min } from "lodash";

import TimeSelector from "./index";
import data from "../calendar.json";
import { calendar } from "../config.json";

const currentDate = "2021-04-11";
const onSelectSlot = () => {};
const emptiedStructure = {
  [currentDate]: [],
};

test("renders correct amount of time slots when collapsed", () => {
  render(
    <TimeSelector
      {...{
        data,
        currentDate,
        selectedSlots: [],
        displayAllTimeSlots: false,
        onSelectSlot,
      }}
    />
  );
  const elements = screen.getAllByTestId("Time");
  expect(elements.length).toBe(
    min([calendar.slotsToDisplayDefault, data[currentDate].length])
  );
});

test("renders correct amount of time slots when expanded", () => {
  render(
    <TimeSelector
      {...{
        data,
        currentDate,
        selectedSlots: [],
        displayAllTimeSlots: true,
        onSelectSlot,
      }}
    />
  );
  const elements = screen.getAllByTestId("Time");
  expect(elements.length).toBe(data[currentDate].length);
});

test("renders with no slots available", () => {
  render(
    <TimeSelector
      {...{
        data: emptiedStructure,
        currentDate,
        selectedSlots: [],
        displayAllTimeSlots: true,
        onSelectSlot,
      }}
    />
  );
  expect(screen.getByText(/Oh no/i)).toBeInTheDocument();
});
