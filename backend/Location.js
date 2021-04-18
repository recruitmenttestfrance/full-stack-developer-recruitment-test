const { addDays, format } = require("date-fns");
const { map, sum } = require("lodash");

const Day = require("./Day");
const config = require("./config.json");

class Location {
  constructor(session_duration, terrains, opening_time) {
    this.session_duration =
      session_duration || config.locations.default_session_duration;
    this.terrains = terrains || config.locations.default_terrains;
    this.opening_time = opening_time || config.locations.default_opening_time;
  }

  addTerrain(terrain) {
    this.terrains.push(terrain);
  }

  // Return values for all terrains of this location
  getTerrains() {
    // Eventually these date should be populated using an API
    return map(this.terrains, (terrain, terrainId) => ({
      terrainId,
      availablePlaces: terrain.players,
      gameId: null,
      isPremium: false,
      isTerrainFree: true
    }));
  }

  getAvailableSlots() {
    const formattedSlots = {};
    let startDate = new Date();
    let slotId = 1;

    do {
      const key = format(startDate, "yyyy-MM-dd");
      const currentDayOfWeek = format(startDate, "EEEE").toLowerCase();

      if (this.opening_time[currentDayOfWeek]) {
        const day = new Day(startDate, this.opening_time[currentDayOfWeek]);
        const slots = map(day.generateSlots(this.session_duration), (data) => {
          // Compute places on all terrains
          const totalAvailablePlaces = sum(
            map(this.terrains, (terrain) => terrain.players)
          );

          const result = {
            ...data,
            slotId,
            totalAvailablePlaces,
            terrains: this.getTerrains(),
            isPremium: false
          };

          // Increase slot id for the next slots
          slotId++;

          return result;
        });
        formattedSlots[key] = slots;
      }
      startDate = addDays(startDate, 1);
    } while (
      Object.keys(formattedSlots).length < config.slots.limit_days_to_generate
    );

    return formattedSlots;
  }
}

module.exports = Location;
