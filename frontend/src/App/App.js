import { useEffect, useState } from "react";
import { DateRange as DateIcon } from "@material-ui/icons";
import classnames from "classnames";

import "./App.css";
import DateSelector from "../DateSelector";
import TimeSelector from "../TimeSelector";

import data from "../calendar.json";

const App = () => {
  const [currentDate, setCurrentDate] = useState();
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [displayAllTimeSlots, setDisplayAllTimeslots] = useState(false);

  const clearSelection = () => {
    setSelectedSlots([]);
  };

  const showAllSlots = () => {
    setDisplayAllTimeslots(true);
  };

  const minimizeTimeSlots = () => {
    setDisplayAllTimeslots(false);
  };

  const toggleSlot = (slotId) => {
    const copySlots = selectedSlots;
    const index = selectedSlots.indexOf(slotId);
    if (index !== -1) {
      copySlots.splice(index, 1);
    } else {
      copySlots.push(slotId);
    }
    setSelectedSlots([...copySlots]);
  };

  useEffect(() => {
    clearSelection();
  }, [currentDate]);

  return (
    <div className="App">
      <div>
        <div className="Header">
          <div className="Title">
            <div>Calendar</div>
            <div>
              <DateIcon />
            </div>
          </div>
          <div
            className={classnames("ClearButton", {
              ButtonDisabled: selectedSlots.length === 0,
            })}
            onClick={clearSelection}
          >
            Clear my selection(s)
          </div>
        </div>

        <DateSelector {...{ data, onSelectionChange: setCurrentDate }} />
      </div>

      <div>
        <div className="Header">
          <div className="Title">
            <div>Available Time Slots</div>
          </div>
        </div>

        <TimeSelector
          {...{
            selectedSlots,
            currentDate,
            data,
            displayAllTimeSlots,
            onSelectSlot: toggleSlot,
          }}
        />
      </div>

      <div className="Footer">
        {!displayAllTimeSlots ? (
          <div className="ShowAllButton" onClick={showAllSlots}>
            Show all time slots
          </div>
        ) : (
          <div className="ShowAllButton" onClick={minimizeTimeSlots}>
            Minimize time slots
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
