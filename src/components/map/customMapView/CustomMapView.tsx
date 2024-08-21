import React from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import {View, Image, Text} from 'react-native';
import {Vehicle} from '@interfaces/VehicleInterfaces';
import styles from './CustomMapView.styles';
import VText from '@components/vtext/VText';

interface CustomMapViewProps {
  vehicles: Vehicle[];
  onMarkerPress: (vehicle: Vehicle) => void;
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

const CustomMapView: React.FC<CustomMapViewProps> = ({
  vehicles,
  onMarkerPress,
  initialRegion,
}) => {
  return (
    <MapView style={styles.map} initialRegion={initialRegion}>
      {vehicles.map((vehicle, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: vehicle.latitude,
            longitude: vehicle.longitude,
          }}
          title={vehicle.model}
          description={vehicle.licensePlate}>
          <Callout
            onPress={() => onMarkerPress(vehicle)}
            style={styles.callout}>
            <VText style={{color: '#000000'}}>Chassis: {vehicle.chassis}</VText>
            <VText style={{color: '#000000'}}>Fuel: {vehicle.fuelLevel}</VText>
            <VText style={{color: '#000000'}}>Model: {vehicle.model}</VText>
            <VText style={{color: '#000000'}}>
              Odometer: {vehicle.odometerKm}
            </VText>
            <VText
              style={{
                color: '#000000',
                padding: 8,
                borderWidth: 1,
                width: '100%',
                borderRadius: 4,
                textAlign: 'center',
                marginTop: 6,
                backgroundColor: 'lightgrey',
              }}>
              Ver detalhes
            </VText>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

export default CustomMapView;
