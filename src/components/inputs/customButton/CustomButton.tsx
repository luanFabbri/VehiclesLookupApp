import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

import styles from './CustomButton.styles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  customStyle?: ViewStyle;
  textStyle?: TextStyle;
  customTestID?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading,
  customStyle,
  textStyle,
  customTestID,
}) => (
  <TouchableOpacity
    style={[styles.button, customStyle]}
    onPress={onPress}
    disabled={loading}
    testID={customTestID ? customTestID : 'custom-button'}>
    {loading ? (
      <ActivityIndicator size="small" color="#fff" testID="loading-indicator" />
    ) : (
      <Text style={[styles.buttonText, textStyle]} testID="custom-button-text">
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

export default CustomButton;
