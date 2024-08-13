import React from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './CustomInput.styles';

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  secureTextEntry,
  keyboardType,
}) => (
  <View style={styles.container}>
    <TextInput
      style={[styles.input, error ? styles.inputError : null]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

export default CustomInput;
