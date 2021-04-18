import { render, screen } from "@testing-library/react";
import { min } from "lodash";

import DateSelector from "./index";
import data from "../calendar.json";
import { calendar } from "../config.json";

test("renders correct amount of dates", () => {
  render(<DateSelector {...{ data }} />);
  const elements = screen.getAllByText(/April/i);
  expect(elements.length).toBe(
    min([calendar.daysToDisplay, Object.keys(data).length])
  );
});
