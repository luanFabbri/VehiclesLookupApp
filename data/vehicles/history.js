const { faker } = require("@faker-js/faker");

function createHistoryRecord(index) {
  return {
    timestamp: Date.now() - index * 100_000,
    fuelLevel: Math.floor(Math.random() * (100 - 0) + 0),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  };
}

function createHistory() {
  return Array.from(Array(100).keys()).map((index) =>
    createHistoryRecord(index)
  );
}

const history = createHistory();

module.exports = history;
