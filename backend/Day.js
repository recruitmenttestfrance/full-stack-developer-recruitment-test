const { addMinutes, format } = require("date-fns");
const { sum, map, minBy } = require("lodash");
const config = require("./config.json");

const regex = /(\d+)(?::(\d\d))?\s*(p?)/;
const timeZone = config.slots.timeZone;

class Day {
  constructor(date = new Date(), opening_time = []) {
    this.date = date;
    this.opening_time = opening_time;
  }

  minutesPerSlot(session_duration) {
    const session_duration_decomposed = session_duration.match(regex);
    const minutes_per_slots =
      session_duration_decomposed[1] * 60 + session_duration_decomposed[2];
    return minutes_per_slots;
  }

  amountOfSlots(session_duration) {
    const minutes_per_slots = this.minutesPerSlot(session_duration);

    return sum(
      map(this.opening_time, ({ from, to }) => {
        const to_decomposed = to.match(regex);
        const from_decomposed = from.match(regex);

        return Math.floor(
          ((to_decomposed[1] - from_decomposed[1]) * 60 +
            (to_decomposed[2] - from_decomposed[2])) /
            minutes_per_slots
        );
      })
    );
  }

  // Return the lowest opening range
  getOpeningTimeOfTheDay() {
    const { from } = minBy(this.opening_time, ({ from }) => {
      const from_decomposed = from.match(regex);
      return from_decomposed[1] * 60 + from_decomposed[2];
    });
    const from_decomposed = from.match(regex);

    let start_date = this.date;
    start_date.setHours(
      parseInt(from_decomposed[1]),
      parseInt(from_decomposed[2]),
      0,
      0
    );
    return start_date;
  }

  generateSlots(session_duration) {
    let startTime = this.getOpeningTimeOfTheDay();
    const amountOfSlots = this.amountOfSlots(session_duration);
    const minutes_per_slots = this.minutesPerSlot(session_duration);

    const slots = [];
    for (let i = 0; i < amountOfSlots; i++) {
      const endSlot = addMinutes(startTime, minutes_per_slots);

      slots.push({
        date: format(startTime, "yyyy-MM-dd", { timeZone }),
        slotStartTime: `${format(startTime, "HH", {
          timeZone
        })}:${format(startTime, "mm", { timeZone })}`,
        slotEndTime: `${format(endSlot, "HH", {
          timeZone
        })}:${format(endSlot, "mm", { timeZone })}`,
        weekDay: format(startTime, "EEEE", { timeZone }).toLowerCase()
      });

      startTime = addMinutes(startTime, minutes_per_slots);
    }

    return slots;
  }
}

module.exports = Day;
