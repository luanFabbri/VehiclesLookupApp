import React from 'react';
import {View, SafeAreaView} from 'react-native';

// Components internos
import LanguagePicker from '@components/inputs/picker/LanguagePicker';
import DarkModeToggle from '@components/inputs/darkModeToggle/DarkModeToggle';

// Estilos
import styles from './ConfigScreen.styles';
import useGlobalStyles from '@utils/GlobalStyles';
import VText from '@components/vtext/VText';

const ConfigScreen: React.FC = () => {
  const globalStyles = useGlobalStyles();
  return (
    <SafeAreaView
      style={[globalStyles.container, styles.container]}
      testID="config-safearea">
      <View style={styles.headerText}>
        <VText size="big" customTestID="config-header">
          Configurações
        </VText>
      </View>
      <View>
        <DarkModeToggle />
      </View>
      <View style={styles.languagePickerContainer}>
        <LanguagePicker />
      </View>
    </SafeAreaView>
  );
};

export default ConfigScreen;
