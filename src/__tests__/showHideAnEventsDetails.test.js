//scr/features/showHideAnEventsDetails.test.js

import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

const feature = loadFeature('../features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('User clicks on an event to view details', ({ given, when, then }) => {
    given('the user is on the events page', () => {
      render(<App />);
    });

    when('the user clicks on an event', () => {
      const eventItem = screen.getByText('Event Title'); // Adjust to your event title
      fireEvent.click(eventItem);
    });

    then('the event details should be visible', () => {
      const details = screen.getByText('Event Details'); // Adjust to your details text
      expect(details).toBeVisible();
    });
  });

  test('User clicks on the event again to hide details', ({ given, when, then }) => {
    given('the user has clicked on an event', async () => {
      render(<App />);
      const eventItem = screen.getByText('Event Title');
      fireEvent.click(eventItem);
      const details = await screen.findByText('Event Details');
      expect(details).toBeVisible();
    });

    when('the user clicks on the event again', () => {
      const eventItem = screen.getByText('Event Title');
      fireEvent.click(eventItem);
    });

    then('the event details should be hidden', () => {
      const details = screen.queryByText('Event Details'); // Adjust to your details text
      expect(details).not.toBeInTheDocument();
    });
  });
});
