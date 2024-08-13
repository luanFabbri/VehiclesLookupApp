import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import styles from './CustomButton.styles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading,
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
    {loading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <Text style={styles.buttonText}>{title}</Text>
    )}
  </TouchableOpacity>
);

export default CustomButton;
