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
  style?: ViewStyle; // Parâmetro de estilo opcional
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading,
  style,
  textStyle,
}) => (
  <TouchableOpacity
    style={[styles.button, style]} // Combina o estilo padrão com o estilo opcional
    onPress={onPress}
    disabled={loading}>
    {loading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    )}
  </TouchableOpacity>
);

export default CustomButton;
