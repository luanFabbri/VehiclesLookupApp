// src/navigation/index.tsx
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import HomeScreen, {Vehicle} from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen/VehicleDetailsScreen';
import {RouteProp} from '@react-navigation/native';

// Defina os tipos das rotas
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  VehicleDetails: {vehicle: Vehicle};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

// Exportar tipos de navegação para uso em componentes
export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
