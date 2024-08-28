import React from 'react';
import {View, Image} from 'react-native';

import {Vehicle} from '@interfaces/VehicleInterfaces';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import VText from '@components/vtext/VText';

import useGlobalStyles from '@utils/GlobalStyles.ts';
import styles from './VehicleInfo.styles';

interface VehicleInfoProps {
  vehicle: Vehicle;
  customTestID?: string;
}

const VehicleInfo: React.FC<VehicleInfoProps> = ({vehicle, customTestID}) => {
  const GlobalStyles = useGlobalStyles();
  return (
    <View
      style={styles.container}
      testID={customTestID ? customTestID : 'vehicle-info-main'}>
      <Image
        source={{uri: vehicle.pictureLink}}
        style={styles.image}
        testID="vehicle-image"
      />
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View style={styles.detailColumn}>
            <VText style={styles.model}>{vehicle.model}</VText>
          </View>
          <View style={styles.detailColumn}>
            <MaterialCommunityIcons
              testID="counter-icon"
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
              testID="fuel-icon"
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
