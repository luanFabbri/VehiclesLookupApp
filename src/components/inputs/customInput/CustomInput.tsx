import React from 'react';
import {View, TextInput} from 'react-native';
import styles from './CustomInput.styles';
import VText from '@components/vtext/VText';
import useGlobalStyles from '@utils/GlobalStyles';

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
}) => {
  const globalStyles = useGlobalStyles();
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          globalStyles.commonTextMedium,
          styles.input,
          error ? styles.inputError : null,
        ]}
        placeholder={placeholder}
        placeholderTextColor={globalStyles.commonTextMedium.color}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {error ? <VText style={styles.error}>{error}</VText> : null}
    </View>
  );
};

export default CustomInput;
