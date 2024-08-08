import React from 'react';
import {View, Text, Linking} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import styles from './VehicleDetail.styles.ts';
import {VehicleHistory} from '../../types/VehicleInterfaces';

interface VehicleDetailProps {
  history: VehicleHistory;
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({history}) => {
  const {timestamp, fuelLevel, latitude, longitude} = history;
  const formattedDate = format(new Date(timestamp), 'dd/MM HH:mm:ss');

  const handlePressLocation = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>{formattedDate}</Text>
      <Text style={styles.historyText}>{fuelLevel}%</Text>
      <Text style={styles.historyText}>{`${latitude},${longitude}`}</Text>
      <MaterialCommunityIcons
        name="map-marker-radius"
        size={24}
        color="black"
        onPress={handlePressLocation}
      />
    </View>
  );
};

export default VehicleDetail;
