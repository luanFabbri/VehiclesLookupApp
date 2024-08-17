import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

// Importando módulos da aplicação usando aliases
import {fetchVehicleHistory} from '@api/api-config';
import styles from './VehicleDetailsScreen.styles';
import {Vehicle, VehicleHistory} from '@interfaces/VehicleInterfaces';
import VehicleDetail from '@components/vehicleDetail/VehicleDetail';
import {RootState} from '@services/redux/store';
import {NavigationProps} from '@navigation/index';
import VehicleInfo from '@components/vehicleInfo/VehicleInfo';

const VehicleDetailsScreen: React.FC = () => {
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
    <View style={styles.container}>
      <Text style={styles.title}>{t('details')}</Text>
      <VehicleInfo vehicle={vehicle} />
      <Text style={styles.historyTitle}>{t('history')}</Text>
      <View style={styles.historyHeader}>
        <Text style={styles.historyHeaderText}>{t('dateTime')}</Text>
        <Text style={styles.historyHeaderText}>{t('fuel')}</Text>
        <Text style={styles.historyHeaderText}>{t('position')}</Text>
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
