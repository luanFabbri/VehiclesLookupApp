const { faker } = require("@faker-js/faker");
const path = require('path');

function createVehicle() {
  return {
    chassis: faker.vehicle.vin(),
    licensePlate: faker.vehicle.vrm(),
    fuelLevel: Math.floor(Math.random() * 100),
    odometerKm: Math.floor(Math.random() * 200_000),
    model: `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    pictureLink: path.join(__dirname, '../images/car-picture.png'),
  };
}

const vehicles = faker.helpers.multiple(createVehicle, { count: 100 });

module.exports = vehicles;
