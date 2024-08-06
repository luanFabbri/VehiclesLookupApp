// src/screens/HomeScreen.tsx
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styles from './HomeScreen.styles.ts';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Hello World - HomeScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
