import React from 'react';
import {View, Linking} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import styles from './VehicleDetail.styles.ts';
import {VehicleHistory} from '../../interfaces/VehicleInterfaces.ts';
import VText from '@components/vtext/VText.tsx';
import useGlobalStyles from '@utils/GlobalStyles.ts';

interface VehicleDetailProps {
  history: VehicleHistory;
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({history}) => {
  const {timestamp, fuelLevel, latitude, longitude} = history;
  const formattedDate = format(new Date(timestamp), 'dd/MM HH:mm:ss');
  const GlobalStyles = useGlobalStyles();

  const handlePressLocation = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.historyItem}>
      <VText style={styles.historyTextDate}>{formattedDate}</VText>
      <VText style={styles.historyFuel}>{fuelLevel}%</VText>
      <View style={{flexDirection: 'row'}}>
        <VText style={styles.historyTextPosition}>
          {`${latitude},${longitude}`}
        </VText>
        <MaterialCommunityIcons
          style={{
            fontSize: 16,
            color: GlobalStyles.commonTextMedium.color,
          }}
          name="open-in-new"
          onPress={handlePressLocation}
        />
      </View>
    </View>
  );
};

export default VehicleDetail;
