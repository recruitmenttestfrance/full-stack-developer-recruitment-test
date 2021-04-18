import classnames from "classnames";
import { format } from "date-fns";
import PropTypes from "prop-types";

import "./Day.css";

const Day = ({ date, selected, onClick }) => {
  return (
    <div
      className={classnames("DayContainer", { Selected: selected })}
      {...{ onClick }}
    >
      <div className="Day">
        <div className="OfTheWeek">{format(new Date(date), "iii")}</div>
        <div className="OfTheMonth">{format(new Date(date), "dd")}</div>
      </div>
      <div className="Month">
        <div className="Title">{format(new Date(date), "LLLL")}</div>
        <div className="Year">{format(new Date(date), "yyyy")}</div>
      </div>
    </div>
  );
};

Day.propTypes = {
  date: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Day;
