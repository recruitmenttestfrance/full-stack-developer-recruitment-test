import classnames from "classnames";
import PropTypes from "prop-types";

import "./Time.css";

const Time = ({
  value: { slotStartTime, slotId } = {},
  onSelectSlot,
  selected,
}) => {
  const onSelect = () => {
    if (typeof onSelectSlot === "function") {
      onSelectSlot(slotId);
    }
  };

  return (
    <div
      data-testid="Time"
      className={classnames("Time", { TimeSelected: selected })}
      {...{ onClick: onSelect }}
    >
      <div className="Slot">{slotStartTime}</div>
    </div>
  );
};

Time.propTypes = {
  value: PropTypes.shape({
    slotStartTime: PropTypes.string.isRequired,
    slotId: PropTypes.number.isRequired,
  }).isRequired,
  onSelectSlot: PropTypes.func,
  selected: PropTypes.bool.isRequired,
};

export default Time;
