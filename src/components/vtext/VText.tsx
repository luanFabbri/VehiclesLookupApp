import useGlobalStyles from '@utils/GlobalStyles';
import React from 'react';
import {Text, TextStyle} from 'react-native';

interface VTextProps {
  size?: 'small' | 'medium' | 'big';
  children: React.ReactNode;
  style?: TextStyle;
  onPress?: () => void;
  customTestID?: string;
}

const VText: React.FC<VTextProps> = ({
  size = 'medium',
  children,
  style,
  onPress,
  customTestID,
}) => {
  const globalStyles = useGlobalStyles();
  const getTextStyle = () => {
    switch (size) {
      case 'small':
        return globalStyles.commonTextSmall;
      case 'big':
        return globalStyles.commonTextBig;
      default:
        return globalStyles.commonTextMedium;
    }
  };

  return (
    <Text
      style={[getTextStyle(), style]}
      onPress={onPress}
      testID={customTestID ? customTestID : 'custom-text'}>
      {children}
    </Text>
  );
};

export default VText;
