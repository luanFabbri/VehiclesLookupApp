import React from 'react';
import { View, Linking, FlatList, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import styles from './VehicleDetail.styles';
import { VehicleHistory } from '@interfaces/VehicleInterfaces';
import VText from '@components/vtext/VText';
import useGlobalStyles from '@utils/GlobalStyles';
import { useTranslation } from 'react-i18next';

interface VehicleDetailProps {
  history: VehicleHistory[];
  customTestID?: string;
}

interface VehicleDetailItemProps {
  item: VehicleHistory;
}

const VehicleDetailItem: React.FC<VehicleDetailItemProps> = ({ item }) => {
  const { timestamp, fuelLevel, latitude, longitude } = item;
  const formattedDate = format(new Date(timestamp), 'dd/MM HH:mm:ss');
  const globalStyles = useGlobalStyles();

  const handlePressLocation = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.row}>
      <VText style={styles.cellLeft}>{formattedDate}</VText>
      <VText style={styles.cellMiddle}>{fuelLevel}%</VText>
      <View style={styles.positionCell}>
        <VText style={styles.cellRight}>{`${latitude},${longitude}`}</VText>
        <MaterialCommunityIcons
          testID="location-icon"
          style={{
            fontSize: 16,
            color: globalStyles.commonTextMedium.color,
          }}
          name="open-in-new"
          onPress={handlePressLocation}
        />
      </View>
    </View>
  );
};

const VehicleDetail: React.FC<VehicleDetailProps> = ({ history, customTestID }) => {
  const { t } = useTranslation();

  return (
    <View testID={customTestID?customTestID:'vehicle-detail'}>
      <View style={styles.header}>
        <VText style={styles.headerCellLeft}>{t('dateTime')}</VText>
        <VText style={styles.headerCellMiddle}>{t('fuel')}</VText>
        <VText style={styles.headerCellRight}>{t('position')}</VText>
      </View>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <VehicleDetailItem item={item} />}
      />
    </View>
  );
};

export default VehicleDetail;
