import React from 'react';
import {View, Linking} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import styles from './VehicleDetail.styles.ts';
import {VehicleHistory} from '../../interfaces/VehicleInterfaces.ts';
import VText from '@components/vtext/VText.tsx';

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
      <VText style={styles.historyTextDate}>{formattedDate}</VText>
      <VText style={styles.historyFuel}>{fuelLevel}%</VText>
      <VText
        style={styles.historyTextPosition}>{`${latitude},${longitude}`}</VText>
      <MaterialCommunityIcons
        style={{fontSize: 18, paddingLeft: 5, color: 'grey'}}
        name="open-in-new"
        size={24}
        color="black"
        onPress={handlePressLocation}
      />
    </View>
  );
};

export default VehicleDetail;
