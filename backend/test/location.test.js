const Location = require("../Location");
const config = require("../config.json");

var assert = require("assert");
const { last } = require("lodash");
const { format, addDays } = require("date-fns");

const terrains = [
  {
    name: "A",
    players: 12
  },
  {
    name: "B",
    players: 6
  }
];

const myLocation = new Location(
  config.locations.default_session_duration,
  terrains,
  config.locations.default_opening_time
);

describe("Location", function () {
  describe("getTerrains", function () {
    it("should return the terrains structure", function () {
      const matchingStructure = [
        {
          terrainId: 0,
          availablePlaces: 12,
          gameId: null,
          isPremium: false,
          isTerrainFree: true
        },
        {
          terrainId: 1,
          availablePlaces: 6,
          gameId: null,
          isPremium: false,
          isTerrainFree: true
        }
      ];

      assert.equal(
        JSON.stringify(myLocation.getTerrains()),
        JSON.stringify(matchingStructure)
      );
    });
  });

  describe("getAvailableSlots", function () {
    it("should return the correct amount of days", function () {
      const result = myLocation.getAvailableSlots();
      assert.equal(
        Object.keys(result).length,
        config.slots.limit_days_to_generate
      );
    });

    it("should match the correct date in 10 days", function () {
      const result = myLocation.getAvailableSlots();
      let startDate = addDays(new Date(), 1);
      let iterations = 0;
      do {
        if (
          Object.keys(config.locations.default_opening_time).indexOf(
            format(startDate, "EEEE").toLowerCase()
          ) !== -1
        ) {
          iterations++;
        }
        if (iterations < config.slots.limit_days_to_generate) {
          startDate = addDays(startDate, 1);
        }
      } while (iterations < config.slots.limit_days_to_generate);

      assert.equal(last(Object.keys(result)), format(startDate, "yyyy-MM-dd"));
    });
  });
});
