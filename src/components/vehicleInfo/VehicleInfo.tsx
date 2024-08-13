import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Vehicle} from '@interfaces/VehicleInterfaces';
import styles from './VehicleInfo.styles';

interface VehicleInfoProps {
  vehicle: Vehicle;
}

const VehicleInfo: React.FC<VehicleInfoProps> = ({vehicle}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: vehicle.pictureLink}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View style={styles.detailColumn}>
            <Text style={styles.model}>{vehicle.model}</Text>
          </View>
          <View style={styles.detailColumn}>
            <MaterialCommunityIcons name="counter" size={24} color="black" />
            <Text style={styles.detailText}>{vehicle.odometerKm} km</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailColumn}>
            <Text style={styles.detailText}>
              {`${vehicle.chassis} • ${vehicle.licensePlate}`}
            </Text>
          </View>
          <View style={styles.detailColumn}>
            <MaterialCommunityIcons name="fuel" size={24} color="black" />
            <Text style={styles.detailText}>{vehicle.fuelLevel}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VehicleInfo;
