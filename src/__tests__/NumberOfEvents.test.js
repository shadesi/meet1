//src/__tests__/NumberOfEvents.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('renders the number input', () => {
    render(<NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
  });

  test('default value is 32', () => {
    render(<NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />);
    const input = screen.getByRole('spinbutton');
    expect(input.value).toBe('32');
  });

  test('input value changes when user types', () => {
    const setCurrentNOE = jest.fn();
    const setErrorAlert = jest.fn();
    render(<NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '10' } });
    expect(input.value).toBe('10');
    expect(setCurrentNOE).toHaveBeenCalledWith('10');
    expect(setErrorAlert).toHaveBeenCalledWith('');
  });

  test('shows error if input value is not valid', () => {
    const setCurrentNOE = jest.fn();
    const setErrorAlert = jest.fn();
    render(<NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '-1' } });
    expect(setErrorAlert).toHaveBeenCalledWith('Enter a valid number');
  });
});
