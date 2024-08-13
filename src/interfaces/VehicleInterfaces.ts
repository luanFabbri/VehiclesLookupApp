export interface Vehicle {
  chassis: string;
  licensePlate: string;
  fuelLevel: number;
  odometerKm: number;
  model: string;
  latitude: number;
  longitude: number;
  pictureLink: string;
}

export interface VehicleHistory {
  timestamp: string;
  fuelLevel: number;
  latitude: number;
  longitude: number;
}
