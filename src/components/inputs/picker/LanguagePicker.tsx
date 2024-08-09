import React from 'react';
import {Picker} from '@react-native-picker/picker';
import styles from './LanguagePicker.styles';
import {View} from 'react-native';

interface LanguagePickerProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  return (
    <View style={styles.container}>
      <Picker
        style={styles.pickerMain}
        selectedValue={selectedLanguage}
        onValueChange={itemValue => onLanguageChange(itemValue)}>
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Español" value="es" />
        <Picker.Item label="Português" value="pt" />
      </Picker>
    </View>
  );
};

export default LanguagePicker;
