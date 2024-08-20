const { faker } = require("@faker-js/faker");

function createVehicle() {
  return {
    chassis: faker.vehicle.vin(),
    licensePlate: faker.vehicle.vrm(),
    fuelLevel: Math.floor(Math.random() * 100),
    odometerKm: Math.floor(Math.random() * 200_000),
    model: `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    pictureLink:
      "https://s3.us-east-2.amazonaws.com/images.pool.moblab.digital/8958a603-ec68-4aeb-a1d6-42ccf3388fa2-jepp%20compass.png",
  };
}

const vehicles = faker.helpers.multiple(createVehicle, { count: 100 });

module.exports = vehicles;
