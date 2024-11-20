import React from 'react';
import { render, waitFor } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

jest.mock('../api'); // Mocking the API module

describe('<EventList /> component', () => {
  let EventListComponent;
  
  beforeEach(() => {
    // Initial rendering of EventList without any props
    EventListComponent = render(<EventList events={[]} />);
  });

  test('has an element with "list" role', () => {
    // Check if the event list is rendered with role="list"
    expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    // Mock the return value of getEvents
    const mockEvents = [
      { id: 1, name: 'Event 1' },
      { id: 2, name: 'Event 2' },
      // Add more events as necessary
    ];
    getEvents.mockResolvedValue(mockEvents); // Mock the resolved value

    // Fetch events from the API mock
    const allEvents = await getEvents();

    // Re-render EventList with fetched events
    EventListComponent.rerender(<EventList events={allEvents} />);

    // Wait for the list items to appear in the document
    await waitFor(() => {
      expect(EventListComponent.getAllByRole('listitem')).toHaveLength(allEvents.length);
    });
  });
});
