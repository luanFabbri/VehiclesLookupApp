import React from 'react';
import {View, Linking, FlatList, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import styles from './VehicleDetail.styles';
import {VehicleHistory} from '@interfaces/VehicleInterfaces';
import VText from '@components/vtext/VText';
import useGlobalStyles from '@utils/GlobalStyles';
import {useTranslation} from 'react-i18next';

interface VehicleDetailProps {
  history: VehicleHistory[];
}

interface VehicleDetailItemProps {
  item: VehicleHistory;
}

const VehicleDetailItem: React.FC<VehicleDetailItemProps> = ({item}) => {
  console.log(item);
  const {timestamp, fuelLevel, latitude, longitude} = item;
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

const VehicleDetail: React.FC<VehicleDetailProps> = ({history}) => {
  const {t} = useTranslation();

  return (
    <View>
      <View style={styles.header}>
        <VText style={styles.headerCellLeft}>{t('dateTime')}</VText>
        <VText style={styles.headerCellMiddle}>{t('fuel')}</VText>
        <VText style={styles.headerCellRight}>{t('position')}</VText>
      </View>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <VehicleDetailItem item={item} />}
      />
    </View>
  );
};

export default VehicleDetail;
