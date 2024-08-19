import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

interface VTextProps {
  size?: 'small' | 'medium' | 'big';
  children: React.ReactNode;
  style?: TextStyle;
}

const VText: React.FC<VTextProps> = ({size = 'medium', children, style}) => {
  const getTextStyle = () => {
    switch (size) {
      case 'small':
        return commonTextStyles.commonTextSmall;
      case 'big':
        return commonTextStyles.commonTextBig;
      default:
        return commonTextStyles.commonTextMedium;
    }
  };

  return <Text style={[getTextStyle(), style]}>{children}</Text>;
};

const commonTextStyles = StyleSheet.create({
  commonTextSmall: {
    fontSize: 14,
  },
  commonTextMedium: {
    fontSize: 16,
  },
  commonTextBig: {
    fontSize: 32,
  },
});

export default VText;
