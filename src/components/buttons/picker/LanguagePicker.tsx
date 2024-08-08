import React from 'react';
import {Picker} from '@react-native-picker/picker';

interface LanguagePickerProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  return (
    <Picker
      selectedValue={selectedLanguage}
      onValueChange={itemValue => onLanguageChange(itemValue)}>
      <Picker.Item label="English" value="en" />
      <Picker.Item label="Español" value="es" />
      <Picker.Item label="Português" value="pt" />
    </Picker>
  );
};

export default LanguagePicker;
