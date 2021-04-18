import { useCallback, useEffect, useState } from "react";
import { ArrowRightAlt as Arrow } from "@material-ui/icons";
import { first } from "lodash";
import classnames from "classnames";
import PropTypes from "prop-types";

import Day from "./Day";
import "./style.css";

import { calendar } from "../config.json";

const DateSelector = ({ data, onSelectionChange }) => {
  const [dates, setDates] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(first(dates));
  const [offsetDates, setOffsetDates] = useState(0);
  const [canGoForward, setCanGoForward] = useState(true);
  const [canGoBackward, setCanGoBackward] = useState(false);
  const [datesToDisplay, setDatesToDisplay] = useState([]);

  const itemIsVisible = useCallback(
    (item) => datesToDisplay.indexOf(item) !== -1,
    [datesToDisplay]
  );

  useEffect(() => {
    setDates(Object.keys(data));
  }, [data]);

  useEffect(
    (data) => {
      setDatesToDisplay(
        dates.slice(offsetDates, calendar.daysToDisplay + offsetDates)
      );
    },
    [dates, offsetDates]
  );

  useEffect(() => {
    setCanGoForward(dates.slice(offsetDates + 1).length >= 7);
    setCanGoBackward(offsetDates > 0);

    // Move up the selected item to avoid a selection offscreen
    if (!itemIsVisible(currentSelection)) {
      setCurrentSelection(first(datesToDisplay));
    }
  }, [dates, offsetDates, itemIsVisible, currentSelection, datesToDisplay]);

  const forwardCalendar = () => {
    if (canGoForward) {
      setOffsetDates(offsetDates + 1);
    }
  };

  const backwardDates = () => {
    if (canGoBackward) {
      setOffsetDates(offsetDates - 1);
    }
  };

  const selectDate = (selection) => {
    setCurrentSelection(selection);
  };

  useEffect(() => {
    if (typeof onSelectionChange === "function") {
      onSelectionChange(currentSelection);
    }
  }, [currentSelection, onSelectionChange]);

  return (
    <div className="DateSelector">
      <div className="BackInTime">
        <Arrow
          className={classnames("Arrow", { Disabled: !canGoBackward })}
          fontSize="large"
          onClick={backwardDates}
        />
      </div>
      <div
        className="Content"
        style={{
          gridTemplateColumns: `repeat(${calendar.daysToDisplay}, minmax(max-content, 1fr))`,
        }}
      >
        {datesToDisplay.map((date) => (
          <Day
            key={`date${date}`}
            selected={currentSelection === date}
            date={date}
            onClick={selectDate.bind(this, date)}
          />
        ))}
      </div>
      <div className="ForwardInTime">
        <Arrow
          className={classnames("Arrow", { Disabled: !canGoForward })}
          fontSize="large"
          onClick={forwardCalendar}
        />
      </div>
    </div>
  );
};

DateSelector.propTypes = {
  data: PropTypes.object.isRequired,
  onSelectionChange: PropTypes.func,
};

export default DateSelector;
