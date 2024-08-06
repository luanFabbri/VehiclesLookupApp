// src/screens/LoginScreen.tsx
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styles from './LoginScreen.styles.ts';

const LoginScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Hello World - LoginScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
