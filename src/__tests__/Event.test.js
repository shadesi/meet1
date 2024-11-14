// src/__tests__/Event.test.js

import React from "react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import { render } from '@testing-library/react';
import mockData from "../mock-data";

const event = mockData[0];

describe('<Event /> component', () => {
    let EventComponent;
    beforeEach(() => {
        EventComponent = render(<Event event={event}/>);
    });
    
    test('renders event title', () => {
        const eventTitle = EventComponent.queryByText(event.summary);
        expect(eventTitle).toBeInTheDocument();
    });

    test('renders event start time', () => {
        const eventTime = EventComponent.queryByText(event.created);
        expect(eventTime).toBeInTheDocument();
    });

    test('renders event location', () => {
        const eventLocation = EventComponent.queryByText(event.location);
        expect(eventLocation).toBeInTheDocument();
    });
    
    // Show Details button
    test('renders "Show Details" button', () => {
        const detailButton = EventComponent.queryByText('Show Details');
        expect(detailButton).toBeInTheDocument();
    });
    
    // Scenario 1 
    test('event details are hidden by default', () => {
        const eventDetails = EventComponent.container.querySelector('.details');
        expect(eventDetails).not.toBeInTheDocument();
    });

    // Scenario 2
    test('shows details after user clicks "Show Details"', async () => {
        const user = userEvent.setup();
        
        const showDetailButton = EventComponent.queryByText('Show Details');
        expect(showDetailButton).toBeInTheDocument();
        await user.click(showDetailButton);

        const eventDetails = EventComponent.container.querySelector('.eventDetails');
        expect(eventDetails).toBeInTheDocument();
    });

    // Scenario 3
    test('hides details after user clicks "Hide Details"', async () => {
        const user = userEvent.setup();
        
        const showDetailButton = EventComponent.queryByText('Show Details');
        expect(showDetailButton).toBeInTheDocument();
        await user.click(showDetailButton);
        
        const hideDetailButton = EventComponent.queryByText('Hide Details');
        expect(hideDetailButton).toBeInTheDocument();
        await user.click(hideDetailButton);

        const eventDetails = EventComponent.container.querySelector('.eventDetails');
        expect(eventDetails).not.toBeInTheDocument();
    });
});
