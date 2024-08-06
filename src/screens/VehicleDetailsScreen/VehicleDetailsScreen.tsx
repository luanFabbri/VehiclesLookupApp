// src/screens/VehicleDetailsScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import styles from './VehicleDetailsScreen.styles';

const VehicleDetailsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Hello World - VehicleDetailsScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default VehicleDetailsScreen;
