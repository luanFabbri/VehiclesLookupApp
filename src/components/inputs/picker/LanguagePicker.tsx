import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import styles from './LanguagePicker.styles';
import {View} from 'react-native';
import i18n from '@services/i18n/i18n';

const LanguagePicker: React.FC = ({}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <View style={styles.container}>
      <Picker
        style={styles.pickerMain}
        selectedValue={selectedLanguage}
        onValueChange={itemValue => handleLanguageChange(itemValue)}>
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Español" value="es" />
        <Picker.Item label="Português" value="pt" />
      </Picker>
    </View>
  );
};

export default LanguagePicker;
