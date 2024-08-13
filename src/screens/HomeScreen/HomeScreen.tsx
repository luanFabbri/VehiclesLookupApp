import React, {useEffect, useState} from 'react';
import {View, Image, SafeAreaView, Alert, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

// Importando módulos da aplicação usando aliases
import {RootState} from '@redux/store';
import {fetchVehicles} from '@api/api-config';
import {NavigationProps} from '@navigation/index';
import {Vehicle} from '@interfaces/VehicleInterfaces';
import UserAvatar from '@components/userAvatar/UserAvatar';
import CustomMapView from '@components/map/customMapView/CustomMapView';

// Importando estilos
import styles from './HomeScreen.styles';

const HomeScreen: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const userName = useSelector((state: RootState) => state.auth.profile?.name);
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const getVehicles = async () => {
      if (!token) {
        Alert.alert(
          'Erro',
          'Token de autenticação não encontrado. Por favor, faça login novamente.',
        );
        navigation.navigate('Login');
        return;
      }

      try {
        const data = await fetchVehicles(token);
        setVehicles(data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os veículos.');
      }
    };

    getVehicles();
  }, [token, navigation]);

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
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Pressable onPress={handlePressAvatar}>
          <UserAvatar
            uri={`https://ui-avatars.com/api/?name=${userName}&background=random`}
            size="small"
          />
        </Pressable>
      </View>
      <CustomMapView
        vehicles={vehicles}
        onMarkerPress={handleMarkerPress}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
