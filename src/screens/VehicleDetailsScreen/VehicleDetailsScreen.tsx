import React, {useEffect, useState} from 'react';
import {View, FlatList, Alert} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

// Importando módulos da aplicação usando aliases
import {fetchVehicleHistory} from '@api/api-config';
import {Vehicle, VehicleHistory} from '@interfaces/VehicleInterfaces';
import VehicleDetail from '@components/vehicleDetail/VehicleDetail';
import {RootState} from '@services/redux/store';
import {NavigationProps} from '@navigation/index';
import VehicleInfo from '@components/vehicleInfo/VehicleInfo';
import VText from '@components/vtext/VText';

// Estilos
import styles from './VehicleDetailsScreen.styles';
import useGlobalStyles from '@utils/GlobalStyles';

const VehicleDetailsScreen: React.FC = () => {
  const globalStyles = useGlobalStyles();
  const {t} = useTranslation();
  const route = useRoute<RouteProp<{params: {vehicle: Vehicle}}, 'params'>>();
  const {vehicle} = route.params;
  const [history, setHistory] = useState<VehicleHistory[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);

  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const getVehicleHistory = async () => {
      if (!token) {
        Alert.alert(t('error'), t('tokenNotFoundError'));
        navigation.navigate('Login');

        return;
      }

      try {
        const data = await fetchVehicleHistory(token);
        setHistory(data);
      } catch (error) {
        Alert.alert(t('error'), t('loadHistoryError'));
      }
    };

    getVehicleHistory();
  }, [token, vehicle]);

  return (
    <View style={[globalStyles.container, styles.container]}>
      <VText style={styles.title}>{t('details')}</VText>
      <VehicleInfo vehicle={vehicle} />
      <VText style={styles.historyTitle}>{t('history')}</VText>
      <View style={styles.historyHeader}>
        <VText style={styles.historyHeaderText}>{t('dateTime')}</VText>
        <VText style={styles.historyHeaderText}>{t('fuel')}</VText>
        <VText style={styles.historyHeaderText}>{t('position')}</VText>
      </View>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <VehicleDetail history={item} />}
        style={styles.historyList}
      />
    </View>
  );
};

export default VehicleDetailsScreen;
