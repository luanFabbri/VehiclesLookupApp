import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen/VehicleDetailsScreen';
import AboutScreen from '@screens/AboutScreen/AboutScreen';
import ConfigScreen from '@screens/ConfigScreen/ConfigScreen';

import {Vehicle} from '../interfaces/VehicleInterfaces';
import SplashScreen from '@screens/SplashScreen/SplashScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  VehicleDetails: {vehicle: Vehicle};
  About: undefined;
  Config: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
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
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Config"
          component={ConfigScreen}
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
export type ConfigScreenRouteProp = RouteProp<RootStackParamList, 'Config'>;
export type AboutScreenRouteProp = RouteProp<RootStackParamList, 'About'>;
export type SplashScreenRouteProp = RouteProp<RootStackParamList, 'Splash'>;
