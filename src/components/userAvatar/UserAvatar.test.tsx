import React from 'react';
import {render} from '@testing-library/react-native';
import UserAvatar from './UserAvatar';

describe('UserAvatar', () => {
  const uri = 'assets/images/logo.png';

  it('should render a small avatar with the correct size', () => {
    const {getByTestId} = render(<UserAvatar uri={uri} size="small" />);
    const avatar = getByTestId('user-avatar');

    expect(avatar.props.style).toEqual(
      expect.objectContaining({
        width: 60,
        height: 60,
        borderRadius: 30,
      }),
    );
  });

  it('should render a big avatar with the correct size', () => {
    const {getByTestId} = render(<UserAvatar uri={uri} size="big" />);
    const avatar = getByTestId('user-avatar');

    expect(avatar.props.style).toEqual(
      expect.objectContaining({
        width: 80,
        height: 80,
        borderRadius: 40,
      }),
    );
  });

  it('should render the avatar with the correct image source', () => {
    const {getByTestId} = render(<UserAvatar uri={uri} size="small" />);
    const avatar = getByTestId('user-avatar');

    expect(avatar.props.source).toEqual({uri});
  });
});
