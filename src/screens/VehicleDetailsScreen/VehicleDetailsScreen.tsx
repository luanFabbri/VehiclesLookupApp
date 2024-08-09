// TODO - Ajustar posicionamento dos ícones

import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, Alert} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchVehicleHistory} from '../../services/api-config';
import styles from './VehicleDetailsScreen.styles';
import {useTranslation} from 'react-i18next';
import {Vehicle, VehicleHistory} from '../../types/VehicleInterfaces';
import VehicleDetail from '../../components/vehicleDetail/VehicleDetail';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {NavigationProps} from '../../navigation';

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
        Alert.alert(
          'Erro',
          'Token de autenticação não encontrado. Por favor, faça login novamente.',
        );
        navigation.navigate('Login');

        return;
      }

      try {
        const data = await fetchVehicleHistory(token);
        setHistory(data);
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível carregar o histórico do veículo.',
        );
      }
    };

    getVehicleHistory();
  }, [token, vehicle]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('pt-BR');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('details')}</Text>
      <Image source={{uri: vehicle.pictureLink}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View style={styles.detailColumn}>
            <Text style={styles.model}>{vehicle.model}</Text>
          </View>
          <View style={styles.detailColumn}>
            <MaterialCommunityIcons name="counter" size={24} color="black" />
            <Text style={styles.detailText}>{vehicle.odometerKm} km</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailColumn}>
            <Text style={styles.detailText}>
              {`${vehicle.chassis} • ${vehicle.licensePlate}`}
            </Text>
          </View>
          <View style={styles.detailColumn}>
            <MaterialCommunityIcons name="fuel" size={24} color="black" />
            <Text style={styles.detailText}>{vehicle.fuelLevel}%</Text>
          </View>
        </View>
      </View>
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
