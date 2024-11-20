// src/__tests__/CitySearch.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import CitySearch from '../components/CitySearch';
import userEvent from '@testing-library/user-event';

const allLocations = ['Berlin, Germany', 'Munich, Germany', 'Paris, France'];

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  let cityTextBox;

  beforeEach(() => {
    CitySearchComponent = render(
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={() => { }}   // Mock setCurrentCity function
        setInfoAlert={() => { }}     // Mock setInfoAlert function to prevent errors
      />
    );
    cityTextBox = CitySearchComponent.getByRole('textbox');
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    await user.click(cityTextBox); // Focus on the textbox
    await user.type(cityTextBox, 'Berlin'); // Type something to ensure suggestions are populated

    const suggestionList = await screen.findByRole('list'); // Wait for the suggestion list
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    await user.type(cityTextBox, 'Berlin'); // Typing 'Berlin'

    const filteredSuggestions = allLocations.filter((location) =>
      location.toUpperCase().includes('Berlin'.toUpperCase())
    );

    filteredSuggestions.forEach((suggestion) => {
      expect(screen.getByText(suggestion)).toBeInTheDocument(); // Ensure each suggestion is present
    });
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    await user.type(cityTextBox, 'Berlin'); // Typing 'Berlin'

    const BerlinGermanySuggestion = CitySearchComponent.getAllByRole('listitem')[0];
    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox.value).toBe('Berlin, Germany');
  });
});
