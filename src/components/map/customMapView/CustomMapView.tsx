import React from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import {View, Image} from 'react-native';
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
            <View style={styles.calloutContent}>
              <Image
                resizeMode="cover"
                style={styles.calloutImage}
                source={{uri: vehicle.pictureLink}}
              />
              <VText>{vehicle.model}</VText>
              <VText>Placa: {vehicle.licensePlate}</VText>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

export default CustomMapView;
