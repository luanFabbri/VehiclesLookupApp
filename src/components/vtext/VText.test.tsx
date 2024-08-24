import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import VText from '../vtext/VText';
import useGlobalStyles from '@utils/GlobalStyles';

// Mock do hook useGlobalStyles
jest.mock('@utils/GlobalStyles');

describe('VText', () => {
  const mockGlobalStyles = {
    commonTextSmall: {fontSize: 12},
    commonTextMedium: {fontSize: 16},
    commonTextBig: {fontSize: 20},
  };

  beforeEach(() => {
    (useGlobalStyles as jest.Mock).mockReturnValue(mockGlobalStyles);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the text correctly', () => {
    const {getByTestId} = render(<VText>Test Text</VText>);
    const textElement = getByTestId('custom-text');
    expect(textElement).toBeTruthy();
    expect(textElement.props.children).toBe('Test Text');
  });

  it('applies the correct style for small size', () => {
    const {getByTestId} = render(<VText size="small">Small Text</VText>);
    const textElement = getByTestId('custom-text');
    expect(textElement.props.style).toContainEqual(
      mockGlobalStyles.commonTextSmall,
    );
  });

  it('applies the correct style for medium size (default)', () => {
    const {getByTestId} = render(<VText>Medium Text</VText>);
    const textElement = getByTestId('custom-text');
    expect(textElement.props.style).toContainEqual(
      mockGlobalStyles.commonTextMedium,
    );
  });

  it('applies the correct style for big size', () => {
    const {getByTestId} = render(<VText size="big">Big Text</VText>);
    const textElement = getByTestId('custom-text');
    expect(textElement.props.style).toContainEqual(
      mockGlobalStyles.commonTextBig,
    );
  });

  it('applies additional custom styles', () => {
    const customStyle = {color: 'blue'};
    const {getByTestId} = render(
      <VText style={customStyle}>Styled Text</VText>,
    );
    const textElement = getByTestId('custom-text');
    expect(textElement.props.style).toContainEqual(customStyle);
  });

  it('calls onPress when text is pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(<VText onPress={onPressMock}>Press Me</VText>);
    const textElement = getByTestId('custom-text');
    fireEvent.press(textElement);
    expect(onPressMock).toHaveBeenCalled();
  });
});
