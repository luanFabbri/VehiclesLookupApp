// TODO - Remover customHeaderTitleStyle uma vez que remevi o cabeçalho

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen/VehicleDetailsScreen';
import {RouteProp} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {Vehicle} from '../types/VehicleInterfaces';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  VehicleDetails: {vehicle: Vehicle};
};

const customHeaderTitleStyle = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleStyle: customHeaderTitleStyle.title,
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VehicleDetails"
          component={VehicleDetailsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
export type VehicleDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'VehicleDetails'
>;
