//scr/features/specifyNumberOfEvents.test.js

import { loadFeature } from 'jest-cucumber';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

const feature = loadFeature('../features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('User selects to view a specific number of events', ({ given, when, then }) => {
    given('the user is on the events page', () => {
      render(<App />);
    });

    when('the user specifies the number of events to display', () => {
      const input = screen.getByLabelText('Number of Events'); // Adjust to your input label
      fireEvent.change(input, { target: { value: '5' } }); // Example for 5 events
    });

    then('the correct number of events should be displayed', () => {
      const events = screen.getAllByRole('listitem'); // Adjust according to how events are rendered
      expect(events).toHaveLength(5); // Adjust to match the input value
    });
  });
});
