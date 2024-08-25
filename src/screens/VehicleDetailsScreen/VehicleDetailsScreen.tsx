import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

// Importando módulos da aplicação usando aliases
import {fetchVehicleHistory} from '@api/api-config';
import {Vehicle, VehicleHistory} from '@interfaces/VehicleInterfaces';
import VehicleDetail from '@components/vehicleDetail/VehicleDetail';
import {RootState} from '@services/redux/store';
import {NavigationProps} from '@navigation/index';
import VText from '@components/vtext/VText';

// Estilos
import styles from './VehicleDetailsScreen.styles';
import useGlobalStyles from '@utils/GlobalStyles';
import VehicleInfo from '@components/vehicleInfo/VehicleInfo';

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
      <VText style={styles.title} customTestID='vehicle-details-header'>{t('details')}</VText>
      <VehicleInfo vehicle={vehicle} customTestID='Vehicle-info'/>
      <VText style={styles.historyTitle} customTestID='vehicle-details-history-header'>{t('history')}</VText>
      <VehicleDetail history={history} customTestID='vehicle-detail'/>
    </View>
  );
};

export default VehicleDetailsScreen;
