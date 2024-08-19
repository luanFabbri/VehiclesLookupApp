import React from 'react';
import {View, Text, ScrollView, Linking} from 'react-native';
import {useTranslation} from 'react-i18next';
import globalStyles from '@utils/GlobalStyles';

const AboutScreen: React.FC = () => {
  const {t} = useTranslation();

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <View style={{paddingTop: 36, padding: 20}}>
          <Text
            style={{
              fontSize: 36,
              lineHeight: 36,
              fontWeight: 'bold',
            }}>
            VehicleLookupApp
          </Text>
          <Text style={{fontSize: 16, lineHeight: 24}}>
            {t('aboutScreenDescriptionPt1')}
          </Text>
          <Text style={{fontSize: 16, lineHeight: 24, marginTop: 20}}>
            {t('aboutScreenThanks')}
            <Text
              style={{color: 'blue'}}
              onPress={() =>
                Linking.openURL('https://www.linkedin.com/in/lpffabbri/')
              }>
              LinkedIn
            </Text>
            .
          </Text>
          <Text style={{fontSize: 16, lineHeight: 24, marginTop: 20}}>
            {t('aboutScreenDescriptionPt2')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
