import React from 'react';
import {View, Text, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Vehicle} from '@interfaces/VehicleInterfaces';
import styles from './VehicleInfo.styles';
import VText from '@components/vtext/VText';
import useGlobalStyles from '@utils/GlobalStyles.ts';

interface VehicleInfoProps {
  vehicle: Vehicle;
}

const VehicleInfo: React.FC<VehicleInfoProps> = ({vehicle}) => {
  const GlobalStyles = useGlobalStyles();
  return (
    <View style={styles.container}>
      <Image source={{uri: vehicle.pictureLink}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View style={styles.detailColumn}>
            <VText style={styles.model}>{vehicle.model}</VText>
          </View>
          <View style={styles.detailColumn}>
            <MaterialCommunityIcons
              name="counter"
              size={24}
              color={GlobalStyles.commonTextMedium.color}
            />
            <VText style={styles.detailText}>{vehicle.odometerKm} km</VText>
          </View>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailColumn}>
            <VText style={styles.detailText}>
              {`${vehicle.chassis} • ${vehicle.licensePlate}`}
            </VText>
          </View>
          <View style={styles.detailColumn}>
            <MaterialCommunityIcons
              name="fuel"
              size={24}
              color={GlobalStyles.commonTextMedium.color}
            />
            <VText style={styles.detailText}>{vehicle.fuelLevel}%</VText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VehicleInfo;
