// src/screens/ProfileScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import styles from './ProfileScreen.styles';

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Hello World - ProfileScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
