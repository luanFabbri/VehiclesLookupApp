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
      <ScrollView testID="about-scrollview">
        <View style={styles.container}>
          <VText style={styles.appName} customTestID="about-appname">
            VehicleLookupApp
          </VText>
          <VText
            style={{fontSize: 16, lineHeight: 24}}
            customTestID="about-desc-1">
            {t('aboutScreenDescriptionPt1')}
          </VText>
          <VText
            style={{fontSize: 16, lineHeight: 24, marginTop: 20}}
            customTestID="about-thanks">
            {t('aboutScreenThanks')}
            <VText
              customTestID="about-linkedin"
              style={{color: 'blue'}}
              onPress={() =>
                Linking.openURL('https://www.linkedin.com/in/lpffabbri/')
              }>
              LinkedIn
            </VText>
            .
          </VText>
          <VText
            style={{fontSize: 16, lineHeight: 24, marginTop: 20}}
            customTestID="about-desc-2">
            {t('aboutScreenDescriptionPt2')}
          </VText>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
