import { useEffect, useState } from "react";
import { get } from "lodash";
import PropTypes from "prop-types";

import { calendar } from "../config.json";
import "./style.css";
import Time from "./Time";

const TimeSelector = ({
  selectedSlots,
  currentDate,
  data,
  displayAllTimeSlots = false,
  onSelectSlot,
}) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    // Date has been selected
    if (currentDate) {
      setSlots(
        get(data, `[${currentDate}]`).slice(
          0,
          displayAllTimeSlots ? undefined : calendar.slotsToDisplayDefault
        )
      );
    }
  }, [data, currentDate, displayAllTimeSlots, selectedSlots]);

  return (
    <div className="TimeSelector">
      <div className="TimeContainer">
        {slots.map(({ slotId, ...others }) => (
          <Time
            key={`slot${slotId}`}
            {...{
              value: { slotId, ...others },
              selected: selectedSlots.indexOf(slotId) !== -1,
              onSelectSlot,
            }}
          />
        ))}
      </div>
    </div>
  );
};

TimeSelector.propTypes = {
  selectedSlots: PropTypes.array.isRequired,
  currentDate: PropTypes.string,
  data: PropTypes.object.isRequired,
  displayAllTimeSlots: PropTypes.bool.isRequired,
  onSelectSlot: PropTypes.func.isRequired,
};

export default TimeSelector;
