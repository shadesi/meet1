import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    const { container } = render(<App />);
    AppDOM = container.firstChild;
  });

  test('renders list of events', () => {
    const eventList = AppDOM.querySelector('#event-list');
    expect(eventList).toBeInTheDocument();
  });

  test('renders CitySearch component', () => {
    const citySearch = AppDOM.querySelector('#city-search');
    expect(citySearch).toBeInTheDocument();
  });

  test('renders NumberOfEvents component', () => {
    const numberOfEvents = AppDOM.querySelector('#number-of-events');
    expect(numberOfEvents).toBeInTheDocument();
  });
});
