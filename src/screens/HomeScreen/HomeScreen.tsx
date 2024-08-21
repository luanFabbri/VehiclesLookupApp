import React, {useEffect, useState} from 'react';
import {View, Image, SafeAreaView, Alert, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

// Importando módulos da aplicação usando aliases
import {RootState} from '@services/redux/store';
import {fetchVehicles} from '@api/api-config';
import {NavigationProps} from '@navigation/index';
import {Vehicle} from '@interfaces/VehicleInterfaces';
import UserAvatar from '@components/userAvatar/UserAvatar';
import CustomMapView from '@components/map/customMapView/CustomMapView';

// Importando estilos
import styles from './HomeScreen.styles';

const HomeScreen: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [initialRegion, setInitialRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);
  const userName = useSelector((state: RootState) => state.auth.profile?.name);
  const navigation = useNavigation<NavigationProps>();
  const {t} = useTranslation();

  useEffect(() => {
    const getVehicles = async () => {
      if (!token) {
        navigation.navigate('Login');
        return;
      }
      try {
        const data = await fetchVehicles(token);
        setVehicles(data);

        if (data.length > 0) {
          setInitialRegion({
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      } catch (error) {
        Alert.alert(t('error'), t('loadVehiclesError'));
      }
    };

    getVehicles();
  }, [token]);

  const handlePressAvatar = () => {
    navigation.navigate('Profile');
  };

  const handleMarkerPress = (vehicle: Vehicle) => {
    navigation.navigate('VehicleDetails', {vehicle});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Pressable onPress={handlePressAvatar}>
          <UserAvatar
            uri={`https://ui-avatars.com/api/?name=${userName}&background=random`}
            size="small"
          />
        </Pressable>
      </View>
      {initialRegion && (
        <CustomMapView
          vehicles={vehicles}
          onMarkerPress={handleMarkerPress}
          initialRegion={initialRegion}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
