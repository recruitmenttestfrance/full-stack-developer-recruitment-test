const fs = require("fs");
const path = require("path");

const Location = require("./Location");
const config = require("./config.json");

const location = new Location(
  config.locations.default_session_duration,
  config.locations.default_terrains,
  config.locations.default_opening_time
);

const slots = location.getAvailableSlots();

fs.writeFile(
  path.resolve(`${__dirname}/calendar.json`),
  JSON.stringify(slots),
  () => {
    console.log(
      `All slots generated for location for the next ${config.slots.limit_days_to_generate} days. Results were stored in "calendar.json"`
    );
  }
);
