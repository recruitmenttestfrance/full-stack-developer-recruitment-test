const Day = require("../day");
const config = require("../config.json");
const session_duration = config.locations.default_session_duration;

var assert = require("assert");

describe("Day", function () {
  const myDay = new Day(new Date(), [
    {
      from: "14:00",
      to: "23:30"
    }
  ]);

  describe("#amountOfSlots", function () {
    it("with 30 minutes per slots it should return 19 slots in a day", function () {
      assert.equal(myDay.amountOfSlots(session_duration), 19);
    });
    it("with 32 minutes per slots it should return 17 slots in a day", function () {
      assert.equal(myDay.amountOfSlots("00:32"), 17);
    });
  });
});
