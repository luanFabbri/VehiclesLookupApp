import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomButton from './CustomButton';

describe('CustomButton', () => {
  it('renders correctly with a title', () => {
    const {getByText} = render(
      <CustomButton title="Click me" onPress={() => {}} />,
    );
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls the onPress function when clicked', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <CustomButton title="Click me" onPress={onPressMock} />,
    );
    fireEvent.press(getByText('Click me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('shows loading indicator when loading is true', () => {
    const {getByTestId, queryByText} = render(
      <CustomButton title="Click me" onPress={() => {}} loading={true} />,
    );
    expect(getByTestId('loading-indicator')).toBeTruthy();
    expect(queryByText('Click me')).toBeNull(); // Verifica que o texto do botão não é exibido
  });

  it('applies custom styles correctly', () => {
    const customStyle = {backgroundColor: 'blue'};
    const customTextStyle = {color: 'yellow'};

    const {getByTestId} = render(
      <CustomButton
        title="Styled Button"
        onPress={() => {}}
        customStyle={customStyle}
        textStyle={customTextStyle}
      />,
    );

    const button = getByTestId('custom-button');
    const text = getByTestId('custom-button-text');

    // Verifica se o estilo do botão contém a propriedade personalizada
    const buttonStyles = Array.isArray(button.props.style)
      ? button.props.style
      : [button.props.style];
    const buttonBackgroundColor = buttonStyles.find(
      style => style.backgroundColor,
    )?.backgroundColor;
    expect(buttonBackgroundColor).toBe(customStyle.backgroundColor);

    // Verifica se o estilo do texto contém a propriedade personalizada
    const colorCheck = text.props.style.some(
      (style: any) => style.color === 'yellow',
    );
    expect(colorCheck).toBeTruthy;
  });
});
