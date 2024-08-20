import React from 'react';
import {View, ScrollView, Linking} from 'react-native';

import {useTranslation} from 'react-i18next';
import VText from '@components/vtext/VText';

// Estilos
import styles from './AboutScreen.styles';
import useGlobalStyles from '@utils/GlobalStyles';

const AboutScreen: React.FC = () => {
  const globalStyles = useGlobalStyles();
  const {t} = useTranslation();

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <View style={styles.container}>
          <VText style={styles.appName}>VehicleLookupApp</VText>
          <VText style={{fontSize: 16, lineHeight: 24}}>
            {t('aboutScreenDescriptionPt1')}
          </VText>
          <VText style={{fontSize: 16, lineHeight: 24, marginTop: 20}}>
            {t('aboutScreenThanks')}
            <VText
              style={{color: 'blue'}}
              onPress={() =>
                Linking.openURL('https://www.linkedin.com/in/lpffabbri/')
              }>
              LinkedIn
            </VText>
            .
          </VText>
          <VText style={{fontSize: 16, lineHeight: 24, marginTop: 20}}>
            {t('aboutScreenDescriptionPt2')}
          </VText>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
