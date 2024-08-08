import React from 'react';
import {Image, StyleSheet, ImageStyle} from 'react-native';

interface UserAvatarProps {
  uri: string;
  size: 'small' | 'big';
}

const UserAvatar: React.FC<UserAvatarProps> = ({uri, size}) => {
  const styles = size === 'big' ? bigStyles : smallStyles;

  return <Image source={{uri}} style={styles.avatar} />;
};

const smallStyles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  } as ImageStyle,
});

const bigStyles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  } as ImageStyle,
});

export default UserAvatar;
