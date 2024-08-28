import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomInput from './CustomInput';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

// Cria um mock do Redux store
const mockStore = configureStore([]);
const store = mockStore({
  settings: {darkMode: false}, // Estado inicial do Redux
});

describe('CustomInput', () => {
  const defaultProps = {
    placeholder: 'Enter text',
    value: '',
    customTestID: 'mock-input',
    onChangeText: jest.fn(),
    onBlur: jest.fn(),
  };

  it('renders correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <CustomInput {...defaultProps} />
      </Provider>,
    );
    const input = getByTestId('mock-input');
    expect(input).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <CustomInput {...defaultProps} />
      </Provider>,
    );
    const input = getByPlaceholderText('Enter text');

    fireEvent.changeText(input, 'new text');
    expect(defaultProps.onChangeText).toHaveBeenCalledWith('new text');
  });

  it('calls onBlur when input is blurred', () => {
    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <CustomInput {...defaultProps} />
      </Provider>,
    );
    const input = getByPlaceholderText('Enter text');

    fireEvent(input, 'blur');
    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  it('applies error style when error is present', () => {
    const errorProps = {
      ...defaultProps,
      error: 'Error message',
    };
    const {getByTestId} = render(
      <Provider store={store}>
        <CustomInput {...errorProps} />
      </Provider>,
    );
    const input = getByTestId('mock-input');

    // Nota: Verifica se o estilo contém a borda vermelha
    expect(input.props.style).toContainEqual({borderColor: 'red'});
  });

  it('renders the error message when error is present', () => {
    const errorProps = {
      ...defaultProps,
      error: 'Error message',
    };
    const {getByText} = render(
      <Provider store={store}>
        <CustomInput {...errorProps} />
      </Provider>,
    );
    const errorMessage = getByText('Error message');

    expect(errorMessage).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const customStyle = {color: 'yellow'};
    const customProps = {
      ...defaultProps,
      customStyle,
    };
    const {getByTestId} = render(
      <Provider store={store}>
        <CustomInput {...customProps} />
      </Provider>,
    );
    const input = getByTestId('mock-input');

    // Nota: Verifica se o estilo personalizado foi aplicado
    expect(input.props.style).toContainEqual(customStyle);
  });
});
